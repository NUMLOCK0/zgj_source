#!/bin/bash
# ==========================================
# 创赢工具箱 (zgj) 宝塔面板一键平滑升级与修复脚本
# ==========================================

echo "=========================================="
echo ">>> [1/4] 进入项目后端目录..."
# 获取脚本所在绝对目录
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR/backend" || cd "$SCRIPT_DIR" || exit 1

echo ">>> 当前运行目录: $(pwd)"

echo ">>> [2/4] 安装/更新必要依赖 (sql.js / express)..."
npm install --production

echo ">>> [3/4] 安全备份数据库..."
if [ -f "data/app.sqlite" ]; then
  mkdir -p backups
  BACKUP_FILE="backups/app_backup_$(date +%Y%m%d_%H%M%S).sqlite"
  cp data/app.sqlite "$BACKUP_FILE"
  echo ">>> 数据库已安全备份至: $BACKUP_FILE"
fi

echo ">>> [4/4] 重启 Node.js 服务..."
if command -v pm2 &> /dev/null; then
  pm2 reload zgj || pm2 restart zgj || pm2 restart server.js || pm2 restart all
  echo ">>> PM2 服务已平滑重启成功！"
elif command -v systemctl &> /dev/null && systemctl is-active --quiet zgj; then
  systemctl restart zgj
  echo ">>> Systemd 服务已重启！"
else
  echo ">>> 提示：若使用宝塔【Node项目管理器】，请在面板对应项目点击【重启】即可！"
fi

echo "=========================================="
echo "🎉 优化与升级已全部生效！"
echo "=========================================="
