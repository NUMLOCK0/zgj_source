/**
 * 创赢工具箱 - 云端版服务器 v3
 * Express + SQLite存储 + Token认证 + 多项目任务分发
 */
const express = require('express');
const crypto = require('crypto');
const fs = require('fs');
const path = require('path');
const zlib = require('zlib');
const defaultDb = require('./config/defaultData');
const { createSqliteStore } = require('./db/sqliteStore');
const { syncCustomerToWukong, getWukongSyncSettings, updateWukongSyncSettings, fetchWukongToken, validateWukongToken } = require('./sync/wukongCustomerSync');

const app = express();
const VERSION = 'v5.2.1';
const ROOT_DIR = path.join(__dirname, '..');
function localDateStr(d) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  return y + '-' + m + '-' + dd;
}
const PORT = process.env.PORT || 3002;

// 中间件 - JSON body解析，按路由区分大小限制
const LARGE_BODY_ROUTES = ['/api/import-data', '/api/admin/tasks/import', '/api/admin/tasks/batch-add-with-images'];
app.use((req, res, next) => {
  const limit = LARGE_BODY_ROUTES.includes(req.path) ? '60mb' : '2mb';
  express.json({ limit })(req, res, next);
});
app.use(express.urlencoded({ extended: true, limit: '2mb' }));

// 安全Headers
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  next();
});

// API响应gzip压缩（仅对JSON响应 >1KB 时压缩）
app.use('/api', (req, res, next) => {
  const acceptEncoding = req.headers['accept-encoding'] || '';
  if (!acceptEncoding.includes('gzip')) return next();
  const originalJson = res.json.bind(res);
  res.json = function(data) {
    const body = JSON.stringify(data);
    const buf = Buffer.from(body);
    if (buf.length > 1024) {
      try {
        const compressed = zlib.gzipSync(buf);
        res.setHeader('Content-Encoding', 'gzip');
        res.setHeader('Content-Length', compressed.length);
        res.setHeader('Content-Type', 'application/json; charset=utf-8');
        return res.end(compressed);
      } catch (e) {
        // 压缩失败，回退原始响应
      }
    }
    return originalJson(data);
  };
  next();
});

const VUE_DIST_DIR = path.join(ROOT_DIR, 'public', 'vue');
const staticHeaders = {
  setHeaders: function(res, filepath) {
    if (filepath.endsWith('.html')) {
      res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
      res.setHeader('Pragma', 'no-cache');
      res.setHeader('Expires', '0');
    } else if (filepath.endsWith('.js') || filepath.endsWith('.css')) {
      // 带内容哈希的文件名，可长期缓存
      res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
    } else if (filepath.endsWith('.png') || filepath.endsWith('.jpg') || filepath.endsWith('.jpeg') || filepath.endsWith('.svg') || filepath.endsWith('.ico') || filepath.endsWith('.woff2')) {
      res.setHeader('Cache-Control', 'public, max-age=604800');
    }
  }
};

// 生产环境由 Express 直接托管 Vue 构建产物，无需单独部署前端服务。
app.use(express.static(VUE_DIST_DIR, staticHeaders));
app.use(express.static(path.join(ROOT_DIR, 'public'), staticHeaders));

// 上传文件目录
const UPLOAD_DIR = path.join(ROOT_DIR, 'uploads');
if (!fs.existsSync(UPLOAD_DIR)) {
  fs.mkdirSync(UPLOAD_DIR, { recursive: true });
}
app.use('/uploads', express.static(UPLOAD_DIR));

// ========== 数据存储层 ==========
let db = Object.assign({}, defaultDb);
let store = null;
let wukongSyncInProgress = false;

async function loadData() {
  try {
    store = await createSqliteStore({
      rootDir: ROOT_DIR,
      defaultData: defaultDb
    });
    db = store.loadData();
    normalizeRuntimeData();
  } catch (e) {
    console.error('加载SQLite数据失败:', e.message);
  }
}

function maxId(rows) {
  if (!Array.isArray(rows) || rows.length === 0) return 0;
  return rows.reduce((max, item) => Math.max(max, parseInt(item && item.id) || 0), 0);
}

function ensureNextId(key, rows) {
  const expected = maxId(rows) + 1;
  const current = parseInt(db[key]) || 1;
  if (current < expected) db[key] = expected;
}

function normalizeRuntimeData() {
  ['users', 'customers', 'projects', 'tasks', 'consultStats', 'auditLogs', 'wukongSyncQueue'].forEach((key) => {
    if (!Array.isArray(db[key])) db[key] = [];
  });
  if (!Array.isArray(db.stores)) db.stores = (defaultDb.stores || []).slice();
  if (!db.customerConfigs || typeof db.customerConfigs !== 'object') db.customerConfigs = {};
  ['degrees', 'majors', 'applyLevels'].forEach((key) => {
    if (!Array.isArray(db.customerConfigs[key])) db.customerConfigs[key] = (defaultDb.customerConfigs?.[key] || []).slice();
  });
  if (!db.taskIps || typeof db.taskIps !== 'object') db.taskIps = {};
  if (!db.taskFps || typeof db.taskFps !== 'object') db.taskFps = {};
  if (!db.wukongSync || typeof db.wukongSync !== 'object') db.wukongSync = Object.assign({}, defaultDb.wukongSync || {});

  ensureNextId('nextUserId', db.users);
  ensureNextId('nextCustomerId', db.customers);
  ensureNextId('nextProjectId', db.projects);
  ensureNextId('nextTaskId', db.tasks);
  ensureNextId('nextConsultStatId', db.consultStats);
  ensureNextId('nextAuditLogId', db.auditLogs);

  // === v5.1.0 新增 ===
  ['roiProducts', 'roiRecords', 'punchRecords', 'punchEmployees'].forEach(function(key) {
    if (!Array.isArray(db[key])) db[key] = [];
  });
  if (!db.roiSettings || typeof db.roiSettings !== 'object')
    db.roiSettings = { roiThreshold: 2.5, perfUnit: 50000, perfPerUnit: 1000, perfCap: 8000 };
  if (!db.punchSettings || typeof db.punchSettings !== 'object')
    db.punchSettings = { companyName: '', workStart: '09:00', workEnd: '18:00', wifiUrl: 'http://192.168.3.1', allowedIp: '113.66.20.207' };
  ensureNextId('nextRoiProductId', db.roiProducts);
  ensureNextId('nextRoiRecordId', db.roiRecords);
  ensureNextId('nextPunchRecordId', db.punchRecords);
  // v5.1.0 迁移：确保已有 punchSettings 包含 allowedIp
  if (db.punchSettings && !db.punchSettings.allowedIp) db.punchSettings.allowedIp = '113.66.20.207';
  ensureNextId('nextPunchEmployeeId', db.punchEmployees);
  if (!db.attendanceManual || typeof db.attendanceManual !== 'object') db.attendanceManual = {};

  const taskIds = new Set(db.tasks.map(t => t.id));
  Object.keys(db.taskIps).forEach(key => {
    if (!taskIds.has(db.taskIps[key])) delete db.taskIps[key];
  });
  Object.keys(db.taskFps).forEach(key => {
    if (!taskIds.has(db.taskFps[key])) delete db.taskFps[key];
  });
}

const BACKUP_DIR = path.join(ROOT_DIR, 'backups');
if (!fs.existsSync(BACKUP_DIR)) {
  try { fs.mkdirSync(BACKUP_DIR, { recursive: true }); } catch(e) {}
}

function saveData() {
  try {
    if (!store) throw new Error('SQLite store 未初始化');
    store.saveData(db);
    // 自动备份：按小时命名，同小时覆盖；保留最近7天
    try {
      const now = new Date();
      const bkName = 'app_' + now.getFullYear() + '-' +
        String(now.getMonth()+1).padStart(2,'0') + '-' +
        String(now.getDate()).padStart(2,'0') + '_' +
        String(now.getHours()).padStart(2,'0') + '.sqlite';
      fs.copyFileSync(store.dbFile, path.join(BACKUP_DIR, bkName));
      // 清理7天前的备份
      const cutoff = now.getTime() - 7 * 24 * 60 * 60 * 1000;
      fs.readdirSync(BACKUP_DIR).forEach(function(f) {
        if (!f.startsWith('app_') || !f.endsWith('.sqlite')) return;
        try {
          const stat = fs.statSync(path.join(BACKUP_DIR, f));
          if (stat.mtimeMs < cutoff) {
            fs.unlinkSync(path.join(BACKUP_DIR, f));
          }
        } catch(e) {}
      });
    } catch(e) {
      console.error('备份失败:', e.message);
    }
    return true;
  } catch (e) {
    console.error('保存数据失败:', e.message);
    throw e;
  }
}

// 审计日志
function addAuditLog(userId, username, action, detail, req) {
  const ip = (req.headers['x-forwarded-for'] || '').split(',')[0].trim() || req.socket.remoteAddress || '';
  db.auditLogs.push({
    id: db.nextAuditLogId++,
    userId: userId,
    username: username,
    action: action,
    detail: detail,
    ip: ip,
    timestamp: new Date().toISOString()
  });
  // 最多保留5000条
  if (db.auditLogs.length > 5000) {
    db.auditLogs = db.auditLogs.slice(-5000);
  }
}

// ========== 密码哈希 ==========
function sha256(text) {
  return crypto.createHash('sha256').update(text, 'utf-8').digest('hex');
}

function generateSalt() {
  return crypto.randomBytes(16).toString('hex');
}

function hashPassword(password, salt) {
  if (salt) return sha256(salt + password);
  return sha256(password);
}

function verifyPassword(password, user) {
  if (user.salt) {
    return hashPassword(password, user.salt) === user.password;
  }
  // 旧数据无salt，验证后自动升级
  if (sha256(password) === user.password) {
    user.salt = generateSalt();
    user.password = hashPassword(password, user.salt);
    saveData();
    return true;
  }
  return false;
}

// ========== 登录防爆破 ==========
const loginAttempts = new Map(); // IP -> {count, lockedUntil}
const MAX_LOGIN_ATTEMPTS = 5;
const LOCK_DURATION = 15 * 60 * 1000; // 15分钟

function getClientIP(req) {
  return (req.headers['x-forwarded-for'] || '').split(',')[0].trim() || req.socket.remoteAddress || '';
}

function checkLoginLock(ip) {
  const attempt = loginAttempts.get(ip);
  if (attempt && attempt.lockedUntil && Date.now() < attempt.lockedUntil) {
    return true; // 已锁定
  }
  return false;
}

function recordLoginFailure(ip) {
  let attempt = loginAttempts.get(ip) || { count: 0, lockedUntil: 0 };
  attempt.count++;
  if (attempt.count >= MAX_LOGIN_ATTEMPTS) {
    attempt.lockedUntil = Date.now() + LOCK_DURATION;
    attempt.count = 0;
  }
  loginAttempts.set(ip, attempt);
}

function clearLoginFailure(ip) {
  loginAttempts.delete(ip);
}

// ========== Token管理（内存中） ==========
const tokens = new Map();
const TOKEN_TTL = 24 * 60 * 60 * 1000; // 24小时

// 每10分钟清理过期token，防止内存泄漏
setInterval(() => {
  const now = Date.now();
  let cleaned = 0;
  for (const [key, val] of tokens) {
    if (now - val.loginTime > TOKEN_TTL) {
      tokens.delete(key);
      cleaned++;
    }
  }
  if (cleaned > 0) console.log(`[Token清理] 清除${cleaned}个过期token，剩余${tokens.size}个`);
}, 10 * 60 * 1000).unref();

function generateToken() {
  return crypto.randomBytes(32).toString('hex');
}

function getTokenFromReq(req) {
  const cookie = req.headers.cookie || '';
  const match = cookie.match(/zgj_token=([^;]+)/);
  return match ? match[1] : null;
}

function getUserByToken(req) {
  const token = getTokenFromReq(req);
  if (!token) return null;
  const session = tokens.get(token);
  if (!session) return null;
  // 服务端检查token过期（24小时）
  if (Date.now() - session.loginTime > TOKEN_TTL) {
    tokens.delete(token);
    return null;
  }
  const user = db.users.find(u => u.id === session.userId);
  return user || null;
}

// ========== 权限定义 ==========
const ALL_PERMISSIONS = [
  'extract', 'register', 'edit', 'delete',
  'copyCard', 'copyTSV', 'copyText', 'exportExcel',
  'exportAll', 'importData', 'addRow', 'clearTable',
  'viewData', 'viewHistory', 'viewMasked', 'taskManage', 'qrGen', 'leadStats', 'editConsult',
  'roiView', 'roiEntry', 'roiManage',
  'punchUse', 'punchView', 'punchFace',
  'markInvalid', 'editAttendance'
];

function hasPermission(user, perm) {
  if (!user) return false;
  if (user.isAdmin) return true;
  return user.permissions && user.permissions[perm] === true;
}

// ========== 中间件：认证 ==========
function authRequired(req, res, next) {
  const user = getUserByToken(req);
  if (!user) {
    return res.status(401).json({ error: '未登录或登录已过期' });
  }
  req.user = user;
  next();
}

function adminRequired(req, res, next) {
  const user = getUserByToken(req);
  if (!user) {
    return res.status(401).json({ error: '未登录或登录已过期' });
  }
  if (!user.isAdmin) {
    return res.status(403).json({ error: '无权限，仅管理员可操作' });
  }
  req.user = user;
  next();
}

function permRequired(perm) {
  return function(req, res, next) {
    const user = getUserByToken(req);
    if (!user) {
      return res.status(401).json({ error: '未登录或登录已过期' });
    }
    if (!hasPermission(user, perm)) {
      return res.status(403).json({ error: '无此操作权限' });
    }
    req.user = user;
    next();
  };
}

function customerCreateRequired(req, res, next) {
  const user = getUserByToken(req);
  if (!user) {
    return res.status(401).json({ error: '未登录或登录已过期' });
  }
  if (hasPermission(user, 'register') || (hasPermission(user, 'addRow') && req.body && req.body._manualAdd === true)) {
    req.user = user;
    return next();
  }
  return res.status(403).json({ error: '无此操作权限' });
}

// ========== 任务管理权限 ==========
function taskAccessRequired(req, res, next) {
  const user = getUserByToken(req);
  if (!user) {
    return res.status(401).json({ error: '未登录或登录已过期' });
  }
  if (!user.isAdmin && !(user.permissions && user.permissions['taskManage'])) {
    return res.status(403).json({ error: '无任务管理权限' });
  }
  req.user = user;
  next();
}

function canAccessProject(req, projectId) {
  if (req.user.isAdmin) return true;
  const project = db.projects.find(p => p.id === projectId);
  return project && project.ownerId === req.user.id;
}

function migrateProjectOwnership() {
  const admin = db.users.find(u => u.isAdmin);
  if (admin) {
    let changed = false;
    db.projects.forEach(p => {
      if (!p.ownerId) {
        p.ownerId = admin.id;
        changed = true;
      }
    });
    if (changed) {
      saveData();
      console.log('已完成项目归属迁移');
    }
  }
}

// ========== 初始化默认管理员 ==========
function initAdmin() {
  const admin = db.users.find(u => u.username === 'admin');
  if (!admin) {
    const allPerms = {};
    ALL_PERMISSIONS.forEach(p => { allPerms[p] = true; });
    const adminSalt = generateSalt();
    db.users.push({
      id: db.nextUserId++,
      username: 'admin',
      salt: adminSalt,
      password: hashPassword('admin123', adminSalt),
      name: '管理员',
      isAdmin: true,
      permissions: allPerms
    });
    saveData();
    console.log('已创建默认管理员账号: admin / admin123');
  }
}

// ========== API路由 ==========

app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ error: '请输入用户名和密码' });
  }
  const clientIP = getClientIP(req);
  // 检查是否被锁定
  if (checkLoginLock(clientIP)) {
    const attempt = loginAttempts.get(clientIP);
    const remainMin = Math.ceil((attempt.lockedUntil - Date.now()) / 60000);
    return res.status(429).json({ error: '登录尝试过多，请' + remainMin + '分钟后再试' });
  }
  const user = db.users.find(u => u.username === username);
  if (!user || !verifyPassword(password, user)) {
    recordLoginFailure(clientIP);
    const attempt = loginAttempts.get(clientIP) || { count: 0 };
    const remain = MAX_LOGIN_ATTEMPTS - attempt.count;
    return res.status(401).json({ error: remain > 0 ? '用户名或密码错误，剩余' + remain + '次尝试' : '用户名或密码错误' });
  }
  clearLoginFailure(clientIP);
  const token = generateToken();
  tokens.set(token, { userId: user.id, username: user.username, loginTime: Date.now() });
  res.setHeader('Set-Cookie', `zgj_token=${token}; Path=/; HttpOnly; Max-Age=86400`);
  addAuditLog(user.id, user.username, 'login', '登录系统', req);
  saveData();
  res.json({
    success: true,
    user: {
      id: user.id,
      username: user.username,
      name: user.name,
      isAdmin: !!user.isAdmin,
      permissions: user.permissions || {}
    }
  });
});

// 登出
app.post('/api/logout', (req, res) => {
  const token = getTokenFromReq(req);
  if (token) tokens.delete(token);
  res.setHeader('Set-Cookie', 'zgj_token=; Path=/; Max-Age=0');
  res.json({ success: true });
});

// 获取当前用户信息
app.get('/api/me', authRequired, (req, res) => {
  res.json({
    id: req.user.id,
    username: req.user.username,
    name: req.user.name,
    isAdmin: !!req.user.isAdmin,
    permissions: req.user.permissions || {}
  });
});

// 获取客户数据：列表界面使用服务端筛选和分页；导出等操作可显式请求完整筛选结果。
app.get('/api/customers', authRequired, permRequired('viewData'), (req, res) => {
  let customers = db.customers;
  if (!Array.isArray(customers)) {
    customers = [];
  }
  if (!req.user.isAdmin) {
    const withOwner = customers.filter(c => c.createdBy);
    if (withOwner.length > 0) {
      customers = customers.filter(c => !c.createdBy || c.createdBy === req.user.username);
    }
  }

  const keyword = String(req.query.keyword || '').trim().toLowerCase();
  const dateFilter = String(req.query.dateFilter || 'all');
  const employee = String(req.query.employee || '').trim();
  const store = String(req.query.store || '').trim();
  const searchableFields = ['name', 'phone', 'wechat', 'major', 'reviewMajor', 'assignedTo', 'createdBy','invalid'];
  if (keyword) {
    customers = customers.filter(row => searchableFields.some(field => String(row[field] || '').toLowerCase().includes(keyword)));
  }
  if (employee) {
    customers = customers.filter(row => String(row.createdBy || '') === employee);
  }
  if (store) {
    customers = customers.filter(row => String(row.assignedTo || '') === store);
  }
  if (dateFilter !== 'all') {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    customers = customers.filter((row) => {
      const date = new Date(String(row.date || '').replace(/-/g, '/'));
      if (Number.isNaN(date.getTime())) return false;
      if (dateFilter === 'today') return date >= today;
      if (dateFilter === 'yesterday') {
        const yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1);
        return date >= yesterday && date < today;
      }
      if (dateFilter === '7' || dateFilter === '30') return date >= new Date(now.getTime() - Number(dateFilter) * 86400000);
      if (dateFilter === 'thisMonth') return date.getFullYear() === now.getFullYear() && date.getMonth() === now.getMonth();
      return true;
    });
  }
  // 自定义日期范围
  const startDate = req.query.startDate;
  const endDate = req.query.endDate;
  if (startDate && endDate) {
    customers = customers.filter((row) => {
      const d = String(row.date || '').slice(0, 10);
      return d >= startDate && d <= endDate;
    });
  } else if (startDate) {
    customers = customers.filter((row) => String(row.date || '').slice(0, 10) >= startDate);
  } else if (endDate) {
    customers = customers.filter((row) => String(row.date || '').slice(0, 10) <= endDate);
  }

  customers = customers.slice().sort((a, b) => (parseInt(b.id) || 0) - (parseInt(a.id) || 0));
  const total = customers.length;
  const dealtCount = customers.filter(row => row.dealStatus === '已成交').length;
  const all = String(req.query.all || '') === '1';
  const pageSize = Math.min(Math.max(parseInt(req.query.pageSize) || 20, 1), 100);
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const page = Math.min(Math.max(parseInt(req.query.page) || 1, 1), totalPages);
  const pageCustomers = all ? customers : customers.slice((page - 1) * pageSize, page * pageSize);
  res.json({
    customers: pageCustomers,
    nextId: db.nextCustomerId,
    total: total,
    dealtCount: dealtCount,
    page: page,
    pageSize: pageSize,
    totalPages: totalPages
  });
});

// 新增客户
app.post('/api/customers', authRequired, customerCreateRequired, (req, res) => {
  const data = req.body;
  const row = {
    id: db.nextCustomerId++,
    seq: String(db.customers.length + 1),
    date: data.date || '',
    name: data.name || '',
    createdBy: req.user.username || '',
    phone: data.phone || '',
    wechat: data.wechat || '',
    degree: data.degree || '',
    major: data.major || '',
    titleLevel: data.titleLevel || '',
    ssCity: data.ssCity || '',
    reviewMajor: data.reviewMajor || '',
    applyLevel: data.applyLevel || '',
    conclusion: data.conclusion || '',
    remarks: data.remarks || '',
    assignedTo: data.assignedTo || '',
    dealStatus: data.dealStatus || ''
  };
  db.customers.push(row);
  db.wukongSyncQueue.push({
    id: row.id,
    customerId: row.id,
    status: 'pending',
    attempts: 0,
    lastError: '',
    createdAt: new Date().toISOString(),
    syncedAt: ''
  });
  addAuditLog(req.user.id, req.user.username, 'register', '登记客户: ' + (row.name || '未知'), req);
  saveData();
  res.json({ success: true, customer: row });
});

// 修改客户
app.put('/api/customers/:id', authRequired, permRequired('edit'), (req, res) => {
  const id = parseInt(req.params.id);
  const row = db.customers.find(c => c.id === id);
  if (!row) {
    return res.status(404).json({ error: '记录不存在' });
  }
  const allowed = ['seq','date','name','phone','wechat','degree','major','titleLevel','ssCity','reviewMajor','applyLevel','conclusion','remarks','assignedTo','dealStatus','createdBy','invalid'];
  const updates = req.body;
  allowed.forEach(f => {
    if (updates[f] !== undefined) {
      if (f === 'invalid') { row[f] = parseInt(updates[f]) || 0; } else { row[f] = String(updates[f] || '').trim(); }
    }
  });

  addAuditLog(req.user.id, req.user.username, 'edit', '修改客户: ' + (row.name || 'ID:' + id), req);
  saveData();
  res.json({ success: true, customer: row });
});

// 标记/取消无效咨询（独立权限）
app.put('/api/customers/:id/invalid', authRequired, permRequired('markInvalid'), (req, res) => {
  const id = parseInt(req.params.id);
  const row = db.customers.find(c => c.id === id);
  if (!row) return res.status(404).json({ error: '记录不存在' });
  row.invalid = parseInt(req.body.invalid) || 0;
  addAuditLog(req.user.id, req.user.username, 'edit', (row.invalid ? '标记无效: ' : '取消无效: ') + (row.name || 'ID:' + id), req);
  saveData();
  res.json({ success: true, customer: row });
});

// 批量删除客户
app.post('/api/customers/batch-delete', authRequired, permRequired('delete'), (req, res) => {
  const ids = req.body.ids || [];
  if (!Array.isArray(ids) || ids.length === 0) {
    return res.status(400).json({ error: '请选择要删除的记录' });
  }
  let deleted = 0;
  ids.forEach(function(id) {
    const idx = db.customers.findIndex(function(c) { return c.id === parseInt(id); });
    if (idx !== -1) { db.customers.splice(idx, 1); deleted++; }
  });
  db.wukongSyncQueue = db.wukongSyncQueue.filter(job => !ids.map(Number).includes(Number(job.customerId)));
  db.customers.forEach(function(c, i) { c.seq = String(i + 1); });
  addAuditLog(req.user.id, req.user.username, 'delete', '批量删除客户 ' + deleted + ' 条', req);
  saveData();
  res.json({ success: true, deleted: deleted });
});

// 清空客户登记表
app.delete('/api/customers/clear', authRequired, permRequired('clearTable'), (req, res) => {
  const count = db.customers.length;
  db.customers = [];
  db.wukongSyncQueue = [];
  db.nextCustomerId = 1;
  addAuditLog(req.user.id, req.user.username, 'clear_table', '清空客户登记表 ' + count + ' 条', req);
  saveData();
  res.json({ success: true, deleted: count });
});

// 删除单个客户
app.delete('/api/customers/:id', authRequired, permRequired('delete'), (req, res) => {
  const id = parseInt(req.params.id);
  const idx = db.customers.findIndex(c => c.id === id);
  if (idx === -1) {
    return res.status(404).json({ error: '记录不存在' });
  }
  const delName = db.customers[idx].name || 'ID:' + id;
  db.customers.splice(idx, 1);
  db.wukongSyncQueue = db.wukongSyncQueue.filter(job => Number(job.customerId) !== id);
  db.customers.forEach((c, i) => { c.seq = String(i + 1); });
  addAuditLog(req.user.id, req.user.username, 'delete', '删除客户: ' + delName, req);
  saveData();
  res.json({ success: true });
});

// 批量分配销售
app.post('/api/customers/batch-assign', authRequired, permRequired('edit'), (req, res) => {
  const ids = req.body.ids || [];
  const assignedTo = (req.body.assignedTo || '').trim();
  if (!Array.isArray(ids) || ids.length === 0) {
    return res.status(400).json({ error: '请选择要分配的记录' });
  }
  let updated = 0;
  ids.forEach(function(id) {
    const row = db.customers.find(function(c) { return c.id === parseInt(id); });
    if (row) { row.assignedTo = assignedTo; updated++; }
  });
  addAuditLog(req.user.id, req.user.username, 'edit', '批量分配销售 ' + updated + ' 条给' + (assignedTo || '空'), req);
  saveData();
  res.json({ success: true, updated: updated });
});

// 获取店铺列表
app.get('/api/stores', authRequired, (req, res) => {
  res.json({ stores: db.stores });
});

// 新增店铺
app.post('/api/stores', authRequired, (req, res) => {
  const name = (req.body.name || '').trim();
  if (!name) {
    return res.status(400).json({ error: '店铺名不能为空' });
  }
  if (db.stores.indexOf(name) < 0) {
    db.stores.push(name);
    saveData();
  }
  res.json({ success: true, stores: db.stores });
});

// 客户字段配置：学历、专业、申报级别、店铺
const customerConfigKeys = { degree: 'degrees', major: 'majors', applyLevel: 'applyLevels', store: 'stores' };
function customerConfigList(type) {
  const key = customerConfigKeys[type];
  if (!key) return null;
  return type === 'store' ? db.stores : db.customerConfigs[key];
}

app.get('/api/customer-configs', authRequired, (req, res) => {
  res.json({
    degree: db.customerConfigs.degrees,
    major: db.customerConfigs.majors,
    applyLevel: db.customerConfigs.applyLevels,
    store: db.stores
  });
});

app.post('/api/customer-configs/:type', authRequired, permRequired('edit'), (req, res) => {
  const list = customerConfigList(req.params.type);
  const value = String(req.body.value || '').trim();
  if (!list) return res.status(400).json({ error: '不支持的配置类型' });
  if (!value) return res.status(400).json({ error: '配置内容不能为空' });
  if (!list.includes(value)) {
    list.push(value);
    addAuditLog(req.user.id, req.user.username, 'customer_config', '新增客户配置: ' + req.params.type + ' / ' + value, req);
    saveData();
  }
  res.json({ success: true, values: list });
});

app.delete('/api/customer-configs/:type', authRequired, adminRequired, (req, res) => {
  const list = customerConfigList(req.params.type);
  const value = String(req.query.value || '').trim();
  if (!list) return res.status(400).json({ error: '不支持的配置类型' });
  const index = list.indexOf(value);
  if (index >= 0) {
    list.splice(index, 1);
    addAuditLog(req.user.id, req.user.username, 'customer_config', '删除客户配置: ' + req.params.type + ' / ' + value, req);
    saveData();
  }
  res.json({ success: true, values: list });
});

// 悟空CRM同步设置。凭据与Token仅在服务端加密保存，不会返回给浏览器。
app.get('/api/wukong-sync-settings', adminRequired, (req, res) => {
  res.json({ settings: getWukongSyncSettings(db.wukongSync), stores: db.stores });
});

app.put('/api/wukong-sync-settings', adminRequired, (req, res) => {
  const input = req.body || {};
  const selectedStores = Array.isArray(input.syncStores) ? input.syncStores.map(v => String(v || '').trim()).filter(Boolean) : [];
  const invalidStore = selectedStores.find(name => !db.stores.includes(name));
  if (invalidStore) return res.status(400).json({ error: '同步店铺不存在: ' + invalidStore });
  const next = updateWukongSyncSettings(db.wukongSync, Object.assign({}, input, { syncStores: selectedStores }));
  const isScopeOnlyUpdate = Object.keys(input).every(key => key === 'syncStores');
  if (!isScopeOnlyUpdate && next.enabled && (!next.baseUrl || !next.username || !next.encryptedPassword)) {
    return res.status(400).json({ error: '启用同步前请填写悟空CRM地址、账号和密码' });
  }
  db.wukongSync = next;
  addAuditLog(req.user.id, req.user.username, 'wukong_sync_config', '更新悟空CRM同步设置', req);
  saveData();
  res.json({ success: true, settings: getWukongSyncSettings(db.wukongSync) });
});

app.post('/api/wukong-sync-settings/token', adminRequired, async (req, res) => {
  try {
    const input = req.body || {};
    if (Object.keys(input).length) db.wukongSync = updateWukongSyncSettings(db.wukongSync, input);
    db.wukongSync = await fetchWukongToken(db.wukongSync);
    addAuditLog(req.user.id, req.user.username, 'wukong_sync_token', '获取悟空CRM Token成功', req);
    saveData();
    res.json({ success: true, settings: getWukongSyncSettings(db.wukongSync) });
  } catch (err) {
    addAuditLog(req.user.id, req.user.username, 'wukong_sync_token', '获取悟空CRM Token失败: ' + err.message, req);
    saveData();
    res.status(400).json({ error: err.message || '获取Token失败' });
  }
});

app.post('/api/wukong-sync-settings/validate-token', adminRequired, async (req, res) => {
  const result = await validateWukongToken(db.wukongSync);
  db.wukongSync = result.config;
  saveData();
  res.json({ valid: result.valid, reason: result.reason || '', settings: getWukongSyncSettings(db.wukongSync) });
});

app.get('/api/wukong-sync-queue', adminRequired, (req, res) => {
  const pageSize = Math.min(Math.max(parseInt(req.query.pageSize) || 20, 1), 100);
  const queue = db.wukongSyncQueue.slice().sort((a, b) => {
    const statusOrder = { pending: 0, failed: 1, synced: 2 };
    const statusDiff = (statusOrder[a.status] ?? 9) - (statusOrder[b.status] ?? 9);
    return statusDiff || String(b.createdAt || '').localeCompare(String(a.createdAt || ''));
  });
  const total = queue.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const page = Math.min(Math.max(parseInt(req.query.page) || 1, 1), totalPages);
  const rows = queue.slice((page - 1) * pageSize, page * pageSize).map((job) => {
    const customer = db.customers.find(row => Number(row.id) === Number(job.customerId));
    return Object.assign({}, job, {
      customerName: customer ? customer.name : '已删除客户',
      phone: customer ? customer.phone : '',
      assignedTo: customer ? customer.assignedTo : ''
    });
  });
  res.json({
    queue: rows,
    total: total,
    pendingCount: queue.filter(job => job.status !== 'synced').length,
    page: page,
    pageSize: pageSize,
    totalPages: totalPages
  });
});

app.post('/api/wukong-sync-queue/sync', adminRequired, async (req, res) => {
  if (wukongSyncInProgress) return res.status(409).json({ error: '同步任务正在执行，请稍后刷新列表' });
  const settings = getWukongSyncSettings(db.wukongSync);
  if (!settings.enabled) return res.status(400).json({ error: '请先启用客户同步' });
  if (!settings.hasToken) return res.status(400).json({ error: '请先获取悟空CRM Token' });

  wukongSyncInProgress = true;
  const summary = { success: 0, failed: 0, skipped: 0 };
  try {
    const jobs = db.wukongSyncQueue.filter(job => job.status !== 'synced');
    for (const job of jobs) {
      const customer = db.customers.find(row => Number(row.id) === Number(job.customerId));
      job.attempts = (parseInt(job.attempts) || 0) + 1;
      if (!customer) {
        job.status = 'failed';
        job.lastError = '客户记录已删除';
        summary.failed++;
        continue;
      }
      try {
        const creator = db.users.find(user => user.username === customer.createdBy) || req.user;
        const result = await syncCustomerToWukong(customer, creator, db.wukongSync);
        if (result && result.skipped) {
          job.status = 'pending';
          job.lastError = result.reason || '当前客户不满足同步条件';
          summary.skipped++;
          continue;
        }
        job.status = 'synced';
        job.lastError = '';
        job.syncedAt = new Date().toISOString();
        customer.wukongSyncStatus = 'success';
        customer.wukongSyncedAt = job.syncedAt;
        summary.success++;
      } catch (err) {
        job.status = 'failed';
        job.lastError = err.message || '同步失败';
        customer.wukongSyncStatus = 'failed';
        customer.wukongSyncError = job.lastError;
        customer.wukongSyncedAt = new Date().toISOString();
        summary.failed++;
      }
    }
    addAuditLog(req.user.id, req.user.username, 'wukong_sync_run', '执行客户同步：成功' + summary.success + '条，失败' + summary.failed + '条，跳过' + summary.skipped + '条', req);
    saveData();
    res.json({ success: true, summary: summary });
  } finally {
    wukongSyncInProgress = false;
  }
});

// 获取有客户记录的员工列表
app.get('/api/customers/creators', authRequired, (req, res) => {
  if (!req.user.isAdmin) {
    return res.status(403).json({ error: '仅管理员可查看' });
  }
  const creators = {};
  db.customers.forEach(c => {
    if (c.invalid) return;
    const name = c.createdBy || '未知';
    creators[name] = (creators[name] || 0) + 1;
  });
  res.json({ creators: creators });
});

// 导出全部数据(JSON)
app.get('/api/export-all', authRequired, permRequired('exportAll'), (req, res) => {
  res.json({
    customers: db.customers,
    nextId: db.nextCustomerId
  });
});

// 导入数据(JSON)
app.post('/api/import-data', authRequired, permRequired('importData'), (req, res) => {
  const data = req.body;
  if (!data.customers || !Array.isArray(data.customers)) {
    return res.status(400).json({ error: '数据格式不正确' });
  }
  db.customers = data.customers;
  db.nextCustomerId = data.nextId || (db.customers.length > 0
    ? Math.max.apply(null, db.customers.map(c => c.id || 0)) + 1
    : 1);
  db.customers.forEach((c, i) => {
    if (!c.seq) c.seq = String(i + 1);
    if (!c.id) c.id = db.nextCustomerId++;
  });
  saveData();
  res.json({ success: true, count: db.customers.length });
});

// ========== 子账号管理API ==========

// 修改自己的密码（所有登录用户可用）
app.post('/api/change-password', authRequired, (req, res) => {
  const { oldPassword, newPassword } = req.body;
  if (!oldPassword || !newPassword) {
    return res.status(400).json({ error: '请输入旧密码和新密码' });
  }
  if (!verifyPassword(oldPassword, req.user)) {
    return res.status(400).json({ error: '旧密码不正确' });
  }
  if (newPassword.length < 3) {
    return res.status(400).json({ error: '新密码至少3位' });
  }
  const u = db.users.find(x => x.id === req.user.id);
  if (!u) return res.status(404).json({ error: '用户不存在' });
  u.salt = generateSalt();
  u.password = hashPassword(newPassword, u.salt);
  addAuditLog(req.user.id, req.user.username, 'change_password', '修改自己的密码', req);
  saveData();
  res.json({ success: true });
});

app.get('/api/users', adminRequired, (req, res) => {
  const users = db.users.map(u => ({
    id: u.id,
    username: u.username,
    name: u.name,
    isAdmin: !!u.isAdmin,
    permissions: u.permissions || {}
  }));
  res.json({ users });
});

app.post('/api/users', adminRequired, (req, res) => {
  const { username, password, name, permissions, isAdmin } = req.body;
  if (!username || !password) {
    return res.status(400).json({ error: '用户名和密码不能为空' });
  }
  if (db.users.find(u => u.username === username)) {
    return res.status(400).json({ error: '用户名已存在' });
  }
  const beAdmin = !!isAdmin;
  const perms = {};
  if (beAdmin) {
    ALL_PERMISSIONS.forEach(p => { perms[p] = true; });
  } else {
    ALL_PERMISSIONS.forEach(p => {
      perms[p] = !!(permissions && permissions[p]);
    });
  }
  const userSalt = generateSalt();
  const user = {
    id: db.nextUserId++,
    username: username,
    salt: userSalt,
    password: hashPassword(password, userSalt),
    name: name || username,
    isAdmin: beAdmin,
    permissions: perms
  };
  db.users.push(user);
  addAuditLog(req.user.id, req.user.username, 'user_create', '创建账号: ' + user.username + (beAdmin ? ' (管理员)' : ''), req);
  saveData();
  res.json({
    success: true,
    user: {
      id: user.id,
      username: user.username,
      name: user.name,
      isAdmin: beAdmin,
      permissions: user.permissions
    }
  });
});

app.put('/api/users/:id', adminRequired, (req, res) => {
  const id = parseInt(req.params.id);
  const user = db.users.find(u => u.id === id);
  if (!user) {
    return res.status(404).json({ error: '用户不存在' });
  }
  const { name, password, permissions, isAdmin } = req.body;

  // 处理管理员身份变更
  if (isAdmin !== undefined) {
    const wantAdmin = !!isAdmin;
    if (!wantAdmin && user.isAdmin) {
      // 降级保护：不能降级自己，不能降级最后一个管理员
      if (user.id === req.user.id) {
        return res.status(400).json({ error: '不能取消自己的管理员身份' });
      }
      const adminCount = db.users.filter(u => u.isAdmin).length;
      if (adminCount <= 1) {
        return res.status(400).json({ error: '系统至少需要1个管理员' });
      }
      user.isAdmin = false;
      // 降级时更新权限为指定权限
      const perms = {};
      ALL_PERMISSIONS.forEach(p => {
        perms[p] = !!(permissions && permissions[p]);
      });
      user.permissions = perms;
    } else if (wantAdmin && !user.isAdmin) {
      user.isAdmin = true;
      ALL_PERMISSIONS.forEach(p => { user.permissions[p] = true; });
    }
  }

  if (name !== undefined) user.name = name;
  if (password) {
    user.salt = generateSalt();
    user.password = hashPassword(password, user.salt);
  }
  // 非管理员才允许单独修改权限
  if (permissions && !user.isAdmin) {
    const perms = {};
    ALL_PERMISSIONS.forEach(p => {
      perms[p] = !!permissions[p];
    });
    user.permissions = perms;
  }
  addAuditLog(req.user.id, req.user.username, 'user_edit', '编辑账号: ' + user.username, req);
  try {
    saveData();
  } catch(e) {
    console.error('权限保存失败:', e.message);
    return res.status(500).json({ error: '保存失败: ' + e.message });
  }
  res.json({
    success: true,
    user: {
      id: user.id,
      username: user.username,
      name: user.name,
      isAdmin: user.isAdmin,
      permissions: user.permissions
    }
  });
});

app.delete('/api/users/:id', adminRequired, (req, res) => {
  const id = parseInt(req.params.id);
  const user = db.users.find(u => u.id === id);
  if (!user) {
    return res.status(404).json({ error: '用户不存在' });
  }
  // 不能删除自己
  if (user.id === req.user.id) {
    return res.status(400).json({ error: '不能删除自己' });
  }
  // 管理员保护：至少保留1个管理员
  if (user.isAdmin) {
    const adminCount = db.users.filter(u => u.isAdmin).length;
    if (adminCount <= 1) {
      return res.status(400).json({ error: '系统至少需要1个管理员，不能删除' });
    }
  }
  for (const [token, session] of tokens.entries()) {
    if (session.userId === id) {
      tokens.delete(token);
    }
  }
  db.users = db.users.filter(u => u.id !== id);
  addAuditLog(req.user.id, req.user.username, 'user_delete', '删除账号: ' + (user.username || 'ID:' + id), req);
  saveData();
  res.json({ success: true });
});

// ========== 项目管理API ==========

// 创建项目
app.post('/api/admin/projects', taskAccessRequired, (req, res) => {
  const name = (req.body.name || '').trim();
  if (!name) {
    return res.status(400).json({ error: '项目名称不能为空' });
  }
  const copyText = (req.body.copyText || '').trim();
  const project = {
    id: db.nextProjectId++,
    name: name,
    copyText: copyText,
    ownerId: req.user.id,
    createdAt: new Date().toISOString()
  };
  db.projects.push(project);
  saveData();
  res.json({ success: true, project });
});

// 项目列表
app.get('/api/admin/projects', taskAccessRequired, (req, res) => {
  let userProjects = req.user.isAdmin ? db.projects : db.projects.filter(p => p.ownerId === req.user.id);
  const projects = userProjects.map(p => {
    const projTasks = db.tasks.filter(t => t.projectId === p.id);
    const owner = db.users.find(u => u.id === p.ownerId);
    return {
      id: p.id,
      name: p.name,
      copyText: p.copyText || '',
      ownerId: p.ownerId,
      ownerName: owner ? owner.name : '未知',
      createdAt: p.createdAt,
      total: projTasks.length,
      used: projTasks.filter(t => t.status === 'used').length,
      remaining: projTasks.filter(t => t.status === 'unused').length
    };
  });
  res.json({ projects });
});

// 更新项目（修改固定复制文本等）
app.put('/api/admin/projects/:id', taskAccessRequired, (req, res) => {
  const id = parseInt(req.params.id);
  const project = db.projects.find(p => p.id === id);
  if (!project) {
    return res.status(404).json({ error: '项目不存在' });
  }
  if (!canAccessProject(req, id)) {
    return res.status(403).json({ error: '无权操作此项目' });
  }
  if (req.body.copyText !== undefined) {
    project.copyText = req.body.copyText.trim();
  }
  if (req.body.name) {
    project.name = req.body.name.trim();
  }
  saveData();
  res.json({ success: true, project: { id: project.id, name: project.name, copyText: project.copyText } });
});

// 删除项目（同时删除该项目下所有题目）
app.delete('/api/admin/projects/:id', taskAccessRequired, (req, res) => {
  const id = parseInt(req.params.id);
  const idx = db.projects.findIndex(p => p.id === id);
  if (idx === -1) {
    return res.status(404).json({ error: '项目不存在' });
  }
  if (!canAccessProject(req, id)) {
    return res.status(403).json({ error: '无权操作此项目' });
  }
  db.projects.splice(idx, 1);
  db.tasks = db.tasks.filter(t => t.projectId !== id);
  saveData();
  res.json({ success: true });
});

// ========== 任务分发API ==========

// 兼职人员页面
app.get('/worker', (req, res) => {
  res.sendFile(path.join(ROOT_DIR, 'public', 'worker.html'));
});

// 获取项目信息（无需登录）
app.get('/api/tasks/project-info', (req, res) => {
  const projectId = parseInt(req.query.project) || 0;
  const project = db.projects.find(p => p.id === projectId);
  if (!project) {
    return res.json({ success: false, message: '项目不存在或链接无效' });
  }
  const projTasks = db.tasks.filter(t => t.projectId === projectId);
  const remaining = projTasks.filter(t => t.status === 'unused').length;
  res.json({
    success: true,
    name: project.name,
    copyText: project.copyText || '',
    remaining
  });
});

// 领取任务（无需登录，IP + 浏览器指纹 + localStorage 三层防刷）
app.post('/api/tasks/get', (req, res) => {
  const projectId = parseInt(req.body.projectId) || 0;
  const project = db.projects.find(p => p.id === projectId);
  if (!project) {
    return res.json({ success: false, message: '项目不存在' });
  }
  const ip = req.headers['x-forwarded-for'] || req.headers['x-real-ip'] || req.socket.remoteAddress || '';
  const ipKey = ip + '_' + projectId;
  const fingerprint = (req.body.fingerprint || '').trim();
  const fpKey = fingerprint + '_' + projectId;
  if (!db.taskIps) db.taskIps = {};
  if (!db.taskFps) db.taskFps = {};
  if (db.taskIps[ipKey]) {
    const usedTask = db.tasks.find(t => t.id === db.taskIps[ipKey]);
    const usedImgs = usedTask ? (usedTask.images || []).map(f => '/uploads/' + f) : [];
    return res.json({ success: false, message: '已领取过', question: usedTask ? usedTask.content : '', images: usedImgs });
  }
  if (fingerprint && db.taskFps[fpKey]) {
    const usedTask = db.tasks.find(t => t.id === db.taskFps[fpKey]);
    const usedImgs = usedTask ? (usedTask.images || []).map(f => '/uploads/' + f) : [];
    return res.json({ success: false, message: '已领取过', question: usedTask ? usedTask.content : '', images: usedImgs });
  }
  const unused = db.tasks.filter(t => t.projectId === projectId && t.status === 'unused');
  if (unused.length === 0) {
    return res.json({ success: false, message: '题目已领完' });
  }
  const idx = Math.floor(Math.random() * unused.length);
  const task = unused[idx];
  task.status = 'used';
  task.usedAt = new Date().toISOString();
  task.usedByIp = ip;
  task.usedByFp = fingerprint;
  db.taskIps[ipKey] = task.id;
  if (fingerprint) db.taskFps[fpKey] = task.id;
  saveData();
  const remaining = db.tasks.filter(t => t.projectId === projectId && t.status === 'unused').length;
  const imageUrls = (task.images || []).map(f => '/uploads/' + f);
  res.json({ success: true, question: task.content, images: imageUrls, copyText: project.copyText || '', remaining });
});

// 兼职人员退回题目
app.post('/api/tasks/return', (req, res) => {
  const projectId = parseInt(req.body.projectId) || 0;
  const fingerprint = (req.body.fingerprint || '').trim();
  const ip = req.headers['x-forwarded-for'] || req.headers['x-real-ip'] || req.socket.remoteAddress || '';
  const ipKey = ip + '_' + projectId;
  const fpKey = fingerprint + '_' + projectId;
  if (!db.taskIps) db.taskIps = {};
  if (!db.taskFps) db.taskFps = {};
  // 找到该IP/指纹领取的题目
  let taskId = db.taskIps[ipKey] || (fingerprint ? db.taskFps[fpKey] : 0);
  if (!taskId) {
    return res.json({ success: false, message: '未找到已领取的题目' });
  }
  const task = db.tasks.find(t => t.id === taskId);
  if (!task) {
    delete db.taskIps[ipKey];
    if (fingerprint) delete db.taskFps[fpKey];
    return res.json({ success: false, message: '题目不存在' });
  }
  // 退回题目
  task.status = 'unused';
  task.usedAt = null;
  task.usedByIp = '';
  delete db.taskIps[ipKey];
  if (fingerprint) delete db.taskFps[fpKey];
  saveData();
  res.json({ success: true, message: '已退回题目' });
});

// 管理员：批量导入任务
app.post('/api/admin/tasks/import', taskAccessRequired, (req, res) => {
  const projectId = parseInt(req.body.projectId) || 0;
  const { questions } = req.body;
  const project = db.projects.find(p => p.id === projectId);
  if (!project) {
    return res.status(400).json({ error: '项目不存在' });
  }
  if (!canAccessProject(req, projectId)) {
    return res.status(403).json({ error: '无权操作此项目' });
  }
  if (!questions || !questions.trim()) {
    return res.status(400).json({ error: '内容不能为空' });
  }
  const lines = questions.split('\n').map(l => l.trim()).filter(l => l.length > 0);
  if (lines.length === 0) {
    return res.status(400).json({ error: '没有有效题目' });
  }
  lines.forEach(line => {
    db.tasks.push({
      id: db.nextTaskId++,
      projectId: projectId,
      content: line,
      status: 'unused',
      createdAt: new Date().toISOString(),
      usedAt: null
    });
  });
  saveData();
  res.json({ success: true, imported: lines.length });
});

// 管理员：添加带图片的题目
app.post('/api/admin/tasks/add-with-images', taskAccessRequired, (req, res) => {
  const projectId = parseInt(req.body.projectId) || 0;
  const content = (req.body.content || '').trim();
  const images = req.body.images || [];
  const project = db.projects.find(p => p.id === projectId);
  if (!project) {
    return res.status(400).json({ error: '项目不存在' });
  }
  if (!canAccessProject(req, projectId)) {
    return res.status(403).json({ error: '无权操作此项目' });
  }
  if (!content) {
    return res.status(400).json({ error: '题目内容不能为空' });
  }
  if (images.length > 5) {
    return res.status(400).json({ error: '最多5张图片' });
  }
  const savedImages = [];
  for (let i = 0; i < images.length; i++) {
    const imgData = images[i];
    const match = imgData.match(/^data:(image\/\w+);base64,(.+)$/);
    if (!match) continue;
    const ext = match[1].split('/')[1].replace('jpeg', 'jpg');
    const buffer = Buffer.from(match[2], 'base64');
    const filename = 'task_' + db.nextTaskId + '_' + i + '.' + ext;
    fs.writeFileSync(path.join(UPLOAD_DIR, filename), buffer);
    savedImages.push(filename);
  }
  db.tasks.push({
    id: db.nextTaskId++,
    projectId: projectId,
    content: content,
    images: savedImages,
    status: 'unused',
    createdAt: new Date().toISOString(),
    usedAt: null
  });
  saveData();
  res.json({ success: true });
});

// 管理员：批量添加带图片的题目
app.post('/api/admin/tasks/batch-add-with-images', taskAccessRequired, (req, res) => {
  const projectId = parseInt(req.body.projectId) || 0;
  const tasks = req.body.tasks || [];
  const project = db.projects.find(p => p.id === projectId);
  if (!project) {
    return res.status(400).json({ error: '项目不存在' });
  }
  if (!canAccessProject(req, projectId)) {
    return res.status(403).json({ error: '无权操作此项目' });
  }
  if (!tasks || tasks.length === 0) {
    return res.status(400).json({ error: '没有题目数据' });
  }
  let imported = 0;
  for (let t = 0; t < tasks.length; t++) {
    const content = (tasks[t].content || '').trim();
    if (!content) continue;
    const images = tasks[t].images || [];
    if (images.length > 5) {
      return res.status(400).json({ error: '第' + (t+1) + '题图片超过5张' });
    }
    const savedImages = [];
    for (let i = 0; i < images.length; i++) {
      const imgData = images[i];
      const match = imgData.match(/^data:(image\/\w+);base64,(.+)$/);
      if (!match) continue;
      const ext = match[1].split('/')[1].replace('jpeg', 'jpg');
      const buffer = Buffer.from(match[2], 'base64');
      const filename = 'task_' + db.nextTaskId + '_' + i + '.' + ext;
      fs.writeFileSync(path.join(UPLOAD_DIR, filename), buffer);
      savedImages.push(filename);
    }
    db.tasks.push({
      id: db.nextTaskId++,
      projectId: projectId,
      content: content,
      images: savedImages,
      status: 'unused',
      createdAt: new Date().toISOString(),
      usedAt: null
    });
    imported++;
  }
  if (imported > 0) {
    addAuditLog(req.user.id, req.user.username, 'task_import', '批量导入题目 ' + imported + ' 道', req);
    saveData();
  }
  res.json({ success: true, imported: imported });
});

// 管理员：任务统计（按项目）
app.get('/api/admin/tasks/stats', taskAccessRequired, (req, res) => {
  const projectId = parseInt(req.query.project) || 0;
  if (!canAccessProject(req, projectId)) {
    return res.status(403).json({ error: '无权操作此项目' });
  }
  const projTasks = db.tasks.filter(t => t.projectId === projectId);
  const total = projTasks.length;
  const used = projTasks.filter(t => t.status === 'used').length;
  const remaining = total - used;
  res.json({ total, used, remaining });
});

// 管理员：任务列表（分页，按项目）
// 导出指定项目的所有题目（不分页）
app.get('/api/admin/tasks/export', taskAccessRequired, (req, res) => {
  const projectId = parseInt(req.query.project) || 0;
  if (!canAccessProject(req, projectId)) {
    return res.status(403).json({ error: '无权操作此项目' });
  }
  const filter = req.query.filter || 'all';
  let filtered = db.tasks.filter(t => t.projectId === projectId);
  if (filter === 'unused') filtered = filtered.filter(t => t.status === 'unused');
  else if (filter === 'used') filtered = filtered.filter(t => t.status === 'used');
  const q = (req.query.q || '').trim();
  if (q) {
    filtered = filtered.filter(t => t.content.indexOf(q) >= 0);
  }
  res.json({ tasks: filtered, total: filtered.length });
});
app.get('/api/admin/tasks/list', taskAccessRequired, (req, res) => {
  const projectId = parseInt(req.query.project) || 0;
  if (!canAccessProject(req, projectId)) {
    return res.status(403).json({ error: '无权操作此项目' });
  }
  const page = parseInt(req.query.page) || 1;
  const pageSize = Math.min(Math.max(parseInt(req.query.pageSize) || 50, 1), 200);
  const filter = req.query.filter || 'all';
  
  let filtered = db.tasks.filter(t => t.projectId === projectId);
  if (filter === 'unused') filtered = filtered.filter(t => t.status === 'unused');
  else if (filter === 'used') filtered = filtered.filter(t => t.status === 'used');
  
  const q = (req.query.q || '').trim();
  if (q) {
    filtered = filtered.filter(t => t.content.indexOf(q) >= 0);
  }
  
  const total = filtered.length;
  const offset = (page - 1) * pageSize;
  const items = filtered.slice(offset, offset + pageSize);
  
  res.json({
    tasks: items,
    total,
    page,
    pageSize,
    totalPages: Math.ceil(total / pageSize)
  });
});

// 管理员：清空指定项目的所有题目
app.delete('/api/admin/tasks/clear', taskAccessRequired, (req, res) => {
  const projectId = parseInt(req.query.project) || 0;
  if (!canAccessProject(req, projectId)) {
    return res.status(403).json({ error: '无权操作此项目' });
  }
  const taskIds = new Set(db.tasks.filter(t => t.projectId === projectId).map(t => t.id));
  db.tasks = db.tasks.filter(t => t.projectId !== projectId);
  Object.keys(db.taskIps || {}).forEach(key => {
    if (taskIds.has(db.taskIps[key])) delete db.taskIps[key];
  });
  Object.keys(db.taskFps || {}).forEach(key => {
    if (taskIds.has(db.taskFps[key])) delete db.taskFps[key];
  });
  saveData();
  res.json({ success: true });
});

// 管理员：删除单个题目
app.delete('/api/admin/tasks/:id', taskAccessRequired, (req, res) => {
  const id = parseInt(req.params.id);
  const idx = db.tasks.findIndex(t => t.id === id);
  if (idx === -1) {
    return res.status(404).json({ error: '题目不存在' });
  }
  if (!canAccessProject(req, db.tasks[idx].projectId)) {
    return res.status(403).json({ error: '无权操作此项目' });
  }
  db.tasks.splice(idx, 1);
  Object.keys(db.taskIps || {}).forEach(key => {
    if (db.taskIps[key] === id) delete db.taskIps[key];
  });
  Object.keys(db.taskFps || {}).forEach(key => {
    if (db.taskFps[key] === id) delete db.taskFps[key];
  });
  saveData();
  res.json({ success: true });
});



// ========== 留资统计 ==========
// 获取某天的留资统计（从客户登记表聚合 + 咨询量记录）

// 版本检查
app.get('/api/version', (req, res) => {
  res.json({ version: VERSION });
});

// 审计日志查询（仅管理员）
app.get('/api/audit-logs', authRequired, adminRequired, (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 50;
    const action = req.query.action || '';
    const username = req.query.username || '';
    let logs = db.auditLogs.slice().reverse(); // 最新在前
    if (action) logs = logs.filter(l => l.action === action);
    if (username) logs = logs.filter(l => l.username === username);
    const total = logs.length;
    const start = (page - 1) * pageSize;
    const pageLogs = logs.slice(start, start + pageSize);
    res.json({
      logs: pageLogs,
      total: total,
      page: page,
      pageSize: pageSize,
      totalPages: Math.ceil(total / pageSize)
    });
  } catch (e) {
    res.status(500).json({ error: '查询审计日志失败: ' + e.message });
  }
});

app.get('/api/lead-stats', authRequired, permRequired('leadStats'), (req, res) => {
  try {
  const date = req.query.date || localDateStr(new Date());
  
  // Ensure consultStats exists
  if (!db.consultStats) db.consultStats = [];
  if (!Array.isArray(db.customers)) db.customers = [];
  
  console.log('[lead-stats] date:', date, 'user:', req.user.username, 'isAdmin:', req.user.isAdmin, 'customers:', db.customers.length, 'consultStats:', db.consultStats.length);
  
  // username -> displayName 映射
  function getDisplayName(uname) {
    if (!uname) return '(未分配)';
    const u = db.users.find(u => u.username === uname);
    return (u && u.name) ? u.name : uname;
  }
  
  // 从客户登记表按天聚合
  let customers = db.customers || [];
  if (!req.user.isAdmin) {
    customers = customers.filter(c => !c.createdBy || c.createdBy === req.user.username);
  }
  
  // 按createdBy+date聚合留资量
  const leadMap = {};
  customers.forEach(c => {
    if (c.invalid) return;
    if (!c.date || typeof c.date !== 'string') return;
    const cDate = c.date.slice(0, 10);
    if (cDate !== date) return;
    const user = c.createdBy || '(未分配)';
    if (!leadMap[user]) leadMap[user] = 0;
    leadMap[user]++;
  });
  
  // 查询咨询量记录
  let stats = db.consultStats.filter(s => s.date === date);
  if (!req.user.isAdmin) {
    stats = stats.filter(s => s.username === req.user.username);
  }
  
  // 合并数据
  const result = {};
  // 先加入有留资的员工
  Object.keys(leadMap).forEach(user => {
    result[user] = {
      username: getDisplayName(user),
      rawUser: user,
      leadCount: leadMap[user],
      consultCount: 0,
      invalidConsultCount: 0,
      rate: 0,
      commission: 0
    };
  });
  // 再合并有咨询量的员工
  stats.forEach(s => {
    if (!result[s.username]) {
      result[s.username] = {
        username: getDisplayName(s.username),
        rawUser: s.username,
        leadCount: 0,
        consultCount: 0,
        invalidConsultCount: 0,
        rate: 0,
        commission: 0
      };
    }
    result[s.username].consultCount = Number(s.consultCount || 0);
    result[s.username].invalidConsultCount = Number(s.invalidConsultCount || 0);
    result[s.username].statId = s.id;
  });
  
  // 计算留资率和提成
  Object.values(result).forEach(r => {
    r.effectiveConsultCount = getEffectiveConsultCount(r.consultCount, r.invalidConsultCount);
    if (r.effectiveConsultCount > 0) {
      r.rate = Math.round(r.leadCount / r.effectiveConsultCount * 1000) / 10;
    }
    r.commission = calcCommission(r.rate, r.leadCount);
  });
  
  res.json({
    date: date,
    stats: Object.values(result).sort((a, b) => b.leadCount - a.leadCount)
  });
  } catch(err) {
    console.error('lead-stats error:', err);
    res.status(500).json({ error: '服务器内部错误: ' + err.message });
  }
});

// 获取留资统计汇总（排行榜）
app.get('/api/lead-stats/summary', authRequired, permRequired('leadStats'), (req, res) => {
  try {
  const startDate = req.query.startDate;
  const endDate = req.query.endDate;
  
  // Ensure consultStats exists
  if (!db.consultStats) db.consultStats = [];
  if (!Array.isArray(db.customers)) db.customers = [];
  
  console.log('[lead-stats/summary] startDate:', startDate, 'endDate:', endDate, 'user:', req.user.username, 'customers:', db.customers.length, 'consultStats:', db.consultStats.length);
  
  // 排行榜：所有员工都能看到全部人的排名（激励作用）
  // 留资量从全部客户数据聚合
  let customers = db.customers || [];
  
  // username -> displayName 映射
  function getDisplayName(uname) {
    if (!uname) return '(未分配)';
    const u = db.users.find(u => u.username === uname);
    return (u && u.name) ? u.name : uname;
  }
  
  // 按员工聚合
  const summaryMap = {};
  customers.forEach(c => {
    if (c.invalid) return;
    if (!c.date || typeof c.date !== 'string') return;
    const cDate = c.date.slice(0, 10);
    if (startDate && cDate < startDate) return;
    if (endDate && cDate > endDate) return;
    const user = c.createdBy || '(未分配)';
    if (!summaryMap[user]) summaryMap[user] = { username: getDisplayName(user), _rawUser: user, leadCount: 0, consultCount: 0, invalidConsultCount: 0, days: 0 };
    summaryMap[user].leadCount++;
  });
  
  // 聚合咨询量（全部员工可见，用于排名）
  let stats = db.consultStats;
  stats.forEach(s => {
    if (startDate && s.date < startDate) return;
    if (endDate && s.date > endDate) return;
    if (!summaryMap[s.username]) {
      summaryMap[s.username] = { username: getDisplayName(s.username), _rawUser: s.username, leadCount: 0, consultCount: 0, invalidConsultCount: 0, days: 0 };
    }
    summaryMap[s.username].consultCount += Number(s.consultCount || 0);
    summaryMap[s.username].invalidConsultCount += Number(s.invalidConsultCount || 0);
    summaryMap[s.username].days++;
  });
  
  // 计算平均留资率（用于排行榜展示）
  Object.values(summaryMap).forEach(r => {
    r.effectiveConsultCount = getEffectiveConsultCount(r.consultCount, r.invalidConsultCount);
    if (r.effectiveConsultCount > 0) {
      r.avgRate = Math.round(r.leadCount / r.effectiveConsultCount * 1000) / 10;
    } else {
      r.avgRate = 0;
    }
  });
  
  // 按日计算提成再累加（每天独立算留资率→单价→提成）
  // 构建 per-user per-day 的数据
  const dailyMap = {}; // {user: {date: {leads, consults}}}
  customers.forEach(c => {
    if (c.invalid) return;
    if (!c.date || typeof c.date !== 'string') return;
    const cDate = c.date.slice(0, 10);
    if (startDate && cDate < startDate) return;
    if (endDate && cDate > endDate) return;
    const user = c.createdBy || '(未分配)';
    if (!dailyMap[user]) dailyMap[user] = {};
    if (!dailyMap[user][cDate]) dailyMap[user][cDate] = { leads: 0, consults: 0 };
    dailyMap[user][cDate].leads++;
  });
  stats.forEach(s => {
    if (startDate && s.date < startDate) return;
    if (endDate && s.date > endDate) return;
    if (!dailyMap[s.username]) dailyMap[s.username] = {};
    if (!dailyMap[s.username][s.date]) dailyMap[s.username][s.date] = { leads: 0, consults: 0, invalidConsults: 0 };
    dailyMap[s.username][s.date].consults = Number(s.consultCount || 0);
    dailyMap[s.username][s.date].invalidConsults = Number(s.invalidConsultCount || 0);
  });
  // 按日累加提成
  Object.values(summaryMap).forEach(r => {
    const userDays = dailyMap[r._rawUser] || {};
    let totalComm = 0;
    Object.keys(userDays).forEach(d => {
      const dd = userDays[d];
      const effectiveConsults = getEffectiveConsultCount(dd.consults, dd.invalidConsults);
      const dayRate = effectiveConsults > 0 ? Math.round(dd.leads / effectiveConsults * 1000) / 10 : 0;
      totalComm += calcCommission(dayRate, dd.leads);
    });
    r.totalCommission = Math.round(totalComm * 100) / 100;
  });
  
  const summary = Object.values(summaryMap).sort((a, b) => b.avgRate - a.avgRate || b.leadCount - a.leadCount);
  const totalLeads = summary.reduce((s, r) => s + r.leadCount, 0);
  const totalConsult = summary.reduce((s, r) => s + r.consultCount, 0);
  
  // Calculate requesting user's monthly commission (before cleanup)
  var myCommission = 0;
  if (req.user.isAdmin) {
    // Admin sees total of all employees' commission
    myCommission = summary.reduce(function(sum, r) { return sum + (r.totalCommission || 0); }, 0);
    myCommission = Math.round(myCommission * 100) / 100;
  } else {
    var myEntry = summary.find(r => r._rawUser === req.user.username);
    if (myEntry) myCommission = myEntry.totalCommission || 0;
  }
  
  // Non-admin: remove others' commission data
  if (!req.user.isAdmin) {
    summary.forEach(r => {
      if (r._rawUser !== req.user.username) { delete r.totalCommission; }
      delete r._rawUser; // 清理内部字段，不返回前端
    });
  } else {
    summary.forEach(r => delete r._rawUser);
  }
  
  res.json({
    summary: summary,
    totalLeads: totalLeads,
    totalConsult: totalConsult,
    overallRate: totalConsult > 0 ? Math.round(totalLeads / totalConsult * 1000) / 10 : 0,
    myCommission: myCommission
  });
  } catch(err) {
    console.error('lead-stats summary error:', err);
    res.status(500).json({ error: '服务器内部错误: ' + err.message });
  }
});

// 保存总咨询量与无效咨询量
app.post('/api/consult-stats', authRequired, permRequired('editConsult'), (req, res) => {
  const { date, username, consultCount, invalidConsultCount } = req.body;
  if (!date || !username) {
    return res.status(400).json({ error: '缺少参数' });
  }
  
  // 非管理员只能填自己的
  const targetUser = req.user.isAdmin ? username : req.user.username;
  
  // 非管理员只能修改当天的咨询数据
  const todayStr = localDateStr(new Date());
  if (!req.user.isAdmin && date !== todayStr) {
    return res.status(403).json({ error: '只能修改当天的咨询数据' });
  }
  
  // 查找已有记录
  let stat = db.consultStats.find(s => s.date === date && s.username === targetUser);
  if (stat) {
    if (consultCount !== undefined) stat.consultCount = parseInt(consultCount) || 0;
    if (invalidConsultCount !== undefined) stat.invalidConsultCount = parseInt(invalidConsultCount) || 0;
  } else {
    stat = {
      id: db.nextConsultStatId++,
      date: date,
      username: targetUser,
      consultCount: parseInt(consultCount) || 0,
      invalidConsultCount: parseInt(invalidConsultCount) || 0
    };
    db.consultStats.push(stat);
  }
  addAuditLog(req.user.id, req.user.username, 'consult_edit', '录入咨询数据: ' + targetUser + ' ' + date + ' 咨询' + (stat.consultCount || 0) + '条，无效咨询' + (stat.invalidConsultCount || 0) + '条', req);
  saveData();
  res.json({ success: true, stat: stat });
});

// 批量录入咨询量（管理员）
app.post('/api/consult-stats/batch', authRequired, permRequired('editConsult'), (req, res) => {
  if (!req.user.isAdmin) {
    return res.status(403).json({ error: '仅管理员可批量录入' });
  }
  const entries = req.body.entries || [];
  if (!Array.isArray(entries) || entries.length === 0) {
    return res.status(400).json({ error: '没有数据' });
  }
  let saved = 0;
  entries.forEach(function(e) {
    if (!e.date || !e.username) return;
    let stat = db.consultStats.find(s => s.date === e.date && s.username === e.username);
    if (stat) {
      if (e.consultCount !== undefined) stat.consultCount = parseInt(e.consultCount) || 0;
      if (e.invalidConsultCount !== undefined) stat.invalidConsultCount = parseInt(e.invalidConsultCount) || 0;
    } else {
      db.consultStats.push({
        id: db.nextConsultStatId++,
        date: e.date,
        username: e.username,
        consultCount: parseInt(e.consultCount) || 0,
        invalidConsultCount: parseInt(e.invalidConsultCount) || 0
      });
    }
    saved++;
  });
  if (saved > 0) {
    addAuditLog(req.user.id, req.user.username, 'consult_edit', '批量录入咨询数据 ' + saved + ' 条', req);
    saveData();
  }
  res.json({ success: true, saved: saved });
});

// 删除咨询量记录
app.delete('/api/consult-stats/:id', authRequired, permRequired('editConsult'), (req, res) => {
  const id = parseInt(req.params.id);
  const idx = db.consultStats.findIndex(s => s.id === id);
  if (idx === -1) {
    return res.status(404).json({ error: '记录不存在' });
  }
  // 非管理员只能删自己的
  if (!req.user.isAdmin && db.consultStats[idx].username !== req.user.username) {
    return res.status(403).json({ error: '无权操作' });
  }
  db.consultStats.splice(idx, 1);
  addAuditLog(req.user.id, req.user.username, 'consult_delete', '删除咨询量记录', req);
  saveData();
  res.json({ success: true });
});

function getEffectiveConsultCount(consultCount, invalidConsultCount) {
  return Math.max(0, Number(consultCount || 0) - Number(invalidConsultCount || 0));
}

// 提成计算函数
function calcCommission(rate, leadCount) {
  if (rate < 55 || leadCount === 0) return 0;
  let unitPrice = 0;
  if (rate >= 80) unitPrice = 5;
  else if (rate >= 75) unitPrice = 4;
  else if (rate >= 70) unitPrice = 3;
  else if (rate >= 65) unitPrice = 2.5;
  else if (rate >= 60) unitPrice = 2;
  else if (rate >= 55) unitPrice = 1;
  // 50% 无提成
  return Math.round(unitPrice * leadCount * 100) / 100;
}


// 提成表详情（按日明细）
app.get('/api/salary/details', authRequired, permRequired('leadStats'), (req, res) => {
  try {
    const month = req.query.month; // YYYY-MM
    if (!month) return res.status(400).json({ error: '缺少month参数' });
    
    const startDate = month + '-01';
    // 计算月末
    const [yy, mm] = month.split('-').map(Number);
    const lastDay = new Date(yy, mm, 0).getDate();
    const endDate = month + '-' + String(lastDay).padStart(2, '0');
    
    if (!db.consultStats) db.consultStats = [];
    if (!Array.isArray(db.customers)) db.customers = [];
    
    function getDisplayName(uname) {
      if (!uname) return '(未分配)';
      const u = db.users.find(u => u.username === uname);
      return (u && u.name) ? u.name : uname;
    }
    
    function getUnitPrice(rate) {
      if (rate >= 80) return 5;
      if (rate >= 75) return 4;
      if (rate >= 70) return 3;
      if (rate >= 65) return 2.5;
      if (rate >= 60) return 2;
      if (rate >= 55) return 1;
      return 0;
    }
    
    // 构建每日数据
    const dailyMap = {}; // {user: {date: {leads, consults}}}
    
    db.customers.forEach(c => {
      if (c.invalid) return;
      if (!c.date || typeof c.date !== 'string') return;
      const cDate = c.date.slice(0, 10);
      if (cDate < startDate || cDate > endDate) return;
      const user = c.createdBy || '(未分配)';
      if (!dailyMap[user]) dailyMap[user] = {};
      if (!dailyMap[user][cDate]) dailyMap[user][cDate] = { leads: 0, consults: 0 };
      dailyMap[user][cDate].leads++;
    });
    
    db.consultStats.forEach(s => {
      if (s.date < startDate || s.date > endDate) return;
      if (!dailyMap[s.username]) dailyMap[s.username] = {};
      if (!dailyMap[s.username][s.date]) dailyMap[s.username][s.date] = { leads: 0, consults: 0, invalidConsults: 0 };
      dailyMap[s.username][s.date].consults = Number(s.consultCount || 0);
      dailyMap[s.username][s.date].invalidConsults = Number(s.invalidConsultCount || 0);
    });
    
    // 非管理员只看自己
    const targetUsers = req.user.isAdmin ? Object.keys(dailyMap) : [req.user.username].filter(u => dailyMap[u]);
    
    const weekdays = ['日','一','二','三','四','五','六'];
    const result = [];
    let grandTotal = 0;
    
    targetUsers.forEach(user => {
      const userDays = dailyMap[user] || {};
      const sortedDates = Object.keys(userDays).sort();
      const days = [];
      let totalLeads = 0, totalConsults = 0, totalInvalidConsults = 0, totalEffectiveConsults = 0, totalComm = 0;
      let missingDays = 0; // 有留资但无有效咨询量的天数
      
      sortedDates.forEach(d => {
        const dd = userDays[d];
        const effectiveConsultCount = getEffectiveConsultCount(dd.consults, dd.invalidConsults);
        const rate = effectiveConsultCount > 0 ? Math.round(dd.leads / effectiveConsultCount * 1000) / 10 : 0;
        const unitPrice = getUnitPrice(rate);
        const commission = effectiveConsultCount > 0 ? calcCommission(rate, dd.leads) : 0;
        const wd = new Date(d + 'T00:00:00').getDay();
        
        days.push({
          date: d,
          weekday: weekdays[wd],
          consultCount: dd.consults,
          invalidConsultCount: Number(dd.invalidConsults || 0),
          effectiveConsultCount: effectiveConsultCount,
          leadCount: dd.leads,
          rate: rate,
          unitPrice: unitPrice,
          commission: commission,
          missing: effectiveConsultCount === 0 && dd.leads > 0
        });
        
        totalLeads += dd.leads;
        totalConsults += dd.consults;
        totalInvalidConsults += Number(dd.invalidConsults || 0);
        totalEffectiveConsults += effectiveConsultCount;
        totalComm += commission;
        if (effectiveConsultCount === 0 && dd.leads > 0) missingDays++;
      });
      
      const avgRate = totalEffectiveConsults > 0 ? Math.round(totalLeads / totalEffectiveConsults * 1000) / 10 : 0;
      
      result.push({
        username: getDisplayName(user),
        rawUser: user,
        days: days,
        totalLeads: totalLeads,
        totalConsults: totalConsults,
        totalInvalidConsults: totalInvalidConsults,
        totalEffectiveConsults: totalEffectiveConsults,
        avgRate: avgRate,
        totalCommission: Math.round(totalComm * 100) / 100,
        missingDays: missingDays,
        activeDays: sortedDates.length
      });
      
      grandTotal += Math.round(totalComm * 100) / 100;
    });
    
    // 排序：按提成降序
    result.sort((a, b) => b.totalCommission - a.totalCommission);
    
    // 非管理员清理rawUser
    if (!req.user.isAdmin) {
      result.forEach(r => delete r.rawUser);
    }
    
    res.json({
      month: month,
      users: result,
      grandTotal: Math.round(grandTotal * 100) / 100
    });
  } catch(err) {
    console.error('salary details error:', err);
    res.status(500).json({ error: '服务器内部错误: ' + err.message });
  }
});

// 提成表导出CSV
app.get('/api/salary/export', authRequired, permRequired('leadStats'), (req, res) => {
  try {
    const month = req.query.month;
    if (!month) return res.status(400).json({ error: '缺少month参数' });
    const startDate = month + '-01';
    const [yy, mm] = month.split('-').map(Number);
    const lastDay = new Date(yy, mm, 0).getDate();
    const endDate = month + '-' + String(lastDay).padStart(2, '0');
    if (!db.consultStats) db.consultStats = [];
    if (!Array.isArray(db.customers)) db.customers = [];
    function getDisplayName(uname) {
      if (!uname) return '(未分配)';
      const u = db.users.find(u => u.username === uname);
      return (u && u.name) ? u.name : uname;
    }
    const dailyMap = {};
    db.customers.forEach(c => {
      if (c.invalid) return;
      if (!c.date || typeof c.date !== 'string') return;
      const cDate = c.date.slice(0, 10);
      if (cDate < startDate || cDate > endDate) return;
      const user = c.createdBy || '(未分配)';
      if (!dailyMap[user]) dailyMap[user] = {};
      if (!dailyMap[user][cDate]) dailyMap[user][cDate] = { leads: 0, consults: 0 };
      dailyMap[user][cDate].leads++;
    });
    db.consultStats.forEach(s => {
      if (s.date < startDate || s.date > endDate) return;
      if (!dailyMap[s.username]) dailyMap[s.username] = {};
      if (!dailyMap[s.username][s.date]) dailyMap[s.username][s.date] = { leads: 0, consults: 0, invalidConsults: 0 };
      dailyMap[s.username][s.date].consults = Number(s.consultCount || 0);
      dailyMap[s.username][s.date].invalidConsults = Number(s.invalidConsultCount || 0);
    });
    const targetUsers = req.user.isAdmin ? Object.keys(dailyMap) : [req.user.username].filter(u => dailyMap[u]);
    let csv = '\uFEFF日期,星期,员工,总咨询量,无效咨询量,有效咨询量,留资量,留资率(%),单价(元),提成(元)\n';
    const weekdays = ['日','一','二','三','四','五','六'];
    let grandTotal = 0;
    targetUsers.forEach(user => {
      const userDays = dailyMap[user] || {};
      let userTotal = 0;
      Object.keys(userDays).sort().forEach(d => {
        const dd = userDays[d];
        const effectiveConsultCount = getEffectiveConsultCount(dd.consults, dd.invalidConsults);
        const rate = effectiveConsultCount > 0 ? Math.round(dd.leads / effectiveConsultCount * 1000) / 10 : 0;
        let unitPrice = 0;
        if (rate >= 80) unitPrice = 5;
        else if (rate >= 75) unitPrice = 4;
        else if (rate >= 70) unitPrice = 3;
        else if (rate >= 65) unitPrice = 2.5;
        else if (rate >= 60) unitPrice = 2;
        else if (rate >= 55) unitPrice = 1;
        const commission = effectiveConsultCount > 0 ? calcCommission(rate, dd.leads) : 0;
        const wd = new Date(d + 'T00:00:00').getDay();
        csv += d + ',' + weekdays[wd] + ',' + getDisplayName(user) + ',' + dd.consults + ',' + Number(dd.invalidConsults || 0) + ',' + effectiveConsultCount + ',' + dd.leads + ',' + rate + ',' + unitPrice + ',' + commission + '\n';
        userTotal += commission;
      });
      csv += ',,' + getDisplayName(user) + ' 合计,,,,,,,,' + Math.round(userTotal * 100) / 100 + '\n';
      grandTotal += userTotal;
    });
    csv += ',,总计,,,,,,,,' + Math.round(grandTotal * 100) / 100 + '\n';
    res.setHeader('Content-Type', 'text/csv; charset=utf-8');
    res.setHeader('Content-Disposition', 'attachment; filename=salary_' + month + '.csv');
    res.send(csv);
  } catch(err) {
    console.error('salary export error:', err);
    res.status(500).json({ error: '导出失败: ' + err.message });
  }
});


// ========== v5.1.0 ROI 登记器 ==========

// ROI 辅助函数
function calcRoiSingle(r) {
  var gmv = parseFloat(r.gmv) || 0;
  var orders = parseInt(r.orders) || 0;
  var visitors = parseInt(r.visitors) || 0;
  var buyers = parseInt(r.buyers) || 0;
  var patchOrders = parseInt(r.patchOrders) || 0;
  var promoCost = parseFloat(r.promoCost) || 0;
  var commission = parseFloat(r.commission) || 0;
  var otherCost = parseFloat(r.otherCost) || 0;
  var realGmv = gmv - patchOrders * (orders > 0 ? gmv / orders : 0);
  var totalCost = promoCost + commission + otherCost;
  var realRoi = totalCost > 0 ? realGmv / totalCost : 0;
  var surfaceRoi = totalCost > 0 ? gmv / totalCost : 0;
  var patchRatio = orders > 0 ? patchOrders / orders * 100 : 0;
  var convRate = visitors > 0 ? buyers / visitors * 100 : 0;
  return {
    realGmv: Math.round(realGmv * 100) / 100,
    realRoi: Math.round(realRoi * 100) / 100,
    surfaceRoi: Math.round(surfaceRoi * 100) / 100,
    patchRatio: Math.round(patchRatio * 10) / 10,
    convRate: Math.round(convRate * 10) / 10,
    totalCost: Math.round(totalCost * 100) / 100
  };
}

function getRoiPeriodRange(period, dateStr) {
  var d = new Date(dateStr + 'T00:00:00');
  if (period === 'day') {
    return { start: dateStr, end: dateStr };
  } else if (period === 'week') {
    var day = d.getDay() || 7;
    var monday = new Date(d);
    monday.setDate(d.getDate() - day + 1);
    var sunday = new Date(monday);
    sunday.setDate(monday.getDate() + 6);
    return { start: localDateStr(monday), end: localDateStr(sunday) };
  } else if (period === 'month') {
    var firstDay = new Date(d.getFullYear(), d.getMonth(), 1);
    var lastDay = new Date(d.getFullYear(), d.getMonth() + 1, 0);
    return { start: localDateStr(firstDay), end: localDateStr(lastDay) };
  }
  return { start: dateStr, end: dateStr };
}

// ROI 设置
app.get('/api/roi/settings', authRequired, permRequired('roiView'), function(req, res) {
  res.json(db.roiSettings);
});

app.put('/api/roi/settings', authRequired, permRequired('roiManage'), function(req, res) {
  var s = db.roiSettings;
  if (req.body.roiThreshold !== undefined) s.roiThreshold = parseFloat(req.body.roiThreshold) || 2.5;
  if (req.body.perfUnit !== undefined) s.perfUnit = parseFloat(req.body.perfUnit) || 50000;
  if (req.body.perfPerUnit !== undefined) s.perfPerUnit = parseFloat(req.body.perfPerUnit) || 1000;
  if (req.body.perfCap !== undefined) s.perfCap = parseFloat(req.body.perfCap) || 8000;
  addAuditLog(req.user.id, req.user.username, 'roi_settings', '修改ROI参数', req);
  saveData();
  res.json({ success: true, settings: s });
});

// ROI 产品列表
app.get('/api/roi/products', authRequired, permRequired('roiView'), function(req, res) {
  res.json({ products: db.roiProducts });
});

// ROI 新增产品
app.post('/api/roi/products', authRequired, permRequired('roiManage'), function(req, res) {
  var p = {
    id: db.nextRoiProductId++,
    name: String(req.body.name || '').trim(),
    imageUrl: String(req.body.imageUrl || '').trim(),
    productId: String(req.body.productId || '').trim(),
    customFields: Array.isArray(req.body.customFields) ? req.body.customFields : [],
    createdBy: req.user.username,
    createdAt: new Date().toISOString()
  };
  if (!p.name) return res.status(400).json({ error: '产品名称不能为空' });
  db.roiProducts.push(p);
  addAuditLog(req.user.id, req.user.username, 'roi_product', '新增ROI产品: ' + p.name, req);
  saveData();
  res.json({ success: true, product: p });
});

// ROI 修改产品
app.put('/api/roi/products/:id', authRequired, permRequired('roiManage'), function(req, res) {
  var id = parseInt(req.params.id);
  var p = db.roiProducts.find(function(x) { return x.id === id; });
  if (!p) return res.status(404).json({ error: '产品不存在' });
  if (req.body.name !== undefined) p.name = String(req.body.name).trim();
  if (req.body.imageUrl !== undefined) p.imageUrl = String(req.body.imageUrl).trim();
  if (req.body.productId !== undefined) p.productId = String(req.body.productId).trim();
  if (Array.isArray(req.body.customFields)) p.customFields = req.body.customFields;
  addAuditLog(req.user.id, req.user.username, 'roi_product', '修改ROI产品: ' + p.name, req);
  saveData();
  res.json({ success: true, product: p });
});

// ROI 删除产品
app.delete('/api/roi/products/:id', authRequired, permRequired('roiManage'), function(req, res) {
  var id = parseInt(req.params.id);
  var idx = db.roiProducts.findIndex(function(x) { return x.id === id; });
  if (idx < 0) return res.status(404).json({ error: '产品不存在' });
  var name = db.roiProducts[idx].name;
  db.roiProducts.splice(idx, 1);
  db.roiRecords = db.roiRecords.filter(function(r) { return r.productId !== id; });
  addAuditLog(req.user.id, req.user.username, 'roi_product', '删除ROI产品: ' + name, req);
  saveData();
  res.json({ success: true });
});

// ROI 记录列表
app.get('/api/roi/records', authRequired, permRequired('roiView'), function(req, res) {
  var productId = req.query.productId ? parseInt(req.query.productId) : 0;
  var date = req.query.date || '';
  var startDate = req.query.startDate || '';
  var endDate = req.query.endDate || '';
  var all = req.query.all === '1';
  var records = db.roiRecords.filter(function(r) {
    if (!all && r.createdBy !== req.user.username && !req.user.isAdmin) return false;
    if (productId && r.productId !== productId) return false;
    if (date && r.date !== date) return false;
    if (startDate && r.date < startDate) return false;
    if (endDate && r.date > endDate) return false;
    return true;
  });
  res.json({ records: records });
});

// ROI 新增/覆盖记录
app.post('/api/roi/records', authRequired, permRequired('roiEntry'), function(req, res) {
  var date = String(req.body.date || localDateStr(new Date())).trim();
  var productId = parseInt(req.body.productId);
  if (!productId) return res.status(400).json({ error: '请选择产品' });
  var existing = db.roiRecords.find(function(r) {
    return r.date === date && r.productId === productId && r.createdBy === req.user.username;
  });
  var data = {
    visitors: parseInt(req.body.visitors) || 0,
    buyers: parseInt(req.body.buyers) || 0,
    orders: parseInt(req.body.orders) || 0,
    gmv: parseFloat(req.body.gmv) || 0,
    patchOrders: parseInt(req.body.patchOrders) || 0,
    promoCost: parseFloat(req.body.promoCost) || 0,
    commission: parseFloat(req.body.commission) || 0,
    otherCost: parseFloat(req.body.otherCost) || 0
  };
  var calc = calcRoiSingle(data);
  if (existing) {
    Object.assign(existing, data, calc);
    existing.updatedAt = new Date().toISOString();
  } else {
    db.roiRecords.push({
      id: db.nextRoiRecordId++,
      date: date,
      productId: productId,
      createdBy: req.user.username,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      ...data,
      ...calc
    });
  }
  saveData();
  res.json({ success: true });
});

// ROI 删除记录
app.delete('/api/roi/records/:id', authRequired, permRequired('roiEntry'), function(req, res) {
  var id = parseInt(req.params.id);
  var idx = db.roiRecords.findIndex(function(r) { return r.id === id; });
  if (idx < 0) return res.status(404).json({ error: '记录不存在' });
  if (db.roiRecords[idx].createdBy !== req.user.username && !req.user.isAdmin) {
    return res.status(403).json({ error: '只能删除自己的记录' });
  }
  db.roiRecords.splice(idx, 1);
  saveData();
  res.json({ success: true });
});

// ROI 看板
app.get('/api/roi/dashboard', authRequired, permRequired('roiView'), function(req, res) {
  var period = req.query.period || 'day';
  var date = req.query.date || localDateStr(new Date());
  var range = getRoiPeriodRange(period, date);
  var all = req.query.all === '1';
  var records = db.roiRecords.filter(function(r) {
    if (!all && r.createdBy !== req.user.username && !req.user.isAdmin) return false;
    if (r.date < range.start || r.date > range.end) return false;
    return true;
  });
  // 汇总
  var totals = { visitors: 0, buyers: 0, orders: 0, gmv: 0, patchOrders: 0, promoCost: 0, commission: 0, otherCost: 0, realGmv: 0, totalCost: 0 };
  records.forEach(function(r) {
    totals.visitors += r.visitors || 0;
    totals.buyers += r.buyers || 0;
    totals.orders += r.orders || 0;
    totals.gmv += r.gmv || 0;
    totals.patchOrders += r.patchOrders || 0;
    totals.promoCost += r.promoCost || 0;
    totals.commission += r.commission || 0;
    totals.otherCost += r.otherCost || 0;
    totals.realGmv += r.realGmv || 0;
    totals.totalCost += r.totalCost || 0;
  });
  var calc = calcRoiSingle(totals);
  // 按产品分组
  var byProduct = {};
  records.forEach(function(r) {
    if (!byProduct[r.productId]) byProduct[r.productId] = { visitors: 0, buyers: 0, orders: 0, gmv: 0, patchOrders: 0, promoCost: 0, commission: 0, otherCost: 0, realGmv: 0, totalCost: 0, records: 0 };
    var g = byProduct[r.productId];
    g.visitors += r.visitors || 0;
    g.buyers += r.buyers || 0;
    g.orders += r.orders || 0;
    g.gmv += r.gmv || 0;
    g.patchOrders += r.patchOrders || 0;
    g.promoCost += r.promoCost || 0;
    g.commission += r.commission || 0;
    g.otherCost += r.otherCost || 0;
    g.realGmv += r.realGmv || 0;
    g.totalCost += r.totalCost || 0;
    g.records++;
  });
  var productStats = Object.keys(byProduct).map(function(pid) {
    var p = db.roiProducts.find(function(x) { return x.id === parseInt(pid); });
    var calc2 = calcRoiSingle(byProduct[pid]);
    return { productId: parseInt(pid), productName: p ? p.name : '已删除', ...byProduct[pid], ...calc2 };
  });
  res.json({ period: period, date: date, range: range, totals: { ...totals, ...calc }, products: productStats, records: records });
});

// ROI 导出CSV
app.get('/api/roi/export', authRequired, permRequired('roiView'), function(req, res) {
  var start = req.query.start || localDateStr(new Date());
  var end = req.query.end || localDateStr(new Date());
  var records = db.roiRecords.filter(function(r) {
    if (!req.user.isAdmin && r.createdBy !== req.user.username) return false;
    return r.date >= start && r.date <= end;
  });
  var products = {};
  db.roiProducts.forEach(function(p) { products[p.id] = p.name; });
  var csv = '\uFEFF日期,产品,录入人,访客,买家,订单,GMV,补单,推广费,佣金,其他支出,真实GMV,真实ROI,表面ROI,补单占比,转化率\n';
  records.forEach(function(r) {
    csv += [r.date, products[r.productId] || '-', r.createdBy, r.visitors, r.buyers, r.orders, r.gmv, r.patchOrders, r.promoCost, r.commission, r.otherCost, r.realGmv, r.realRoi, r.surfaceRoi, r.patchRatio + '%', r.convRate + '%'].join(',') + '\n';
  });
  res.setHeader('Content-Type', 'text/csv; charset=utf-8');
  res.setHeader('Content-Disposition', 'attachment; filename=roi_' + start + '_' + end + '.csv');
  res.send(csv);
});

// ROI 薪资计算
app.get('/api/roi/salary', authRequired, permRequired('roiManage'), function(req, res) {
  var period = req.query.period || 'month';
  var date = req.query.date || localDateStr(new Date());
  var range = getRoiPeriodRange(period, date);
  var s = db.roiSettings;
  var byUser = {};
  db.roiRecords.filter(function(r) { return r.date >= range.start && r.date <= range.end; }).forEach(function(r) {
    if (!byUser[r.createdBy]) byUser[r.createdBy] = { totalRealGmv: 0, records: 0, totalCost: 0, totalGmv: 0 };
    byUser[r.createdBy].totalRealGmv += r.realGmv || 0;
    byUser[r.createdBy].totalGmv += r.gmv || 0;
    byUser[r.createdBy].totalCost += r.totalCost || 0;
    byUser[r.createdBy].records++;
  });
  var result = Object.keys(byUser).map(function(user) {
    var d = byUser[user];
    var perfUnits = Math.floor(d.totalRealGmv / (s.perfUnit || 50000));
    var perf = Math.min(perfUnits * (s.perfPerUnit || 1000), s.perfCap || 8000);
    var profit = d.totalRealGmv - d.totalCost;
    return { user: user, totalGmv: Math.round(d.totalGmv * 100) / 100, totalRealGmv: Math.round(d.totalRealGmv * 100) / 100, totalCost: Math.round(d.totalCost * 100) / 100, profit: Math.round(profit * 100) / 100, perfUnits: perfUnits, perf: perf, records: d.records };
  });
  res.json({ period: period, range: range, settings: s, users: result });
});


// ========== v5.1.0 考勤打卡 ==========

// 人脸匹配函数
function matchFace(descriptor, employees) {
  if (!descriptor || !Array.isArray(descriptor) || descriptor.length === 0) return null;
  var threshold = 0.5;
  var best = null;
  var bestDist = Infinity;
  for (var i = 0; i < employees.length; i++) {
    var emp = employees[i];
    if (!emp.descriptor || !Array.isArray(emp.descriptor) || emp.descriptor.length !== descriptor.length) continue;
    var sum = 0;
    for (var j = 0; j < descriptor.length; j++) {
      var diff = descriptor[j] - emp.descriptor[j];
      sum += diff * diff;
    }
    var dist = Math.sqrt(sum);
    if (dist < threshold && dist < bestDist) {
      bestDist = dist;
      best = emp;
    }
  }
  return best ? { employee: best, distance: bestDist } : null;
}

var punchLock = false;

// 打卡设置
app.get('/api/punch/settings', authRequired, permRequired('punchUse'), function(req, res) {
  res.json(db.punchSettings);
});

app.put('/api/punch/settings', authRequired, adminRequired, function(req, res) {
  var s = db.punchSettings;
  if (req.body.companyName !== undefined) s.companyName = String(req.body.companyName);
  if (req.body.workStart !== undefined) s.workStart = String(req.body.workStart);
  if (req.body.workEnd !== undefined) s.workEnd = String(req.body.workEnd);
  if (req.body.wifiUrl !== undefined) s.wifiUrl = String(req.body.wifiUrl);
  if (req.body.allowedIp !== undefined) s.allowedIp = String(req.body.allowedIp);
  addAuditLog(req.user.id, req.user.username, 'punch_settings', '修改打卡设置', req);
  saveData();
  res.json({ success: true, settings: s });
});

// 今日打卡状态
app.get('/api/punch/today', authRequired, permRequired('punchUse'), function(req, res) {
  var today = localDateStr(new Date());
  var myRecords = db.punchRecords.filter(function(r) {
    return r.date === today && (r.userId === req.user.id || r.username === req.user.username || req.user.isAdmin);
  });
  res.json({ date: today, records: myRecords });
});

// 打卡记录
app.get('/api/punch/records', authRequired, permRequired('punchView'), function(req, res) {
  var date = req.query.date || '';
  var startDate = req.query.startDate || '';
  var endDate = req.query.endDate || '';
  var all = req.query.all === '1';
  var records = db.punchRecords.filter(function(r) {
    if (!all && r.username !== req.user.username && !req.user.isAdmin) return false;
    if (date && r.date !== date) return false;
    if (startDate && r.date < startDate) return false;
    if (endDate && r.date > endDate) return false;
    return true;
  }).sort(function(a, b) { return b.date.localeCompare(a.date) || (b.checkIn || '').localeCompare(a.checkIn || ''); });
  res.json({ records: records });
});

// 月度考勤表
app.get('/api/punch/monthly', authRequired, permRequired('punchView'), function(req, res) {
  var month = req.query.month || (new Date().getFullYear() + '-' + String(new Date().getMonth() + 1).padStart(2, '0'));
  var year = parseInt(month.split('-')[0]);
  var mon = parseInt(month.split('-')[1]);
  var daysInMonth = new Date(year, mon, 0).getDate();
  
  // Get all employees - deduplicate by name, merge IDs
  var empMap = {};
  db.punchEmployees.forEach(function(e) {
    var name = e.name;
    if (!empMap[name]) {
      empMap[name] = { name: name, ids: [], userId: e.userId || null };
    }
    empMap[name].ids.push(e.id);
    if (e.userId) empMap[name].userId = e.userId;
  });
  var employees = Object.keys(empMap).map(function(name) {
    return empMap[name];
  });
  
  // Non-admin: only see own records
  if (!req.user.isAdmin) {
    employees = employees.filter(function(e) {
      return e.userId === req.user.id || e.name === req.user.username;
    });
  }
  
  // Work time settings for late/early auto-detection
  var workStart = (db.punchSettings && db.punchSettings.workStart) || '09:00';
  var workEnd = (db.punchSettings && db.punchSettings.workEnd) || '18:00';
  var workStartMin = parseInt(workStart.split(':')[0]) * 60 + parseInt(workStart.split(':')[1]);
  var workEndMin = parseInt(workEnd.split(':')[0]) * 60 + parseInt(workEnd.split(':')[1]);

  function timeToMinutes(t) {
    if (!t) return -1;
    var parts = t.split(':');
    return parseInt(parts[0]) * 60 + parseInt(parts[1]);
  }

  // Build attendance matrix
  var result = employees.map(function(emp) {
    var days = {};
    var summary = { attendance: 0, leave: 0, rest: 0, late: 0, early: 0, business: 0, comp: 0 };
    
    for (var d = 1; d <= daysInMonth; d++) {
      var dateStr = month + '-' + String(d).padStart(2, '0');
      var dayOfWeek = new Date(year, mon - 1, d).getDay();
      var isSunday = (dayOfWeek === 0);
      // Search across all merged employee IDs
      var punchRec = db.punchRecords.find(function(r) {
        return r.date === dateStr && emp.ids.indexOf(r.employeeId) !== -1;
      });
      
      // Check manual entries across all merged IDs (manual overrides everything)
      var morningStatus = '';
      var eveningStatus = '';
      emp.ids.forEach(function(eid) {
        var manual = db.attendanceManual[eid] && db.attendanceManual[eid][dateStr];
        if (manual) {
          if (manual.morning && !morningStatus) morningStatus = manual.morning;
          if (manual.evening && !eveningStatus) eveningStatus = manual.evening;
        }
      });
      
      // Auto-registration rules (only when no manual entry)
      if (!morningStatus) {
        if (punchRec && punchRec.checkIn) {
          // Has punch-in: check if late
          var checkInMin = timeToMinutes(punchRec.checkIn);
          if (checkInMin > workStartMin) {
            morningStatus = '迟到';
          } else {
            morningStatus = '正常';
          }
        }
      }
      if (!eveningStatus) {
        if (punchRec && punchRec.checkOut) {
          // Has punch-out: check if early
          var checkOutMin = timeToMinutes(punchRec.checkOut);
          if (checkOutMin < workEndMin) {
            eveningStatus = '早退';
          } else {
            eveningStatus = '正常';
          }
        }
      }
      
      days[dateStr] = {
        morning: morningStatus,
        evening: eveningStatus,
        checkIn: punchRec ? punchRec.checkIn : '',
        checkOut: punchRec ? punchRec.checkOut : '',
        workHours: punchRec ? punchRec.workHours : 0
      };
    }
    
    // Count summary by day (not by slot)
    for (var d = 1; d <= daysInMonth; d++) {
      var dateStr = month + '-' + String(d).padStart(2, '0');
      var dayData = days[dateStr];
      // Count the primary status for the day
      var dayStatus = dayData.morning || dayData.evening || '';
      if (dayStatus === '正常') summary.attendance++;
      else if (dayStatus === '请假') summary.leave++;
      else if (dayStatus === '休息') summary.rest++;
      else if (dayStatus === '迟到') summary.late++;
      else if (dayStatus === '早退') summary.early++;
      else if (dayStatus === '出差') summary.business++;
      else if (dayStatus === '调休') summary.comp++;
    }
    
    return {
      employeeId: emp.ids ? emp.ids[0] : emp.id,
      name: emp.name,
      days: days,
      summary: summary
    };
  });
  
  // Build day headers
  var dayHeaders = [];
  for (var d = 1; d <= daysInMonth; d++) {
    var dateStr = month + '-' + String(d).padStart(2, '0');
    var dayOfWeek = new Date(year, mon - 1, d).getDay();
    var dayNames = ['日', '一', '二', '三', '四', '五', '六'];
    dayHeaders.push({
      date: dateStr,
      day: d,
      week: dayNames[dayOfWeek],
      isSunday: dayOfWeek === 0
    });
  }
  
  res.json({
    month: month,
    daysInMonth: daysInMonth,
    dayHeaders: dayHeaders,
    employees: result,
    isAdmin: req.user.isAdmin
  });
});

// 修改考勤单元格（管理员）
app.put('/api/punch/attendance', authRequired, permRequired('editAttendance'), function(req, res) {
  var employeeId = parseInt(req.body.employeeId);
  var date = req.body.date;
  var slot = req.body.slot; // 'morning' or 'evening'
  var status = req.body.status; // '✅', '假', '休', '迟', '早', '出', '调', ''
  
  if (!employeeId || !date || (slot !== 'morning' && slot !== 'evening')) {
    return res.status(400).json({ error: '参数错误' });
  }
  
  var validStatuses = ['正常', '请假', '休息', '迟到', '早退', '出差', '调休', ''];
  if (validStatuses.indexOf(status) === -1) {
    return res.status(400).json({ error: '无效的状态值' });
  }
  
  if (!db.attendanceManual[employeeId]) db.attendanceManual[employeeId] = {};
  if (!db.attendanceManual[employeeId][date]) db.attendanceManual[employeeId][date] = {};
  
  db.attendanceManual[employeeId][date][slot] = status;
  
  saveData();
  addAuditLog(req.user.id, req.user.username, 'punch_attendance', '修改考勤: 员工' + employeeId + ' ' + date + ' ' + slot + ' = ' + status, req);
  res.json({ success: true });
});

// 上班打卡
function checkCompanyIp(req, res, next) {
  var settings = db.punchSettings || {};
  if (settings.allowedIp) {
    var clientIp = (req.headers['x-real-ip'] || req.headers['x-forwarded-for'] || req.socket.remoteAddress || '').replace('::ffff:', '').split(',')[0].trim();
    if (clientIp !== settings.allowedIp) {
      return res.status(403).json({ error: '请在公司网络下打卡' });
    }
  }
  next();
}

app.post('/api/punch/checkin', authRequired, checkCompanyIp, permRequired('punchUse'), function(req, res) {
  if (punchLock) return res.status(429).json({ error: '系统繁忙，请重试' });
  punchLock = true;
  try {
    var descriptor = req.body.descriptor;
    if (!Array.isArray(descriptor) || descriptor.length === 0) return res.status(400).json({ error: '人脸数据缺失' });
    var match = matchFace(descriptor, db.punchEmployees);
    if (!match) return res.status(404).json({ error: '未识别到已录入的员工，请先在设置中录入人脸' });
    var emp = match.employee;
    var today = localDateStr(new Date());
    var now = new Date();
    var existing = db.punchRecords.find(function(r) {
      return r.date === today && r.employeeId === emp.id && r.checkIn && !r.checkOut;
    });
    if (existing) return res.status(400).json({ error: '今日已打卡上班', record: existing });
    var alreadyDone = db.punchRecords.find(function(r) { return r.date === today && r.employeeId === emp.id && r.checkIn && r.checkOut; });
    if (alreadyDone) return res.status(400).json({ error: '今日已完成上下班打卡', record: alreadyDone });
    var record = {
      id: db.nextPunchRecordId++,
      date: today,
      employeeId: emp.ids ? emp.ids[0] : emp.id,
      name: emp.name,
      username: req.user.username,
      userId: req.user.id,
      checkIn: now.toTimeString().slice(0, 8),
      checkOut: '',
      workHours: 0,
      createdAt: now.toISOString()
    };
    db.punchRecords.push(record);
    saveData();
    res.json({ success: true, record: record, matchedName: emp.name });
  } finally {
    punchLock = false;
  }
});

// 下班打卡
app.post('/api/punch/checkout', authRequired, checkCompanyIp, permRequired('punchUse'), function(req, res) {
  if (punchLock) return res.status(429).json({ error: '系统繁忙，请重试' });
  punchLock = true;
  try {
    var descriptor = req.body.descriptor;
    if (!Array.isArray(descriptor) || descriptor.length === 0) return res.status(400).json({ error: '人脸数据缺失' });
    var match = matchFace(descriptor, db.punchEmployees);
    if (!match) return res.status(404).json({ error: '未识别到已录入的员工' });
    var emp = match.employee;
    var today = localDateStr(new Date());
    var now = new Date();
    var record = db.punchRecords.find(function(r) {
      return r.date === today && r.employeeId === emp.id && r.checkIn && !r.checkOut;
    });
    if (!record) return res.status(400).json({ error: '今日未打卡上班或已完成下班打卡' });
    record.checkOut = now.toTimeString().slice(0, 8);
    var [h1, m1] = record.checkIn.split(':').map(Number);
    var [h2, m2] = record.checkOut.split(':').map(Number);
    record.workHours = Math.round(((h2 * 60 + m2) - (h1 * 60 + m1)) / 60 * 10) / 10;
    record.updatedAt = now.toISOString();
    saveData();
    res.json({ success: true, record: record, matchedName: emp.name });
  } finally {
    punchLock = false;
  }
});

// 员工列表（人脸录入）
app.get('/api/punch/employees', authRequired, permRequired('punchFace'), function(req, res) {
  var list = db.punchEmployees.map(function(e) {
    return { id: e.id, name: e.name, userId: e.userId || null, descriptorLength: e.descriptor ? e.descriptor.length : 0, createdAt: e.createdAt };
  });
  res.json({ employees: list });
});

// 新增员工人脸
app.post('/api/punch/employees', authRequired, permRequired('punchFace'), function(req, res) {
  var name = String(req.body.name || '').trim();
  if (!name) return res.status(400).json({ error: '姓名不能为空' });
  var descriptor = req.body.descriptor;
  if (!Array.isArray(descriptor) || descriptor.length === 0) return res.status(400).json({ error: '人脸数据缺失' });
  var emp = {
    id: db.nextPunchEmployeeId++,
    name: name,
    userId: req.body.userId || null,
    descriptor: descriptor,
    createdBy: req.user.username,
    createdAt: new Date().toISOString()
  };
  db.punchEmployees.push(emp);
  addAuditLog(req.user.id, req.user.username, 'punch_employee', '录入人脸: ' + name, req);
  saveData();
  res.json({ success: true, employee: { id: emp.id, name: emp.name, createdAt: emp.createdAt } });
});

// 删除员工人脸
app.delete('/api/punch/employees/:id', authRequired, permRequired('punchFace'), function(req, res) {
  var id = parseInt(req.params.id);
  var idx = db.punchEmployees.findIndex(function(e) { return e.id === id; });
  if (idx < 0) return res.status(404).json({ error: '员工不存在' });
  var name = db.punchEmployees[idx].name;
  db.punchEmployees.splice(idx, 1);
  addAuditLog(req.user.id, req.user.username, 'punch_employee', '删除人脸: ' + name, req);
  saveData();
  res.json({ success: true });
});

// 管理员删除打卡记录
app.delete('/api/punch/records/:id', authRequired, adminRequired, function(req, res) {
  var id = parseInt(req.params.id);
  var idx = db.punchRecords.findIndex(function(r) { return r.id === id; });
  if (idx === -1) return res.status(404).json({ error: '记录不存在' });
  var deleted = db.punchRecords.splice(idx, 1)[0];
  saveData();
  addAuditLog(req.user.id, req.user.username, 'punch_delete', '删除打卡记录: ' + deleted.name + ' ' + deleted.date, req);
  res.json({ success: true });
});

// 管理员修改打卡记录（修改上班/下班时间）
app.put('/api/punch/records/:id', authRequired, adminRequired, function(req, res) {
  var id = parseInt(req.params.id);
  var rec = db.punchRecords.find(function(r) { return r.id === id; });
  if (!rec) return res.status(404).json({ error: '记录不存在' });
  if (req.body.checkIn !== undefined) rec.checkIn = req.body.checkIn;
  if (req.body.checkOut !== undefined) rec.checkOut = req.body.checkOut;
  // Recalculate work hours
  if (rec.checkIn && rec.checkOut) {
    var cin = rec.checkIn.split(':');
    var cout = rec.checkOut.split(':');
    var mins = (parseInt(cout[0]) * 60 + parseInt(cout[1])) - (parseInt(cin[0]) * 60 + parseInt(cin[1]));
    rec.workHours = Math.round(mins / 60 * 100) / 100;
  } else {
    rec.workHours = 0;
  }
  saveData();
  addAuditLog(req.user.id, req.user.username, 'punch_edit', '修改打卡记录: ' + rec.name + ' ' + rec.date, req);
  res.json({ success: true, record: rec });
});

// 管理员新增打卡记录
app.post('/api/punch/records', authRequired, adminRequired, function(req, res) {
  var rec = {
    id: db.nextPunchRecordId++,
    date: req.body.date || new Date().toISOString().slice(0, 10),
    employeeId: req.body.employeeId || 0,
    name: req.body.name || '',
    username: req.user.username,
    userId: req.user.id,
    checkIn: req.body.checkIn || '',
    checkOut: req.body.checkOut || '',
    workHours: 0,
    createdAt: new Date().toISOString()
  };
  if (rec.checkIn && rec.checkOut) {
    var cin = rec.checkIn.split(':');
    var cout = rec.checkOut.split(':');
    var mins = (parseInt(cout[0]) * 60 + parseInt(cout[1])) - (parseInt(cin[0]) * 60 + parseInt(cin[1]));
    rec.workHours = Math.round(mins / 60 * 100) / 100;
  }
  db.punchRecords.push(rec);
  saveData();
  addAuditLog(req.user.id, req.user.username, 'punch_add', '新增打卡记录: ' + rec.name + ' ' + rec.date, req);
  res.json({ success: true, record: rec });
});

// 打卡导出CSV
app.get('/api/punch/export', authRequired, permRequired('punchView'), function(req, res) {
  var start = req.query.start || localDateStr(new Date());
  var end = req.query.end || localDateStr(new Date());
  var records = db.punchRecords.filter(function(r) {
    if (!req.user.isAdmin && r.username !== req.user.username) return false;
    return r.date >= start && r.date <= end;
  }).sort(function(a, b) { return b.date.localeCompare(a.date); });
  var csv = '\uFEFF日期,姓名,上班时间,下班时间,工时(小时)\n';
  records.forEach(function(r) {
    csv += [r.date, r.name || r.username || '-', r.checkIn || '-', r.checkOut || '-', r.workHours || 0].join(',') + '\n';
  });
  res.setHeader('Content-Type', 'text/csv; charset=utf-8');
  res.setHeader('Content-Disposition', 'attachment; filename=punch_' + start + '_' + end + '.csv');
  res.send(csv);
});

// 获取公网IP（必须在catch-all之前注册）
app.get('/api/myip', function(req, res) {
  var ip = req.headers['x-real-ip'] || req.headers['x-forwarded-for'] || req.socket.remoteAddress || '';
  ip = ip.replace('::ffff:', '').split(',')[0].trim();
  res.json({ ip: ip });
});

// 健康检查端点
app.get('/api/health', function(req, res) {
  res.json({
    ok: true,
    version: VERSION,
    uptime: Math.round(process.uptime()),
    customers: Array.isArray(db.customers) ? db.customers.length : 0,
    users: Array.isArray(db.users) ? db.users.length : 0,
    tokens: tokens.size,
    timestamp: new Date().toISOString()
  });
});

// 所有其他路由返回前端页面（必须放在所有API路由之后！）

app.get('*', (req, res) => {
  if (req.path.startsWith('/api/')) {
    return res.status(404).json({ error: '接口不存在' });
  }
  res.sendFile(path.join(VUE_DIST_DIR, 'index.html'));
});

// ========== 启动服务 ==========
async function start(port) {
  const listenPort = port || PORT;
  await loadData();
  initAdmin();
  migrateProjectOwnership();
  console.log('虎鲸工具箱服务已启动，版本:', VERSION);

  app.listen(listenPort, '0.0.0.0', () => {
    console.log(`创赢工具箱服务已启动，端口: ${listenPort}`);
    console.log(`访问地址: http://localhost:${listenPort}`);
    if (store && store.dbFile) {
      console.log(`SQLite数据库: ${store.dbFile}`);
    }
  });
}

module.exports = {
  app,
  start
};

// ========== 优雅关闭 ==========
function gracefulShutdown(signal) {
  console.log(`[${signal}] 开始优雅关闭...`);
  try {
    saveData();
    console.log('[优雅关闭] 数据已保存');
  } catch (e) {
    console.error('[优雅关闭] 保存数据失败:', e.message);
  }
  // 清理所有token
  tokens.clear();
  process.exit(0);
}

process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));

// 捕获未处理的Promise rejection
process.on('unhandledRejection', (reason, promise) => {
  console.error('[未处理Rejection]', reason);
});

// 捕获未捕获的异常（记录但不退出，让PM2处理）
process.on('uncaughtException', (err) => {
  console.error('[未捕获异常]', err.message, err.stack);
});
