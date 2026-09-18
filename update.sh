#!/usr/bin/env bash
# ============================================================
#  创赢工具箱 - 服务器一键更新脚本
#  用法：把本脚本和更新包 update.zip 一起放到项目根目录，执行：
#        bash update.sh
#  作用：备份数据库 -> 覆盖代码 -> 重启服务（不会动你的数据）
# ============================================================

set -e

# ---------- 1. 定位项目目录（脚本所在目录，纯 bash 实现，不依赖 dirname） ----------
_src="${BASH_SOURCE[0]}"
case "$_src" in
  */*) _srcdir="${_src%/*}" ;;
  *)   _srcdir="." ;;
esac
PROJECT_DIR="$(cd "$_srcdir" && pwd)"
BACKEND_DIR="$PROJECT_DIR/backend"

echo "=============================================="
echo " 创赢工具箱 更新脚本"
echo " 项目目录：$PROJECT_DIR"
echo "=============================================="

if [ ! -d "$BACKEND_DIR" ]; then
  echo "[错误] 找不到 backend 目录，请把本脚本放在项目根目录（backend 的上一级）再运行。"
  exit 1
fi

# 找更新包：优先 update.zip，否则用目录里最新的那个 .zip
ZIP_FILE="$PROJECT_DIR/update.zip"
if [ ! -f "$ZIP_FILE" ]; then
  ZIP_FILE=""
  for _z in "$PROJECT_DIR"/*.zip "$PROJECT_DIR"/*.ZIP; do
    [ -f "$_z" ] || continue
    if [ -z "$ZIP_FILE" ] || [ "$_z" -nt "$ZIP_FILE" ]; then
      ZIP_FILE="$_z"
    fi
  done
fi

if [ -z "$ZIP_FILE" ] || [ ! -f "$ZIP_FILE" ]; then
  echo "[错误] 在 $PROJECT_DIR 下没有找到任何 .zip 更新包。"
  echo "       请把更新包上传到这个目录后用 ls 确认能看到它。"
  exit 1
fi
echo " 使用更新包：$(basename "$ZIP_FILE")"

# 清理上次中断可能留下的临时目录
rm -rf "$PROJECT_DIR"/_update_tmp_* 2>/dev/null || true

# ---------- 2. 备份数据库（最重要的一步） ----------
STAMP=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="$PROJECT_DIR/backup_$STAMP"
mkdir -p "$BACKUP_DIR"

if [ -f "$BACKEND_DIR/data/app.sqlite" ]; then
  cp -f "$BACKEND_DIR/data/app.sqlite" "$BACKUP_DIR/app.sqlite"
  echo "[1/5] 数据库已备份 -> $BACKUP_DIR/app.sqlite"
else
  echo "[1/5] 未发现数据库文件（首次部署？跳过备份）"
fi

if [ -d "$BACKEND_DIR/uploads" ]; then
  cp -rf "$BACKEND_DIR/uploads" "$BACKUP_DIR/uploads" 2>/dev/null || true
  echo "      上传文件已备份"
fi

# ---------- 3. 解压更新包到临时目录 ----------
TMP_DIR="$PROJECT_DIR/_update_tmp_$STAMP"
mkdir -p "$TMP_DIR"
echo "[2/5] 解压更新包..."
if command -v unzip >/dev/null 2>&1; then
  unzip -oq "$ZIP_FILE" -d "$TMP_DIR"
elif command -v python3 >/dev/null 2>&1; then
  # 没有 unzip 时用 python3 顶上
  python3 -c "import zipfile,sys; zipfile.ZipFile(sys.argv[1]).extractall(sys.argv[2])" "$ZIP_FILE" "$TMP_DIR"
elif command -v python >/dev/null 2>&1; then
  python -c "import zipfile,sys; zipfile.ZipFile(sys.argv[1]).extractall(sys.argv[2])" "$ZIP_FILE" "$TMP_DIR"
else
  echo "[错误] 服务器没有 unzip 也没有 python，请先执行：yum install -y unzip  或  apt install -y unzip"
  rm -rf "$TMP_DIR"
  exit 1
fi

# 兼容：如果解压后只有一层同名目录，进入该层
if [ ! -d "$TMP_DIR/backend" ] && [ -d "$TMP_DIR"/*/backend ]; then
  TMP_DIR="$(echo "$TMP_DIR"/*/ | head -n1 | sed 's#/$##')"
fi

# ---------- 4. 覆盖代码（排除数据目录） ----------
if [ ! -f "$TMP_DIR/backend/server.js" ]; then
  echo "[错误] 更新包里没有找到 backend/server.js，包可能不完整，已终止（数据未被修改）。"
  rm -rf "$TMP_DIR"
  exit 1
fi

echo "[3/5] 覆盖后端代码..."
if [ -d "$TMP_DIR/backend" ]; then
  mkdir -p "$BACKEND_DIR"
  # 复制 backend 下所有内容，但跳过 data / backups / uploads / node_modules
  for item in "$TMP_DIR/backend"/* "$TMP_DIR/backend"/.[!.]*; do
    [ -e "$item" ] || continue
    name=$(basename "$item")
    case "$name" in
      data|backups|uploads|node_modules) continue ;;
    esac
    rm -rf "$BACKEND_DIR/$name"
    cp -rf "$item" "$BACKEND_DIR/$name"
    echo "      -> $name"
  done
fi

echo "[4/5] 覆盖前端源码..."
if [ -d "$TMP_DIR/frontend" ]; then
  mkdir -p "$PROJECT_DIR/frontend"
  for item in "$TMP_DIR/frontend"/* "$TMP_DIR/frontend"/.[!.]*; do
    [ -e "$item" ] || continue
    name=$(basename "$item")
    case "$name" in
      node_modules|dist) continue ;;
    esac
    rm -rf "$PROJECT_DIR/frontend/$name"
    cp -rf "$item" "$PROJECT_DIR/frontend/$name"
  done
  echo "      -> frontend 源码已更新"
fi

# 顺带把更新脚本自身更新到最新
if [ -f "$TMP_DIR/update.sh" ]; then
  cp -f "$TMP_DIR/update.sh" "$PROJECT_DIR/update.sh"
  chmod +x "$PROJECT_DIR/update.sh"
fi

rm -rf "$TMP_DIR"

# ---------- 5. 重启服务 ----------
echo "[5/5] 重启服务..."
RESTARTED=0

if command -v pm2 >/dev/null 2>&1; then
  # PM2 方式：常见项目名，逐个尝试重启
  for name in zgj zhichenguanjia backend chuangying; do
    if pm2 list | grep -q "$name"; then
      pm2 restart "$name" --update-env
      echo "      已通过 PM2 重启：$name"
      RESTARTED=1
    fi
  done
  if [ "$RESTARTED" -eq 0 ]; then
    echo "      未匹配到已知 PM2 项目名，请执行 pm2 list 查看后手动：pm2 restart 项目名"
  fi
else
  echo "      未检测到 PM2。请到宝塔面板 -> 网站/Node项目 里点【重启】，或手动重启服务。"
fi

echo ""
echo "=============================================="
echo " 更新完成！"
echo " 数据库备份：$BACKUP_DIR"
echo " 如果页面显示异常，把上面的备份拷回 backend/data/app.sqlite 即可还原。"
echo "=============================================="
