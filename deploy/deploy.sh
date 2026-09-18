#!/bin/bash
set -e
echo "=== 创赢工具箱 v5.2.1 部署 ==="
DEPLOY_DIR="/www/wwwroot/zgj"
cd "$DEPLOY_DIR" || { echo "目录不存在: $DEPLOY_DIR"; exit 1; }

# 备份当前数据
if [ -f data/app.sqlite ]; then
  mkdir -p backups
  \cp -f data/app.sqlite "backups/app_$(date +%Y-%m-%d_%H%M).sqlite"
  echo "✓ 已备份当前数据库"
fi

# 部署后端（使用standalone版，无需外部模块）
cp app_standalone.js app.js
cp run.js run.js
echo "✓ 后端文件已部署"

# 部署前端
mkdir -p public/vue/assets
\cp -rf public/vue/assets/* public/vue/assets/ 2>/dev/null || true
\cp -f public/vue/index.html public/vue/index.html 2>/dev/null || true
echo "✓ 前端文件已部署"

# 重启PM2
pm2 restart zgj 2>/dev/null || pm2 start run.js --name zgj
sleep 2
pm2 status zgj
echo "=== 部署完成 ==="
