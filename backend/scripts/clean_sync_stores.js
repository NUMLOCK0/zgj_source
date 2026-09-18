const { createSqliteStore } = require('../src/db/sqliteStore');
const defaultDb = require('../src/config/defaultData');
const path = require('path');

async function cleanSyncStores() {
  const rootDir = path.join(__dirname, '..');
  const store = await createSqliteStore({ rootDir, defaultData: defaultDb });
  const data = store.loadData();

  console.log('当前系统有效店铺 (db.stores):', data.stores);
  console.log('清理前同步店铺 (wukongSync.syncStores):', data.wukongSync?.syncStores);

  if (data.wukongSync && Array.isArray(data.wukongSync.syncStores)) {
    data.wukongSync.syncStores = data.wukongSync.syncStores.filter(s => data.stores.includes(s));
  }

  store.saveData(data);
  console.log('清理后同步店铺 (wukongSync.syncStores):', data.wukongSync?.syncStores);
}

cleanSyncStores().catch(console.error);
