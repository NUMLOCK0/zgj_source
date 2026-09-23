const fs = require('fs');
const path = require('path');
const initSqlJs = require('sql.js');

const COLLECTIONS = [
  'users',
  'customers',
  'financeCustomers',
  'financeLedger',
  'projects',
  'tasks',
  'consultStats',
  'financeConsultStats',
  'auditLogs',
  'wukongSyncQueue',
  'roiProducts',
  'roiRecords'
];
const META_KEYS = [
  'nextCustomerId',
  'nextFinanceCustomerId',
  'nextFinanceLedgerId',
  'nextUserId',
  'nextTaskId',
  'nextProjectId',
  'stores',
  'financeStores',
  'customerConfigs',
  'financeConfigs',
  'aiConfig',
  'nextConsultStatId',
  'nextFinanceConsultStatId',
  'nextAuditLogId',
  'taskIps',
  'taskFps',
  'wukongSync',
  'wecomBotConfig',
  'roiSettings',
  'nextRoiProductId',
  'nextRoiRecordId'
];

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

function run(db, sql, params) {
  const stmt = db.prepare(sql);
  try {
    stmt.run(params || []);
  } finally {
    stmt.free();
  }
}

function all(db, sql, params) {
  const stmt = db.prepare(sql);
  const rows = [];
  try {
    stmt.bind(params || []);
    while (stmt.step()) rows.push(stmt.getAsObject());
  } finally {
    stmt.free();
  }
  return rows;
}

function scalar(db, sql, params) {
  const rows = all(db, sql, params);
  if (!rows.length) return null;
  return Object.values(rows[0])[0];
}

function ensureSchema(db) {
  run(db, `
    CREATE TABLE IF NOT EXISTS app_meta (
      key TEXT PRIMARY KEY,
      value TEXT NOT NULL
    )
  `);

  COLLECTIONS.forEach((name) => {
    run(db, `
      CREATE TABLE IF NOT EXISTS ${name} (
        id INTEGER PRIMARY KEY,
        data TEXT NOT NULL
      )
    `);
  });
}

function normalize(defaultData, data) {
  const normalized = Object.assign(clone(defaultData), data || {});
  COLLECTIONS.forEach((key) => {
    if (!Array.isArray(normalized[key])) normalized[key] = [];
  });
  if (!Array.isArray(normalized.stores)) normalized.stores = clone(defaultData.stores || []);
  if (!normalized.taskIps || typeof normalized.taskIps !== 'object') normalized.taskIps = {};
  if (!normalized.taskFps || typeof normalized.taskFps !== 'object') normalized.taskFps = {};
  if (!normalized.wukongSync || typeof normalized.wukongSync !== 'object') normalized.wukongSync = clone(defaultData.wukongSync || {});
  if (!Array.isArray(normalized.wukongSyncQueue)) normalized.wukongSyncQueue = [];
  return normalized;
}

function readSnapshot(db, defaultData) {
  const snapshot = clone(defaultData);

  COLLECTIONS.forEach((name) => {
    snapshot[name] = all(db, `SELECT data FROM ${name} ORDER BY id`).map((row) => JSON.parse(row.data));
  });

  META_KEYS.forEach((key) => {
    const value = scalar(db, 'SELECT value FROM app_meta WHERE key = ?', [key]);
    if (value !== null && value !== undefined) snapshot[key] = JSON.parse(value);
  });

  return normalize(defaultData, snapshot);
}

function writeSnapshot(db, data) {
  run(db, 'BEGIN TRANSACTION');
  try {
    COLLECTIONS.forEach((name) => {
      run(db, `DELETE FROM ${name}`);
      const stmt = db.prepare(`INSERT INTO ${name} (id, data) VALUES (?, ?)`);
      try {
        (data[name] || []).forEach((item, index) => {
          const id = Number.isInteger(item.id) ? item.id : index + 1;
          stmt.run([id, JSON.stringify(item)]);
        });
      } finally {
        stmt.free();
      }
    });

    run(db, 'DELETE FROM app_meta');
    const metaStmt = db.prepare('INSERT INTO app_meta (key, value) VALUES (?, ?)');
    try {
      META_KEYS.forEach((key) => {
        metaStmt.run([key, JSON.stringify(data[key])]);
      });
    } finally {
      metaStmt.free();
    }

    run(db, 'COMMIT');
  } catch (err) {
    try { run(db, 'ROLLBACK'); } catch (rollbackErr) {}
    throw err;
  }
}

function persist(db, dbFile) {
  const bytes = db.export();
  fs.writeFileSync(dbFile, Buffer.from(bytes));
}

async function createSqliteStore(options) {
  const rootDir = options.rootDir;
  const dbFile = options.dbFile || path.join(rootDir, 'data', 'app.sqlite');
  const jsonFile = options.jsonFile || path.join(rootDir, 'data.json');
  const defaultData = normalize({}, options.defaultData || {});

  fs.mkdirSync(path.dirname(dbFile), { recursive: true });

  const SQL = await initSqlJs();
  const exists = fs.existsSync(dbFile);
  const db = exists ? new SQL.Database(fs.readFileSync(dbFile)) : new SQL.Database();
  ensureSchema(db);

  const isEmpty = COLLECTIONS.every((name) => Number(scalar(db, `SELECT COUNT(*) FROM ${name}`)) === 0);
  if (!exists || isEmpty) {
    let seed = clone(defaultData);
    if (fs.existsSync(jsonFile)) {
      seed = normalize(defaultData, JSON.parse(fs.readFileSync(jsonFile, 'utf-8')));
    }
    writeSnapshot(db, seed);
    persist(db, dbFile);
  }

  return {
    dbFile,
    loadData() {
      return readSnapshot(db, defaultData);
    },
    saveData(data) {
      writeSnapshot(db, normalize(defaultData, data));
      persist(db, dbFile);
    }
  };
}

module.exports = {
  createSqliteStore
};
