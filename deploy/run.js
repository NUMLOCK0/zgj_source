const { start } = require('./app');
start().catch(e => { console.error(e); process.exit(1); });
