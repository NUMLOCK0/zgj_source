const { start } = require('./src/app');

start().catch((err) => {
  console.error('服务启动失败:', err);
  process.exit(1);
});
