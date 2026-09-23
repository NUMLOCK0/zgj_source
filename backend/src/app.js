/**
 * // === 来自业务调整 ===
 * 职称管家 (ZGJ) 后端核心控制器
 * 严格保持线上运行版本逻辑 100% 一致。
 */
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
const { routeAndDispatchGroupMessage, sendWecomWebhook } = require('./sync/wecomBotDispatcher');
const { defaultConfig: defaultAiConfig, normalizeConfig: normalizeAiConfig, getPublicSettings: getPublicAiSettings, updateSettings: updateAiSettings, extractCustomerInfo } = require('./ai/customerAi');

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
const LARGE_BODY_ROUTES = [
  '/api/import-data',
  '/api/admin/tasks/import',
  '/api/admin/tasks/batch-add-with-images',
  '/api/lead-stats/import',
  '/api/customers/import'
];
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
    if (res.headersSent) {
      return originalJson(data);
    }
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
  ['roiProducts', 'roiRecords'].forEach(function(key) {
    if (!Array.isArray(db[key])) db[key] = [];
  });
  if (!db.roiSettings || typeof db.roiSettings !== 'object')
    db.roiSettings = { roiThreshold: 2.5, perfUnit: 50000, perfPerUnit: 1000, perfCap: 8000 };
  ensureNextId('nextRoiProductId', db.roiProducts);
  ensureNextId('nextRoiRecordId', db.roiRecords);

  // === 财税数据结构初始化 ===
  ['financeCustomers', 'financeConsultStats', 'financeLedger'].forEach((key) => {
    if (!Array.isArray(db[key])) db[key] = [];
  });
  if (!Array.isArray(db.financeStores)) db.financeStores = (defaultDb.financeStores || []).slice();
  if (!db.financeConfigs || typeof db.financeConfigs !== 'object') db.financeConfigs = Object.assign({}, defaultDb.financeConfigs || {});
  db.aiConfig = normalizeAiConfig(Object.assign({}, defaultAiConfig(), db.aiConfig || {}));
  if (!db.wecomBotConfig || typeof db.wecomBotConfig !== 'object') {
    db.wecomBotConfig = {
      globalEnabled: true,
      groups: [],
      nextGroupId: 1,
      nextBotId: 1
    };
  }
  ensureNextId('nextFinanceCustomerId', db.financeCustomers);
  ensureNextId('nextFinanceConsultStatId', db.financeConsultStats);
  ensureNextId('nextFinanceLedgerId', db.financeLedger);

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
function addAuditLog(userId, username, action, detail, req, context = {}) {
  const ip = (req.headers['x-forwarded-for'] || '').split(',')[0].trim() || req.socket.remoteAddress || '';
  const entry = {
    id: db.nextAuditLogId++,
    userId: userId,
    username: username,
    action: action,
    detail: detail,
    ip: ip,
    timestamp: new Date().toISOString()
  };
  if (context && typeof context === 'object' && Object.keys(context).length) entry.context = context;
  db.auditLogs.push(entry);
  // 迁移后历史日志超过5000条，保留最近10000条
  if (db.auditLogs.length > 10000) {
    db.auditLogs = db.auditLogs.slice(-10000);
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
  'dashboardView', 'editConsult', 'reconcileExport', 'feedbackManage',
  'extract', 'register', 'edit', 'delete',
  'copyCard', 'copyData', 'exportExcel', 'clearTable', 'markInvalid',
  'viewData', 'viewHistory', 'viewMasked',
  'financeExtract', 'financeRegister', 'financeView', 'financeEdit', 'financeDelete', 'financeExportExcel', 'financeClear',
  'taskManage', 'qrGen'
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
    const aliases = [perm];
    // 财税登记表使用独立权限名，但复用了客户登记表的通用路由中间件。
    // 在这里做路由范围内的别名映射，避免前端已显示可操作、提交时却返回 403。
    if (req.path.startsWith('/api/finance-customers')) {
      const financeAlias = { edit: 'financeEdit', delete: 'financeDelete', clearTable: 'financeClear' }[perm];
      if (financeAlias) aliases.push(financeAlias);
    }
    if (!aliases.some(name => hasPermission(user, name))) {
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
  const financeRegister = req.path.startsWith('/api/finance-customers') && hasPermission(user, 'financeRegister');
  if (hasPermission(user, 'register') || financeRegister || (hasPermission(user, 'addRow') && req.body && req.body._manualAdd === true)) {
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
// ==================== 个人记账本 (员工收支台账与凭证系统) ====================

// 凭证图片上传（Base64 转本地文件保存）
app.post('/api/ledger/upload-receipt', authRequired, (req, res) => {
  try {
    const { imageBase64, filename } = req.body;
    if (!imageBase64) return res.status(400).json({ error: '图片数据不能为空' });

    const receiptsDir = path.join(ROOT_DIR, 'uploads', 'receipts');
    if (!fs.existsSync(receiptsDir)) {
      fs.mkdirSync(receiptsDir, { recursive: true });
    }

    const matches = imageBase64.match(/^data:image\/([A-Za-z-+\/]+);base64,(.+)$/);
    let ext = 'png';
    let buffer;
    if (matches && matches.length === 3) {
      ext = matches[1].replace('jpeg', 'jpg');
      buffer = Buffer.from(matches[2], 'base64');
    } else {
      buffer = Buffer.from(imageBase64, 'base64');
    }

    const fname = `receipt_${Date.now()}_${Math.random().toString(36).slice(2, 8)}.${ext}`;
    const filePath = path.join(receiptsDir, fname);
    fs.writeFileSync(filePath, buffer);

    res.json({ success: true, url: `/uploads/receipts/${fname}` });
  } catch (err) {
    console.error('upload receipt error:', err);
    res.status(500).json({ error: '上传凭证失败: ' + err.message });
  }
});

// 记账列表
app.get('/api/ledger/records', authRequired, (req, res) => {
  try {
    let list = Array.isArray(db.financeLedger) ? db.financeLedger : [];
    const isAdm = !!req.user.isAdmin;
    const currentUser = req.user.username;

    // 员工只能看自己的，管理员看全员或指定员工
    if (!isAdm) {
      list = list.filter(r => r.createdBy === currentUser);
    } else if (req.query.employee) {
      list = list.filter(r => r.createdBy === req.query.employee);
    }

    const typeFilter = String(req.query.type || ''); // 'income', 'expense'
    const categoryFilter = String(req.query.category || '');
    const startDate = String(req.query.startDate || '');
    const endDate = String(req.query.endDate || '');

    if (typeFilter) list = list.filter(r => r.type === typeFilter);
    if (categoryFilter) list = list.filter(r => r.category === categoryFilter);
    if (startDate && endDate) {
      list = list.filter(r => {
        const d = String(r.date || '').slice(0, 10);
        return d >= startDate && d <= endDate;
      });
    }

    list = list.slice().sort((a, b) => new Date(b.date || 0) - new Date(a.date || 0));

    // 计算统计
    let totalIncome = 0;
    let totalExpense = 0;
    list.forEach(r => {
      const amt = Number(r.amount || 0);
      if (r.type === 'income') totalIncome += amt;
      else if (r.type === 'expense') totalExpense += amt;
    });
    const balance = totalIncome - totalExpense;

    const page = parseInt(req.query.page) || 1;
    const pageSize = Math.min(parseInt(req.query.pageSize) || 20, 100);
    const total = list.length;
    const pageRows = list.slice((page - 1) * pageSize, page * pageSize).map(r => ({
      ...r,
      creatorName: getUserDisplayName(r.createdBy)
    }));

    res.json({
      records: pageRows,
      total,
      totalIncome,
      totalExpense,
      balance,
      page,
      pageSize,
      totalPages: Math.ceil(total / pageSize)
    });
  } catch (err) {
    console.error('ledger records error:', err);
    res.status(500).json({ error: '获取账目失败: ' + err.message });
  }
});

// 新增账目
app.post('/api/ledger/records', authRequired, (req, res) => {
  try {
    const { type, amount, category, date, receiptUrl, remarks } = req.body;
    if (!type || !amount || Number(amount) <= 0) {
      return res.status(400).json({ error: '请填写正确的收支类型和金额' });
    }
    if (!db.financeLedger) db.financeLedger = [];
    if (!db.nextFinanceLedgerId) db.nextFinanceLedgerId = 1;

    const row = {
      id: db.nextFinanceLedgerId++,
      type: type === 'income' ? 'income' : 'expense',
      amount: Math.round(Number(amount) * 100) / 100,
      category: String(category || '其他').trim(),
      date: date || customerNowStr(),
      receiptUrl: String(receiptUrl || '').trim(),
      remarks: String(remarks || '').trim(),
      createdBy: req.user.username || '',
      createdAt: customerNowStr()
    };

    db.financeLedger.push(row);
    addAuditLog(req.user.id, req.user.username, 'ledger', `记账: ${row.type === 'income' ? '收入' : '支出'} ￥${row.amount} (${row.category})`, req);
    saveData();

    res.json({ success: true, record: row });
  } catch (err) {
    console.error('add ledger error:', err);
    res.status(500).json({ error: '新增记账失败: ' + err.message });
  }
});

// 修改账目
app.put('/api/ledger/records/:id', authRequired, (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const row = (db.financeLedger || []).find(r => r.id === id);
    if (!row) return res.status(404).json({ error: '账目记录不存在' });

    // 非管理员只能改自己的
    if (!req.user.isAdmin && row.createdBy !== req.user.username) {
      return res.status(403).json({ error: '无权修改他人的账目' });
    }

    const { type, amount, category, date, receiptUrl, remarks } = req.body;
    if (type) row.type = type;
    if (amount) row.amount = Math.round(Number(amount) * 100) / 100;
    if (category) row.category = String(category).trim();
    if (date) row.date = date;
    if (receiptUrl !== undefined) row.receiptUrl = String(receiptUrl).trim();
    if (remarks !== undefined) row.remarks = String(remarks).trim();

    addAuditLog(req.user.id, req.user.username, 'ledger', `修改账目 ID:${id}`, req);
    saveData();
    res.json({ success: true, record: row });
  } catch (err) {
    res.status(500).json({ error: '修改账目失败: ' + err.message });
  }
});

// 删除账目
app.delete('/api/ledger/records/:id', authRequired, (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const idx = (db.financeLedger || []).findIndex(r => r.id === id);
    if (idx === -1) return res.status(404).json({ error: '账目记录不存在' });

    const row = db.financeLedger[idx];
    if (!req.user.isAdmin && row.createdBy !== req.user.username) {
      return res.status(403).json({ error: '无权删除他人的账目' });
    }

    db.financeLedger.splice(idx, 1);
    addAuditLog(req.user.id, req.user.username, 'ledger', `删除账目 ID:${id} ￥${row.amount}`, req);
    saveData();
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: '删除账目失败: ' + err.message });
  }
});

// 导出个人记账对账单
app.get('/api/ledger/export', authRequired, (req, res) => {
  try {
    let list = Array.isArray(db.financeLedger) ? db.financeLedger : [];
    const isAdm = !!req.user.isAdmin;
    const currentUser = req.user.username;

    if (!isAdm) list = list.filter(r => r.createdBy === currentUser);
    else if (req.query.employee) list = list.filter(r => r.createdBy === req.query.employee);

    const startDate = String(req.query.startDate || '');
    const endDate = String(req.query.endDate || '');
    if (startDate && endDate) {
      list = list.filter(r => {
        const d = String(r.date || '').slice(0, 10);
        return d >= startDate && d <= endDate;
      });
    }

    const HEADERS = ['序号', '发生时间', '收支类型', '金额(元)', '分类', '备注用途', '有无凭证', '记账员工'];
    const lines = [HEADERS.join(',')];

    list.sort((a, b) => new Date(b.date || 0) - new Date(a.date || 0)).forEach((r, i) => {
      const row = [
        i + 1,
        csvCell(r.date),
        csvCell(r.type === 'income' ? '收入(公司打款)' : '支出(业务花费)'),
        r.type === 'income' ? `+${r.amount}` : `-${r.amount}`,
        csvCell(r.category),
        csvCell(r.remarks),
        r.receiptUrl ? '有凭证截图' : '无凭证',
        csvCell(getUserDisplayName(r.createdBy))
      ];
      lines.push(row.join(','));
    });

    const stamp = startDate && endDate ? `${startDate}_${endDate}` : localDateStr(new Date()).replace(/-/g, '');
    res.setHeader('Content-Type', 'text/csv; charset=utf-8');
    res.setHeader('Content-Disposition', `attachment; filename=ledger_${stamp}.csv`);
    res.send('\uFEFF' + lines.join('\r\n') + '\r\n');
  } catch (err) {
    res.status(500).json({ error: '导出账单失败: ' + err.message });
  }
});

// ==================== 统一辅助函数：username -> 真实姓名 Name ====================
function getUserDisplayName(uname) {
  if (!uname) return '(未分配)';
  const u = (db.users || []).find(user => user.username === uname);
  return (u && u.name) ? u.name : uname;
}

// 客户列表筛选（GET /api/customers 与 /api/customers/export 共用，保证导出结果与页面筛选口径一致）
function filterCustomers(query, user) {
  let customers = Array.isArray(db.customers) ? db.customers : [];
  if (!user.isAdmin) {
    const withOwner = customers.filter(c => c.createdBy);
    if (withOwner.length > 0) {
      customers = customers.filter(c => !c.createdBy || c.createdBy === user.username);
    }
  }

  const keyword = String(query.keyword || '').trim().toLowerCase();
  const dateFilter = String(query.dateFilter || 'all');
  const employee = String(query.employee || '').trim();
  const store = String(query.store || '').trim();
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
  const startDate = query.startDate;
  const endDate = query.endDate;
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

  return customers;
}

// ==================== 全局秒级查重防撞单 API ====================
app.get('/api/customers/check-duplicate', authRequired, (req, res) => {
  const phone = String(req.query.phone || '').trim();
  const wechat = String(req.query.wechat || '').trim();
  const teacherWechat = String(req.query.teacherWechat || '').trim();
  const orderNo = String(req.query.orderNo || '').trim();
  const scope = String(req.query.scope || 'all'); // 'all', 'customer', 'finance'

  if (!phone && !wechat && !teacherWechat && !orderNo) {
    return res.json({ duplicate: false });
  }

  function formatTime(t) {
    return String(t || '').slice(0, 16);
  }

  // 1. 查职称库
  if (scope === 'all' || scope === 'customer') {
    const list = db.customers || [];
    for (const c of list) {
      if (c.invalid) continue;
      if (phone && c.phone && String(c.phone).trim() === phone) {
        return res.json({
          duplicate: true,
          type: '职称客户',
          matchedBy: '手机号: ' + phone,
          record: {
            name: c.name || '未填姓名',
            createdBy: getUserDisplayName(c.createdBy),
            store: c.assignedTo || '未分配',
            date: formatTime(c.date)
          }
        });
      }
      if (wechat && c.wechat && String(c.wechat).trim().toLowerCase() === wechat.toLowerCase()) {
        return res.json({
          duplicate: true,
          type: '职称客户',
          matchedBy: '微信号: ' + wechat,
          record: {
            name: c.name || '未填姓名',
            createdBy: getUserDisplayName(c.createdBy),
            store: c.assignedTo || '未分配',
            date: formatTime(c.date)
          }
        });
      }
    }
  }

  // 2. 查财税库
  if (scope === 'all' || scope === 'finance') {
    const flist = db.financeCustomers || [];
    for (const c of flist) {
      if (c.invalid) continue;
      if (orderNo && c.orderNo && String(c.orderNo).trim() === orderNo) {
        return res.json({
          duplicate: true,
          type: '财税客户',
          matchedBy: '订单号: ' + orderNo,
          record: {
            name: c.companyName || c.name || '未填名称',
            createdBy: getUserDisplayName(c.createdBy),
            store: c.assignedTo || '未分配',
            date: formatTime(c.date)
          }
        });
      }
      if (phone && c.phone && String(c.phone).trim() === phone) {
        return res.json({
          duplicate: true,
          type: '财税客户',
          matchedBy: '手机号: ' + phone,
          record: {
            name: c.companyName || c.name || '未填名称',
            createdBy: getUserDisplayName(c.createdBy),
            store: c.assignedTo || '未分配',
            date: formatTime(c.date)
          }
        });
      }
      if (wechat && c.wechat && String(c.wechat).trim().toLowerCase() === wechat.toLowerCase()) {
        return res.json({
          duplicate: true,
          type: '财税客户',
          matchedBy: '微信号: ' + wechat,
          record: {
            name: c.companyName || c.name || '未填名称',
            createdBy: getUserDisplayName(c.createdBy),
            store: c.assignedTo || '未分配',
            date: formatTime(c.date)
          }
        });
      }
    }
  }

  res.json({ duplicate: false });
});

// ==================== 工作台数据汇总 Dashboard API ====================
app.get('/api/dashboard/stats', authRequired, (req, res) => {
  try {
    const today = localDateStr(new Date());
    const yesterdayDate = new Date();
    yesterdayDate.setDate(yesterdayDate.getDate() - 1);
    const yesterday = localDateStr(yesterdayDate);

    const isAdm = !!req.user.isAdmin;
    const currentUser = req.user.username;

    let customers = db.customers || [];
    let financeCustomers = db.financeCustomers || [];
    let consultStats = db.consultStats || [];
    let financeConsultStats = db.financeConsultStats || [];

    if (!isAdm) {
      customers = customers.filter(c => c.createdBy === currentUser);
      financeCustomers = financeCustomers.filter(c => c.createdBy === currentUser);
      consultStats = consultStats.filter(c => c.username === currentUser);
      financeConsultStats = financeConsultStats.filter(c => c.username === currentUser);
    }

    // 统计今日与昨日留资
    const todayCustomers = customers.filter(c => !c.invalid && String(c.date || '').slice(0, 10) === today);
    const yesterdayCustomers = customers.filter(c => !c.invalid && String(c.date || '').slice(0, 10) === yesterday);

    const todayFinance = financeCustomers.filter(c => !c.invalid && String(c.date || '').slice(0, 10) === today);
    const yesterdayFinance = financeCustomers.filter(c => !c.invalid && String(c.date || '').slice(0, 10) === yesterday);

    const todayLeads = todayCustomers.length + todayFinance.length;
    const yesterdayLeads = yesterdayCustomers.length + yesterdayFinance.length;

    // 统计今日财税提成（5元/2元）
    let todayFinance5 = 0;
    let todayFinance2 = 0;
    todayFinance.forEach(f => {
      if (f.orderNo && String(f.orderNo).trim()) todayFinance5++;
      else todayFinance2++;
    });
    const todayFinanceCommission = (todayFinance5 * 5) + (todayFinance2 * 2);

    // 职称今日提成 (从consultStats计算)
    let todayZcCommission = 0;
    let todayConsultCount = 0;
    let todayInvalidConsult = 0;

    consultStats.filter(s => s.date === today).forEach(s => {
      todayConsultCount += Number(s.consultCount || 0);
      todayInvalidConsult += Number(s.invalidConsultCount || 0);
    });
    financeConsultStats.filter(s => s.date === today).forEach(s => {
      todayConsultCount += Number(s.consultCount || 0);
      todayInvalidConsult += Number(s.invalidConsultCount || 0);
    });

    const intendedConsult = Math.max(0, todayConsultCount - todayInvalidConsult);
    const overallRate = intendedConsult > 0 ? Math.round(todayLeads / intendedConsult * 1000) / 10 : 0;

    // 职称提成计算逻辑
    const zcLeadCount = todayCustomers.length;
    if (intendedConsult > 0) {
      const zcRate = Math.round(zcLeadCount / intendedConsult * 1000) / 10;
      todayZcCommission = calcCommission(zcRate, zcLeadCount);
    }

    const todayTotalCommission = todayFinanceCommission + todayZcCommission;

    // 活跃客服数
    const activeStaffSet = new Set();
    todayCustomers.forEach(c => c.createdBy && activeStaffSet.add(c.createdBy));
    todayFinance.forEach(c => c.createdBy && activeStaffSet.add(c.createdBy));

    // 各店铺留资分布
    const storeMap = {};
    (db.stores || []).forEach(s => { storeMap[s] = 0; });
    (db.financeStores || []).forEach(s => { storeMap[s] = 0; });

    todayCustomers.forEach(c => {
      const st = c.assignedTo || '未分配';
      storeMap[st] = (storeMap[st] || 0) + 1;
    });
    todayFinance.forEach(c => {
      const st = c.assignedTo || '未分配';
      storeMap[st] = (storeMap[st] || 0) + 1;
    });

    const storeDistribution = Object.keys(storeMap).map(name => ({
      name,
      count: storeMap[name]
    })).filter(s => s.count > 0 || isAdm).sort((a, b) => b.count - a.count);

    // 今日客服龙虎榜 (按提成+条数)
    function getDisplayName(uname) {
      if (!uname) return '(未分配)';
      const u = (db.users || []).find(u => u.username === uname);
      return (u && u.name) ? u.name : uname;
    }

    const staffRankMap = {};
    const allUsers = (db.users || []).filter(u => !u.isAdmin);

    allUsers.forEach(u => {
      staffRankMap[u.username] = {
        username: u.username,
        name: u.name || u.username,
        zcLeads: 0,
        fnLeads: 0,
        fnOrder5: 0,
        fnOrder2: 0,
        totalLeads: 0,
        commission: 0
      };
    });

    todayCustomers.forEach(c => {
      const u = c.createdBy;
      if (u && staffRankMap[u]) {
        staffRankMap[u].zcLeads++;
        staffRankMap[u].totalLeads++;
      }
    });

    todayFinance.forEach(f => {
      const u = f.createdBy;
      if (u && staffRankMap[u]) {
        staffRankMap[u].fnLeads++;
        staffRankMap[u].totalLeads++;
        if (f.orderNo && String(f.orderNo).trim()) {
          staffRankMap[u].fnOrder5++;
          staffRankMap[u].commission += 5;
        } else {
          staffRankMap[u].fnOrder2++;
          staffRankMap[u].commission += 2;
        }
      }
    });

    const leaderboard = Object.values(staffRankMap).sort((a, b) => (b.commission - a.commission) || (b.totalLeads - a.totalLeads));

    // 近15天留资趋势数据
    const trendDays = [];
    for (let i = 14; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const ds = localDateStr(d);
      const zcCount = (db.customers || []).filter(c => !c.invalid && String(c.date || '').slice(0, 10) === ds && (isAdm || c.createdBy === currentUser)).length;
      const fnCount = (db.financeCustomers || []).filter(c => !c.invalid && String(c.date || '').slice(0, 10) === ds && (isAdm || c.createdBy === currentUser)).length;
      trendDays.push({
        date: ds.slice(5),
        fullDate: ds,
        zcCount,
        fnCount,
        total: zcCount + fnCount
      });
    }

    res.json({
      today,
      overview: {
        todayLeads,
        yesterdayLeads,
        leadGrowth: yesterdayLeads ? Math.round((todayLeads - yesterdayLeads) / yesterdayLeads * 100) : 0,
        todayTotalCommission,
        todayFinance5,
        todayFinance2,
        todayConsultCount,
        intendedConsult,
        overallRate,
        activeStaffCount: activeStaffSet.size
      },
      storeDistribution,
      leaderboard,
      trendDays
    });
  } catch (err) {
    console.error('dashboard stats error:', err);
    res.status(500).json({ error: '获取工作台数据失败: ' + err.message });
  }
});

// ==================== 财务月度结算对账单导出 API ====================
app.get('/api/finance/salary-reconcile-export', authRequired, (req, res, next) => {
  if (req.user.isAdmin || (req.user.permissions && (req.user.permissions.leadStats || req.user.permissions.financeStats))) return next();
  res.status(403).json({ error: '无导出财务对账单权限' });
}, (req, res) => {
  try {
    const month = String(req.query.month || localDateStr(new Date()).slice(0, 7)); // YYYY-MM
    const users = (db.users || []).filter(u => !u.isAdmin);
    const customers = (db.customers || []).filter(c => !c.invalid && String(c.date || '').startsWith(month));
    const financeCustomers = (db.financeCustomers || []).filter(c => !c.invalid && String(c.date || '').startsWith(month));
    const consultStats = (db.consultStats || []).filter(s => String(s.date || '').startsWith(month));
    const financeConsultStats = (db.financeConsultStats || []).filter(s => String(s.date || '').startsWith(month));

    const HEADERS = [
      '员工姓名', '员工账号', '结算月份',
      '职称留资(条)', '财税5元单(条)', '财税2元单(条)', '财税留资(条)', '总留资量(条)',
      '总咨询量', '有效咨询', '留资转化率(%)',
      '财税提成(元)', '职称提成(元)', '合计应发提成(元)'
    ];

    const lines = [HEADERS.join(',')];

    users.forEach(u => {
      const uZc = customers.filter(c => c.createdBy === u.username);
      const uFn = financeCustomers.filter(c => c.createdBy === u.username);

      let fn5 = 0;
      let fn2 = 0;
      uFn.forEach(f => {
        if (f.orderNo && String(f.orderNo).trim()) fn5++;
        else fn2++;
      });
      const fnComm = (fn5 * 5) + (fn2 * 2);

      // 咨询量与职称提成
      let totalConsult = 0;
      let invalidConsult = 0;
      consultStats.filter(s => s.username === u.username).forEach(s => {
        totalConsult += Number(s.consultCount || 0);
        invalidConsult += Number(s.invalidConsultCount || 0);
      });
      financeConsultStats.filter(s => s.username === u.username).forEach(s => {
        totalConsult += Number(s.consultCount || 0);
        invalidConsult += Number(s.invalidConsultCount || 0);
      });

      const effective = Math.max(0, totalConsult - invalidConsult);
      const totalLeads = uZc.length + uFn.length;
      const rate = effective > 0 ? Math.round(totalLeads / effective * 1000) / 10 : 0;
      const zcComm = effective > 0 ? calcCommission(rate, uZc.length) : 0;
      const totalComm = fnComm + zcComm;

      const row = [
        csvCell(u.name || u.username),
        csvCell(u.username),
        csvCell(month),
        uZc.length,
        fn5,
        fn2,
        uFn.length,
        totalLeads,
        totalConsult,
        effective,
        rate + '%',
        '￥' + fnComm.toFixed(2),
        '￥' + zcComm.toFixed(2),
        '￥' + totalComm.toFixed(2)
      ];
      lines.push(row.join(','));
    });

    res.setHeader('Content-Type', 'text/csv; charset=utf-8');
    res.setHeader('Content-Disposition', `attachment; filename=salary_reconcile_${month}.csv`);
    res.send('\uFEFF' + lines.join('\r\n') + '\r\n');
  } catch (err) {
    console.error('salary reconcile export error:', err);
    res.status(500).json({ error: '导出对账单失败: ' + err.message });
  }
});

// ==================== 财税客户登记与提成计算 ====================
// 规则：有订单号提成5元/条，无订单号提成2元/条
function calcFinanceCommission(hasOrderNo) {
  return hasOrderNo ? 5 : 2;
}

function filterFinanceCustomers(query, user) {
  let customers = db.financeCustomers || [];
  if (!user.isAdmin) {
    customers = customers.filter(c => !c.createdBy || c.createdBy === user.username);
  }
  const keyword = String(query.keyword || '').trim().toLowerCase();
  const dateFilter = String(query.dateFilter || 'all');
  const employee = String(query.employee || '').trim();
  const store = String(query.store || '').trim();
  const serviceType = String(query.serviceType || '').trim();
  const hasOrder = String(query.hasOrder || '').trim(); // 'yes', 'no'

  const searchableFields = ['name', 'phone', 'wechat', 'orderNo', 'companyName', 'serviceType', 'taxpayerType', 'city', 'assignedTo', 'createdBy', 'remarks'];
  if (keyword) {
    customers = customers.filter(row => searchableFields.some(field => String(row[field] || '').toLowerCase().includes(keyword)));
  }
  if (employee) {
    customers = customers.filter(row => String(row.createdBy || '') === employee);
  }
  if (store) {
    customers = customers.filter(row => String(row.assignedTo || '') === store);
  }
  if (serviceType) {
    customers = customers.filter(row => String(row.serviceType || '') === serviceType);
  }
  if (hasOrder === 'yes') {
    customers = customers.filter(row => !!String(row.orderNo || '').trim());
  } else if (hasOrder === 'no') {
    customers = customers.filter(row => !String(row.orderNo || '').trim());
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

  const startDate = query.startDate;
  const endDate = query.endDate;
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

  return customers;
}

// 财税登记表 导出 / 导入
const FINANCE_CSV_HEADERS = ['序号', '登记时间', '订单编号', '提成', '公司名称', '业务类型', '客户姓名', '电话', '微信', '所在城市', '分配店铺', '成交状态', '备注', '录入人'];
const FINANCE_CSV_KEYS = ['seq', 'date', 'orderNo', 'commission', 'companyName', 'serviceType', 'name', 'phone', 'wechat', 'city', 'assignedTo', 'dealStatus', 'remarks', 'createdBy'];

app.get('/api/finance-customers/export', authRequired, (req, res, next) => {
  if (req.user.isAdmin || (req.user.permissions && (req.user.permissions.financeExportExcel || req.user.permissions.exportExcel || req.user.permissions.financeView))) return next();
  res.status(403).json({ error: '无导出权限' });
}, (req, res) => {
  try {
    const customers = filterFinanceCustomers(req.query, req.user)
      .slice()
      .sort((a, b) => (parseInt(b.id) || 0) - (parseInt(a.id) || 0));

    const lines = [FINANCE_CSV_HEADERS.join(',')];
    customers.forEach(row => {
      const copyRow = { ...row, createdBy: getUserDisplayName(row.createdBy) };
      lines.push(FINANCE_CSV_KEYS.map(k => csvCell(copyRow[k])).join(','));
    });

    const qStart = String(req.query.startDate || '').trim();
    const qEnd = String(req.query.endDate || '').trim();
    const stamp = qStart && qEnd ? (qStart + '_' + qEnd) : localDateStr(new Date()).replace(/-/g, '');
    res.setHeader('Content-Type', 'text/csv; charset=utf-8');
    res.setHeader('Content-Disposition', 'attachment; filename=finance_customers_' + stamp + '.csv');
    res.send('\uFEFF' + lines.join('\r\n') + '\r\n');
  } catch (err) {
    console.error('finance export error:', err);
    res.status(500).json({ error: '导出失败: ' + err.message });
  }
});

app.post('/api/finance-customers/import', authRequired, (req, res, next) => {
  if (req.user.isAdmin || (req.user.permissions && (req.user.permissions.financeRegister || req.user.permissions.register))) return next();
  res.status(403).json({ error: '无导入权限' });
}, (req, res) => {
  try {
    const body = req.body || {};
    const rawRows = Array.isArray(body.rows) ? body.rows : [];
    const preview = body.preview === true;
    const onDuplicate = body.onDuplicate === 'skip' ? 'skip' : 'overwrite';
    if (!rawRows.length) return res.status(400).json({ error: '没有可导入的数据行' });

    if (!Array.isArray(db.financeCustomers)) db.financeCustomers = [];
    if (!db.nextFinanceCustomerId) db.nextFinanceCustomerId = 1;

    const failed = [];
    const valid = [];

    rawRows.forEach((r, i) => {
      const line = Number(r._line) || (i + 2);
      const phone = String(r['电话'] || r['联系电话'] || r['手机'] || r['phone'] || '').trim();
      const wechat = String(r['微信'] || r['wechat'] || '').trim();
      const orderNo = String(r['订单编号'] || r['订单号'] || r['单号'] || r['orderNo'] || '').trim();
      const companyName = String(r['公司名称'] || r['公司'] || r['企业名称'] || r['companyName'] || '').trim();
      const name = String(r['客户姓名'] || r['姓名'] || r['name'] || '').trim();
      const serviceType = String(r['业务类型'] || r['类型'] || r['serviceType'] || '').trim();
      const city = String(r['所在城市'] || r['城市'] || r['city'] || '').trim();
      const assignedTo = String(r['分配店铺'] || r['店铺'] || r['assignedTo'] || '').trim();
      const dealStatus = String(r['成交状态'] || r['状态'] || r['dealStatus'] || '').trim();
      const remarks = String(r['备注'] || r['remarks'] || '').trim();
      const date = String(r['登记时间'] || r['日期'] || r['date'] || '').trim() || customerNowStr();

      if (!phone && !wechat && !companyName && !orderNo) {
        failed.push({ line, reason: '必须包含电话、微信、公司名或订单号之一' });
        return;
      }

      valid.push({
        line,
        values: {
          phone, wechat, orderNo, companyName, name, serviceType, city, assignedTo, dealStatus, remarks, date,
          commission: calcFinanceCommission(!!orderNo)
        }
      });
    });

    let created = 0;
    let updated = 0;
    let skipped = 0;

    valid.forEach(item => {
      const v = item.values;
      const existing = (v.orderNo || v.phone) ? db.financeCustomers.find(c => (v.orderNo && c.orderNo === v.orderNo) || (v.phone && c.phone === v.phone)) : null;

      if (existing) {
        if (onDuplicate === 'overwrite') updated++;
        else skipped++;
      } else {
        created++;
      }
    });

    if (preview) {
      return res.json({
        total: rawRows.length,
        valid: valid.length,
        failed: failed.length,
        created,
        updated,
        skipped,
        errors: failed.slice(0, 50),
        errorTruncated: failed.length > 50
      });
    }

    let added = 0;
    let changed = 0;
    const importedIds = [];

    valid.forEach(item => {
      const v = item.values;
      const existing = (v.orderNo || v.phone) ? db.financeCustomers.find(c => (v.orderNo && c.orderNo === v.orderNo) || (v.phone && c.phone === v.phone)) : null;

      if (existing) {
        if (onDuplicate === 'overwrite') {
          Object.assign(existing, v);
          importedIds.push(existing.id);
          changed++;
        }
      } else {
        const row = {
          id: db.nextFinanceCustomerId++,
          seq: String(db.financeCustomers.length + 1),
          date: v.date,
          name: v.name,
          createdBy: req.user.username || '',
          phone: v.phone,
          wechat: v.wechat,
          orderNo: v.orderNo,
          companyName: v.companyName,
          serviceType: v.serviceType,
          taxpayerType: '',
          city: v.city,
          assignedTo: v.assignedTo,
          dealStatus: v.dealStatus,
          remarks: v.remarks,
          commission: v.commission
        };
        db.financeCustomers.push(row);
        importedIds.push(row.id);
        added++;
      }
    });

    addAuditLog(req.user.id, req.user.username, 'register', '导入财税客户登记表：新增' + added + '条，更新' + changed + '条', req, { recordType: 'finance', recordIds: importedIds });
    saveData();

    res.json({
      success: true,
      created: added,
      updated: changed,
      skipped,
      failed: failed.length,
      errors: failed.slice(0, 50)
    });
  } catch (err) {
    console.error('finance import error:', err);
    res.status(500).json({ error: '导入失败: ' + err.message });
  }
});

// 财税客户列表
app.get('/api/finance-customers', authRequired, (req, res, next) => {
  if (req.user.isAdmin || (req.user.permissions && (req.user.permissions.financeView || req.user.permissions.viewData))) return next();
  res.status(403).json({ error: '无查看财税登记表权限' });
}, (req, res) => {
  let customers = filterFinanceCustomers(req.query, req.user);
  customers = customers.slice().sort((a, b) => (parseInt(b.id) || 0) - (parseInt(a.id) || 0));
  const total = customers.length;
  const dealtCount = customers.filter(row => row.dealStatus === '已成交').length;
  const withOrderCount = customers.filter(row => !!String(row.orderNo || '').trim()).length;
  const withoutOrderCount = total - withOrderCount;
  const totalCommission = (withOrderCount * 5) + (withoutOrderCount * 2);

  const all = String(req.query.all || '') === '1';
  const pageSize = Math.min(Math.max(parseInt(req.query.pageSize) || 20, 1), 100);
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const page = Math.min(Math.max(parseInt(req.query.page) || 1, 1), totalPages);
  const rawPageCustomers = all ? customers : customers.slice((page - 1) * pageSize, page * pageSize);

  // 统一将 createdBy 转换为员工真实姓名
  const pageCustomers = rawPageCustomers.map(r => ({
    ...r,
    createdBy: getUserDisplayName(r.createdBy)
  }));

  res.json({
    customers: pageCustomers,
    nextId: db.nextFinanceCustomerId || 1,
    total,
    dealtCount,
    withOrderCount,
    withoutOrderCount,
    totalCommission,
    page,
    pageSize,
    totalPages
  });
});

// 新增财税客户
app.post('/api/finance-customers', authRequired, customerCreateRequired, async (req, res) => {
  const data = req.body;
  if (!db.financeCustomers) db.financeCustomers = [];
  if (!db.nextFinanceCustomerId) db.nextFinanceCustomerId = 1;

  const orderNo = String(data.orderNo || '').trim();
  const row = {
    id: db.nextFinanceCustomerId++,
    seq: String(db.financeCustomers.length + 1),
    date: data.date || customerNowStr(),
    name: '', // 彻底去姓名化
    createdBy: req.user.username || '',
    phone: data.phone || '',
    wechat: data.wechat || '',
    teacherWechat: data.teacherWechat || '', // 被加老师微信
    orderNo: orderNo,
    companyName: data.companyName || '',
    serviceType: data.serviceType || '',
    taxpayerType: data.taxpayerType || '',
    city: data.city || '',
    assignedTo: data.assignedTo || '',
    dealStatus: data.dealStatus || '',
    remarks: data.remarks || '',
    qrCodeUrl: data.qrCodeUrl || '',
    hasFeedback: false,
    feedbackStatus: 'normal',
    commission: calcFinanceCommission(!!orderNo)
  };
  db.financeCustomers.push(row);
  addAuditLog(req.user.id, req.user.username, 'register', '登记财税客户: ' + (row.name || row.companyName || '未知') + ' (单号:' + (orderNo || '无') + ')', req, { recordType: 'finance', recordId: row.id });
  saveData();

  // 异步触发企微多分组/配额轮询分发推送
  const creatorDisp = getUserDisplayName(req.user.username);
  routeAndDispatchGroupMessage({
    type: 'finance',
    customer: row,
    creatorName: creatorDisp,
    globalEnabled: db.wecomBotConfig?.globalEnabled !== false,
    groups: db.wecomBotConfig?.groups || [],
    rootDir: ROOT_DIR,
    baseUrl: `${req.protocol}://${req.get('host')}`,
    onLog: (msg) => console.log(msg),
    onSave: () => saveData()
  }).catch(err => console.error('[企微推送异常]', err.message));

  res.json({ success: true, customer: row });
});

// 修改财税客户
app.put('/api/finance-customers/:id', authRequired, permRequired('edit'), (req, res) => {
  const id = parseInt(req.params.id);
  const row = (db.financeCustomers || []).find(c => c.id === id);
  if (!row) {
    return res.status(404).json({ error: '记录不存在' });
  }
  const allowed = ['seq', 'date', 'name', 'phone', 'wechat', 'orderNo', 'companyName', 'serviceType', 'taxpayerType', 'city', 'assignedTo', 'dealStatus', 'remarks', 'createdBy', 'invalid'];
  const updates = req.body;
  allowed.forEach(f => {
    if (updates[f] !== undefined) {
      if (f === 'invalid') { row[f] = parseInt(updates[f]) || 0; } else { row[f] = String(updates[f] || '').trim(); }
    }
  });
  // 重新计算提成
  row.commission = calcFinanceCommission(!!String(row.orderNo || '').trim());

  addAuditLog(req.user.id, req.user.username, 'edit', '修改财税客户: ' + (row.name || row.companyName || 'ID:' + id), req, { recordType: 'finance', recordId: id });
  saveData();
  res.json({ success: true, customer: row });
});

// 删除财税客户
app.delete('/api/finance-customers/:id', authRequired, permRequired('delete'), (req, res) => {
  const id = parseInt(req.params.id);
  const idx = (db.financeCustomers || []).findIndex(c => c.id === id);
  if (idx === -1) {
    return res.status(404).json({ error: '记录不存在' });
  }
  const delName = db.financeCustomers[idx].name || db.financeCustomers[idx].companyName || 'ID:' + id;
  db.financeCustomers.splice(idx, 1);
  db.financeCustomers.forEach((c, i) => { c.seq = String(i + 1); });
  addAuditLog(req.user.id, req.user.username, 'delete', '删除财税客户: ' + delName, req, { recordType: 'finance', recordId: id });
  saveData();
  res.json({ success: true });
});

// 批量删除财税客户
app.post('/api/finance-customers/batch-delete', authRequired, permRequired('delete'), (req, res) => {
  const ids = req.body.ids || [];
  if (!Array.isArray(ids) || ids.length === 0) {
    return res.status(400).json({ error: '请选择要删除的记录' });
  }
  let deleted = 0;
  ids.forEach(function(id) {
    const idx = (db.financeCustomers || []).findIndex(function(c) { return c.id === parseInt(id); });
    if (idx !== -1) { db.financeCustomers.splice(idx, 1); deleted++; }
  });
  db.financeCustomers.forEach(function(c, i) { c.seq = String(i + 1); });
  addAuditLog(req.user.id, req.user.username, 'delete', '批量删除财税客户 ' + deleted + ' 条', req, { recordType: 'finance', recordIds: ids.map(Number) });
  saveData();
  res.json({ success: true, deleted });
});

// 清空财税客户登记表
app.delete('/api/finance-customers/clear', authRequired, permRequired('clearTable'), (req, res) => {
  const count = (db.financeCustomers || []).length;
  db.financeCustomers = [];
  db.nextFinanceCustomerId = 1;
  addAuditLog(req.user.id, req.user.username, 'clear_table', '清空财税客户登记表 ' + count + ' 条', req);
  saveData();
  res.json({ success: true, deleted: count });
});

// 财税留资统计（日统计 + 提成）
app.get('/api/finance-lead-stats', authRequired, (req, res) => {
  try {
    const date = req.query.date || localDateStr(new Date());
    if (!db.financeConsultStats) db.financeConsultStats = [];
    if (!Array.isArray(db.financeCustomers)) db.financeCustomers = [];

    function getDisplayName(uname) {
      if (!uname) return '(未分配)';
      const u = db.users.find(u => u.username === uname);
      return (u && u.name) ? u.name : uname;
    }

    let customers = db.financeCustomers || [];
    if (!req.user.isAdmin) {
      customers = customers.filter(c => !c.createdBy || c.createdBy === req.user.username);
    }

    const leadMap = {};
    customers.forEach(c => {
      if (c.invalid) return;
      if (!c.date || typeof c.date !== 'string') return;
      const cDate = c.date.slice(0, 10);
      if (cDate !== date) return;
      const user = c.createdBy || '(未分配)';
      if (!leadMap[user]) {
        leadMap[user] = { leadCount: 0, orderCount: 0, noOrderCount: 0, commission: 0 };
      }
      leadMap[user].leadCount++;
      const hasOrder = !!String(c.orderNo || '').trim();
      if (hasOrder) {
        leadMap[user].orderCount++;
        leadMap[user].commission += 5;
      } else {
        leadMap[user].noOrderCount++;
        leadMap[user].commission += 2;
      }
    });

    let stats = db.financeConsultStats.filter(s => s.date === date);
    if (!req.user.isAdmin) {
      stats = stats.filter(s => s.username === req.user.username);
    }

    const result = {};
    Object.keys(leadMap).forEach(user => {
      const data = leadMap[user];
      result[user] = {
        username: getDisplayName(user),
        rawUser: user,
        leadCount: data.leadCount,
        orderCount: data.orderCount,
        noOrderCount: data.noOrderCount,
        consultCount: 0,
        invalidConsultCount: 0,
        rate: 0,
        commission: data.commission
      };
    });

    stats.forEach(s => {
      if (!result[s.username]) {
        result[s.username] = {
          username: getDisplayName(s.username),
          rawUser: s.username,
          leadCount: 0,
          orderCount: 0,
          noOrderCount: 0,
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

    Object.values(result).forEach(r => {
      r.effectiveConsultCount = getEffectiveConsultCount(r.consultCount, r.invalidConsultCount);
      if (r.effectiveConsultCount > 0) {
        r.rate = Math.round(r.leadCount / r.effectiveConsultCount * 1000) / 10;
      }
    });

    res.json({
      date: date,
      stats: Object.values(result).sort((a, b) => b.leadCount - a.leadCount)
    });
  } catch (err) {
    console.error('finance-lead-stats error:', err);
    res.status(500).json({ error: '服务器内部错误: ' + err.message });
  }
});

// 财税留资统计汇总/排行榜
app.get('/api/finance-lead-stats/summary', authRequired, (req, res) => {
  try {
    const startDate = req.query.startDate;
    const endDate = req.query.endDate;
    if (!db.financeConsultStats) db.financeConsultStats = [];
    if (!Array.isArray(db.financeCustomers)) db.financeCustomers = [];

    function getDisplayName(uname) {
      if (!uname) return '(未分配)';
      const u = db.users.find(u => u.username === uname);
      return (u && u.name) ? u.name : uname;
    }

    let customers = db.financeCustomers || [];
    const summaryMap = {};
    customers.forEach(c => {
      if (c.invalid) return;
      if (!c.date || typeof c.date !== 'string') return;
      const cDate = c.date.slice(0, 10);
      if (startDate && cDate < startDate) return;
      if (endDate && cDate > endDate) return;
      const user = c.createdBy || '(未分配)';
      if (!summaryMap[user]) {
        summaryMap[user] = {
          username: getDisplayName(user),
          _rawUser: user,
          leadCount: 0,
          orderCount: 0,
          noOrderCount: 0,
          consultCount: 0,
          invalidConsultCount: 0,
          totalCommission: 0,
          days: 0
        };
      }
      summaryMap[user].leadCount++;
      const hasOrder = !!String(c.orderNo || '').trim();
      if (hasOrder) {
        summaryMap[user].orderCount++;
        summaryMap[user].totalCommission += 5;
      } else {
        summaryMap[user].noOrderCount++;
        summaryMap[user].totalCommission += 2;
      }
    });

    let stats = db.financeConsultStats;
    stats.forEach(s => {
      if (startDate && s.date < startDate) return;
      if (endDate && s.date > endDate) return;
      if (!summaryMap[s.username]) {
        summaryMap[s.username] = {
          username: getDisplayName(s.username),
          _rawUser: s.username,
          leadCount: 0,
          orderCount: 0,
          noOrderCount: 0,
          consultCount: 0,
          invalidConsultCount: 0,
          totalCommission: 0,
          days: 0
        };
      }
      summaryMap[s.username].consultCount += Number(s.consultCount || 0);
      summaryMap[s.username].invalidConsultCount += Number(s.invalidConsultCount || 0);
      summaryMap[s.username].days++;
    });

    const list = Object.values(summaryMap).map(row => {
      const effective = getEffectiveConsultCount(row.consultCount, row.invalidConsultCount);
      const rate = effective > 0 ? Math.round(row.leadCount / effective * 1000) / 10 : 0;
      return {
        username: row.username,
        _rawUser: row._rawUser,
        leadCount: row.leadCount,
        orderCount: row.orderCount,
        noOrderCount: row.noOrderCount,
        consultCount: row.consultCount,
        invalidConsultCount: row.invalidConsultCount,
        effectiveConsultCount: effective,
        rate: rate,
        totalCommission: row.totalCommission,
        days: row.days
      };
    });

    res.json({
      startDate: startDate,
      endDate: endDate,
      rankings: list.sort((a, b) => b.leadCount - a.leadCount)
    });
  } catch (err) {
    console.error('finance-lead-stats/summary error:', err);
    res.status(500).json({ error: '服务器内部错误: ' + err.message });
  }
});

// 保存财税咨询量
app.post('/api/finance-consult-stats', authRequired, permRequired('editConsult'), (req, res) => {
  const { date, username, consultCount, invalidConsultCount } = req.body;
  if (!date || !username) {
    return res.status(400).json({ error: '缺少参数' });
  }
  if (!db.financeConsultStats) db.financeConsultStats = [];
  if (!db.nextFinanceConsultStatId) db.nextFinanceConsultStatId = 1;

  const targetUser = req.user.isAdmin ? username : req.user.username;
  const todayStr = localDateStr(new Date());
  if (!req.user.isAdmin && date !== todayStr) {
    return res.status(403).json({ error: '只能修改当天的咨询数据' });
  }

  let stat = db.financeConsultStats.find(s => s.date === date && s.username === targetUser);
  if (stat) {
    if (consultCount !== undefined) stat.consultCount = parseInt(consultCount) || 0;
    if (invalidConsultCount !== undefined) stat.invalidConsultCount = parseInt(invalidConsultCount) || 0;
  } else {
    stat = {
      id: db.nextFinanceConsultStatId++,
      date: date,
      username: targetUser,
      consultCount: parseInt(consultCount) || 0,
      invalidConsultCount: parseInt(invalidConsultCount) || 0
    };
    db.financeConsultStats.push(stat);
  }
  addAuditLog(req.user.id, req.user.username, 'consult_edit', '录入财税咨询数据: ' + targetUser + ' ' + date + ' 咨询' + (stat.consultCount || 0) + '条', req);
  saveData();
  res.json({ success: true, stat });
});

// 财税配置（店铺与业务类型）
app.get('/api/finance-configs', authRequired, (req, res) => {
  res.json({
    stores: db.financeStores || ['财税1号店', '财税2号店', '财税旗舰店'],
    configs: db.financeConfigs || {
      serviceTypes: ['代理记账', '公司注册', '税务筹划', '商标注册', '资质代办', '审计验资', '变更注销', '其他'],
      taxpayerTypes: ['小规模纳税人', '一般纳税人', '个体工商户']
    }
  });
});

// 财税配置新增（店铺/业务类型/纳税性质）
app.post('/api/finance-configs/:type', authRequired, adminRequired, (req, res) => {
  const type = req.params.type;
  const value = String(req.body.value || '').trim();
  if (!value) return res.status(400).json({ error: '配置值不能为空' });

  if (type === 'stores' || type === 'store') {
    if (!Array.isArray(db.financeStores)) db.financeStores = [];
    if (!db.financeStores.includes(value)) {
      db.financeStores.push(value);
      addAuditLog(req.user.id, req.user.username, 'finance_config', '新增财税店铺: ' + value, req);
      saveData();
    }
    return res.json({ success: true, values: db.financeStores });
  }

  if (!db.financeConfigs) db.financeConfigs = {};
  if (!Array.isArray(db.financeConfigs[type])) db.financeConfigs[type] = [];
  if (!db.financeConfigs[type].includes(value)) {
    db.financeConfigs[type].push(value);
    addAuditLog(req.user.id, req.user.username, 'finance_config', '新增财税配置 ' + type + ': ' + value, req);
    saveData();
  }
  res.json({ success: true, values: db.financeConfigs[type] });
});

// 财税配置删除
app.delete('/api/finance-configs/:type', authRequired, adminRequired, (req, res) => {
  const type = req.params.type;
  const value = String(req.query.value || '').trim();
  if (!value) return res.status(400).json({ error: '配置值不能为空' });

  if (type === 'stores' || type === 'store') {
    if (!Array.isArray(db.financeStores)) db.financeStores = [];
    const idx = db.financeStores.indexOf(value);
    if (idx >= 0) {
      db.financeStores.splice(idx, 1);
      addAuditLog(req.user.id, req.user.username, 'finance_config', '删除财税店铺: ' + value, req);
      saveData();
    }
    return res.json({ success: true, values: db.financeStores });
  }

  if (!db.financeConfigs || !Array.isArray(db.financeConfigs[type])) {
    return res.status(400).json({ error: '未找到配置类型' });
  }
  const idx = db.financeConfigs[type].indexOf(value);
  if (idx >= 0) {
    db.financeConfigs[type].splice(idx, 1);
    addAuditLog(req.user.id, req.user.username, 'finance_config', '删除财税配置 ' + type + ': ' + value, req);
    saveData();
  }
  res.json({ success: true, values: db.financeConfigs[type] });
});

app.get('/api/customers', authRequired, permRequired('viewData'), (req, res) => {
  let customers = filterCustomers(req.query, req.user);

  customers = customers.slice().sort((a, b) => (parseInt(b.id) || 0) - (parseInt(a.id) || 0));
  const total = customers.length;
  const dealtCount = customers.filter(row => row.dealStatus === '已成交').length;
  const all = String(req.query.all || '') === '1';
  const pageSize = Math.min(Math.max(parseInt(req.query.pageSize) || 20, 1), 100);
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const page = Math.min(Math.max(parseInt(req.query.page) || 1, 1), totalPages);
  const rawPageCustomers = all ? customers : customers.slice((page - 1) * pageSize, page * pageSize);

  // 统一将 createdBy 转换为员工真实姓名
  const pageCustomers = rawPageCustomers.map(r => ({
    ...r,
    createdBy: getUserDisplayName(r.createdBy)
  }));

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
app.post('/api/customers', authRequired, customerCreateRequired, async (req, res) => {
  const data = req.body;
  const syncNow = data.syncNow === true;
  const row = {
    id: db.nextCustomerId++,
    seq: String(db.customers.length + 1),
    date: data.date || '',
    name: '', // 彻底去姓名化
    createdBy: req.user.username || '',
    phone: data.phone || '',
    wechat: data.wechat || '',
    teacherWechat: data.teacherWechat || '', // 被加老师微信
    degree: data.degree || '',
    major: data.major || '',
    titleLevel: data.titleLevel || '',
    ssCity: data.ssCity || '',
    reviewMajor: data.reviewMajor || '',
    applyLevel: data.applyLevel || '',
    conclusion: data.conclusion || '',
    remarks: data.remarks || '',
    assignedTo: data.assignedTo || '',
    qrCodeUrl: data.qrCodeUrl || '',
    dealStatus: data.dealStatus || '',
    hasFeedback: false,
    feedbackStatus: 'normal'
  };
  db.customers.push(row);
  const syncJob = {
    id: row.id,
    customerId: row.id,
    status: 'pending',
    attempts: 0,
    lastError: '',
    createdAt: new Date().toISOString(),
    syncedAt: ''
  };
  db.wukongSyncQueue.push(syncJob);
  let sync = { requested: syncNow, status: 'pending', reason: '' };
  if (syncNow) {
    syncJob.attempts = 1;
    try {
      const creator = db.users.find(user => user.username === row.createdBy) || req.user;
      const result = await syncCustomerToWukong(row, creator, db.wukongSync);
      if (result && result.skipped) {
        syncJob.lastError = result.reason || '当前客户不满足同步条件';
        sync.status = 'pending';
        sync.reason = syncJob.lastError;
      } else {
        syncJob.status = 'synced';
        syncJob.syncedAt = new Date().toISOString();
        row.wukongSyncStatus = 'success';
        row.wukongSyncedAt = syncJob.syncedAt;
        sync.status = 'synced';
      }
    } catch (err) {
      syncJob.status = 'failed';
      syncJob.lastError = err.message || '同步失败';
      row.wukongSyncStatus = 'failed';
      row.wukongSyncError = syncJob.lastError;
      row.wukongSyncedAt = new Date().toISOString();
      sync.status = 'failed';
      sync.reason = syncJob.lastError;
    }
  }
  addAuditLog(req.user.id, req.user.username, 'register', '登记客户: ' + (row.name || '未知'), req, { recordType: 'customer', recordId: row.id });
  saveData();

  // 异步触发企微多分组/配额轮询分发推送
  const creatorDisp = getUserDisplayName(req.user.username);
  routeAndDispatchGroupMessage({
    type: 'zc',
    customer: row,
    creatorName: creatorDisp,
    globalEnabled: db.wecomBotConfig?.globalEnabled !== false,
    groups: db.wecomBotConfig?.groups || [],
    rootDir: ROOT_DIR,
    baseUrl: `${req.protocol}://${req.get('host')}`,
    onLog: (msg) => console.log(msg),
    onSave: () => saveData()
  }).catch(err => console.error('[企微推送异常]', err.message));

  res.json({ success: true, customer: row, sync });
});

// ========== 客户登记表 批量导出 / 批量导入 ==========
// 列顺序与前端「复制表格 / 导出」保持一致，导出文件可原样再次导入
const CUSTOMER_CSV_HEADERS = ['序号', '日期', '联系电话', '微信', '学历', '专业', '现有职称', '社保城市', '申报专业', '申报级别', '分配店铺', '备注', '结论', '录入人'];
const CUSTOMER_CSV_KEYS = ['seq', 'date', 'phone', 'wechat', 'degree', 'major', 'titleLevel', 'ssCity', 'reviewMajor', 'applyLevel', 'assignedTo', 'remarks', 'conclusion', 'createdBy'];
// 可写字段：导入时按中文列名（含别名）读取；序号/录入人 为只读列
const CUSTOMER_IMPORT_FIELDS = [
  { label: '日期', key: 'date', aliases: ['登记日期', '录入时间'] },
  { label: '联系电话', key: 'phone', aliases: ['电话', '手机号', '手机', '联系方式'] },
  { label: '微信', key: 'wechat', aliases: ['微信号', '微信号码'] },
  { label: '学历', key: 'degree' },
  { label: '专业', key: 'major' },
  { label: '现有职称', key: 'titleLevel', aliases: ['职称'] },
  { label: '社保城市', key: 'ssCity', aliases: ['社保'] },
  { label: '申报专业', key: 'reviewMajor' },
  { label: '申报级别', key: 'applyLevel', aliases: ['级别'] },
  { label: '分配店铺', key: 'assignedTo', aliases: ['店铺', '分配', '销售'] },
  { label: '备注', key: 'remarks' },
  { label: '结论', key: 'conclusion' }
];

function customerNowStr() {
  const d = new Date();
  return localDateStr(d) + ' ' +
    String(d.getHours()).padStart(2, '0') + ':' +
    String(d.getMinutes()).padStart(2, '0') + ':' +
    String(d.getSeconds()).padStart(2, '0');
}

// 导出客户登记表（跟随页面筛选条件，导出内容可直接再次导入）
app.get('/api/customers/export', authRequired, (req, res, next) => {
  if (req.user.isAdmin || (req.user.permissions && (req.user.permissions.exportExcel || req.user.permissions.viewData))) return next();
  res.status(403).json({ error: '无导出权限' });
}, (req, res) => {
  try {
    const customers = filterCustomers(req.query, req.user)
      .slice()
      .sort((a, b) => (parseInt(b.id) || 0) - (parseInt(a.id) || 0));

    const lines = [CUSTOMER_CSV_HEADERS.join(',')];
    customers.forEach(row => {
      const copyRow = { ...row, createdBy: getUserDisplayName(row.createdBy) };
      lines.push(CUSTOMER_CSV_KEYS.map(k => csvCell(copyRow[k])).join(','));
    });

    const qStart = String(req.query.startDate || '').trim();
    const qEnd = String(req.query.endDate || '').trim();
    const stamp = qStart && qEnd ? (qStart + '_' + qEnd) : localDateStr(new Date()).replace(/-/g, '');
    res.setHeader('Content-Type', 'text/csv; charset=utf-8');
    res.setHeader('Content-Disposition', 'attachment; filename=customers_' + stamp + '.csv');
    res.send('\uFEFF' + lines.join('\r\n') + '\r\n');
  } catch (err) {
    console.error('customers export error:', err);
    res.status(500).json({ error: '导出失败: ' + err.message });
  }
});

// 导入客户登记表（先预览后写入，带字段校验、重复处理、失败行提示）
app.post('/api/customers/import', authRequired, permRequired('register'), (req, res) => {
  try {
    const body = req.body || {};
    const rawRows = Array.isArray(body.rows) ? body.rows : [];
    const preview = body.preview === true;
    const onDuplicate = body.onDuplicate === 'skip' ? 'skip' : 'overwrite';
    const pushToSyncQueue = body.pushToSyncQueue === true;
    if (!rawRows.length) return res.status(400).json({ error: '没有可导入的数据行' });

    if (!Array.isArray(db.customers)) db.customers = [];
    if (!Array.isArray(db.wukongSyncQueue)) db.wukongSyncQueue = [];
    const MAX_ERRORS = 50;

    const failed = [];
    const valid = [];
    const seen = {};
    const pushError = (line, reason) => failed.push({ line: line, reason: reason });

    rawRows.forEach((r, i) => {
      const src = r || {};
      const line = Number(src._line) || (i + 2);
      const values = {};
      CUSTOMER_IMPORT_FIELDS.forEach(f => {
        const labels = [f.label].concat(f.aliases || []);
        let raw;
        for (let k = 0; k < labels.length; k++) {
          if (src[labels[k]] !== undefined && src[labels[k]] !== null) { raw = src[labels[k]]; break; }
        }
        if (raw === undefined && src[f.key] !== undefined) raw = src[f.key];
        values[f.key] = String(raw === undefined || raw === null ? '' : raw).trim();
      });

      if (!values.phone && !values.wechat) {
        pushError(line, '联系电话、微信至少要填一项');
        return;
      }
      if (values.date && !/^\d{4}-\d{2}-\d{2}/.test(values.date)) {
        pushError(line, '日期格式错误（应为 YYYY-MM-DD，可带时间）');
        return;
      }

      // 重复判定：联系电话优先，其次微信，都没有则不参与去重
      let exist = null;
      if (values.phone) {
        exist = db.customers.find(c => c.phone && c.phone === values.phone);
      }
      if (!exist && values.wechat) {
        exist = db.customers.find(c => !c.phone && c.wechat && c.wechat === values.wechat);
      }
      if (exist && !req.user.isAdmin && exist.createdBy && exist.createdBy !== req.user.username) {
        pushError(line, '无权覆盖其他员工登记的记录');
        return;
      }

      const dedupeKey = values.phone ? 'p:' + values.phone : (values.wechat ? 'w:' + values.wechat : '');
      if (dedupeKey) {
        if (seen[dedupeKey]) { pushError(line, '与文件内第 ' + seen[dedupeKey] + ' 行重复（联系电话/微信相同）'); return; }
        seen[dedupeKey] = line;
      }

      valid.push({ line: line, values: values, exist: exist });
    });

    const createdCount = valid.filter(v => !v.exist).length;
    const updatedCount = valid.filter(v => v.exist).length;
    const skipped = onDuplicate === 'skip' ? updatedCount : 0;

    const base = {
      total: rawRows.length,
      valid: valid.length,
      created: createdCount,
      updated: updatedCount,
      skipped: skipped,
      willWrite: onDuplicate === 'skip' ? createdCount : valid.length,
      failed: failed.length,
      errors: failed.slice(0, MAX_ERRORS),
      errorTruncated: failed.length > MAX_ERRORS
    };

    if (preview) return res.json(Object.assign({ preview: true }, base));

    let added = 0, changed = 0;
    const importedIds = [];
    valid.forEach(v => {
      if (v.exist) {
        if (onDuplicate === 'skip') return;
        Object.keys(v.values).forEach(k => {
          if (v.values[k] !== '') v.exist[k] = v.values[k]; // 空值不覆盖已有数据
        });
        importedIds.push(v.exist.id);
        changed++;
      } else {
        const row = {
          id: db.nextCustomerId++,
          seq: String(db.customers.length + 1),
          date: v.values.date || customerNowStr(),
          name: v.values.name || '',
          createdBy: req.user.username || '',
          phone: v.values.phone || '',
          wechat: v.values.wechat || '',
          degree: v.values.degree || '',
          major: v.values.major || '',
          titleLevel: v.values.titleLevel || '',
          ssCity: v.values.ssCity || '',
          reviewMajor: v.values.reviewMajor || '',
          applyLevel: v.values.applyLevel || '',
          conclusion: v.values.conclusion || '',
          remarks: v.values.remarks || '',
          assignedTo: v.values.assignedTo || '',
          dealStatus: v.values.dealStatus || ''
        };
        db.customers.push(row);
        importedIds.push(row.id);
        if (pushToSyncQueue) {
          db.wukongSyncQueue.push({
            id: row.id,
            customerId: row.id,
            status: 'pending',
            attempts: 0,
            lastError: '',
            createdAt: new Date().toISOString(),
            syncedAt: ''
          });
        }
        added++;
      }
    });

    if (added || changed) {
      addAuditLog(req.user.id, req.user.username, 'register',
        '导入客户登记表：新增' + added + '条，更新' + changed + '条，跳过' + skipped + '条，失败' + failed.length + '条', req,
        { recordType: 'customer', recordIds: importedIds });
      saveData();
    }

    res.json(Object.assign({ success: true, created: added, updated: changed, skipped: skipped }, {
      total: base.total, valid: base.valid, failed: base.failed,
      errors: base.errors, errorTruncated: base.errorTruncated
    }));
  } catch (err) {
    console.error('customers import error:', err);
    res.status(500).json({ error: '导入失败: ' + err.message });
  }
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

  addAuditLog(req.user.id, req.user.username, 'edit', '修改客户: ' + (row.name || 'ID:' + id), req, { recordType: 'customer', recordId: id });
  saveData();
  res.json({ success: true, customer: row });
});

// 标记/取消无效咨询（独立权限）
app.put('/api/customers/:id/invalid', authRequired, permRequired('markInvalid'), (req, res) => {
  const id = parseInt(req.params.id);
  const row = db.customers.find(c => c.id === id);
  if (!row) return res.status(404).json({ error: '记录不存在' });
  row.invalid = parseInt(req.body.invalid) || 0;
  addAuditLog(req.user.id, req.user.username, 'edit', (row.invalid ? '标记无效: ' : '取消无效: ') + (row.name || 'ID:' + id), req, { recordType: 'customer', recordId: id });
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
  addAuditLog(req.user.id, req.user.username, 'delete', '批量删除客户 ' + deleted + ' 条', req, { recordType: 'customer', recordIds: ids.map(Number) });
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
  addAuditLog(req.user.id, req.user.username, 'delete', '删除客户: ' + delName, req, { recordType: 'customer', recordId: id });
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
  addAuditLog(req.user.id, req.user.username, 'edit', '批量分配销售 ' + updated + ' 条给' + (assignedTo || '空'), req, { recordType: 'customer', recordIds: ids.map(Number) });
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

// ========== 企业微信群机器人分组与配额分流配置 API ==========
app.get('/api/wecom-bot-groups', adminRequired, (req, res) => {
  if (!db.wecomBotConfig || typeof db.wecomBotConfig !== 'object') {
    db.wecomBotConfig = { globalEnabled: true, groups: [], nextGroupId: 1, nextBotId: 1 };
  }
  res.json({
    config: db.wecomBotConfig,
    stores: db.stores || [],
    financeStores: db.financeStores || []
  });
});

// 全局推送总开关切换
app.post('/api/wecom-bot-groups/toggle-global', adminRequired, (req, res) => {
  if (!db.wecomBotConfig) db.wecomBotConfig = { globalEnabled: true, groups: [], nextGroupId: 1, nextBotId: 1 };
  const { enabled } = req.body;
  db.wecomBotConfig.globalEnabled = !!enabled;
  addAuditLog(req.user.id, req.user.username, 'wecom_bot', `${enabled ? '开启' : '关闭'}企微推送全局总开关`, req);
  saveData();
  res.json({ success: true, globalEnabled: db.wecomBotConfig.globalEnabled });
});

// 新建分组
app.post('/api/wecom-bot-groups', adminRequired, (req, res) => {
  if (!db.wecomBotConfig) db.wecomBotConfig = { globalEnabled: true, groups: [], nextGroupId: 1, nextBotId: 1 };
  const body = req.body || {};
  const name = String(body.name || '').trim();
  if (!name) return res.status(400).json({ error: '分组名称不能为空' });

  const newGroup = {
    id: db.wecomBotConfig.nextGroupId++,
    name,
    enabled: body.enabled !== false,
    businessType: ['zc', 'finance', 'all'].includes(body.businessType) ? body.businessType : 'all',
    stores: Array.isArray(body.stores) ? body.stores : [],
    timeRanges: Array.isArray(body.timeRanges) ? body.timeRanges : [],
    dispatchMode: ['quota', 'round_robin', 'broadcast'].includes(body.dispatchMode) ? body.dispatchMode : 'quota',
    lastSendIndex: -1,
    lastCountDate: localDateStr(new Date()),
    bots: [],
    createdAt: new Date().toISOString()
  };

  db.wecomBotConfig.groups.push(newGroup);
  addAuditLog(req.user.id, req.user.username, 'wecom_bot', '创建企微机器人分组: ' + newGroup.name, req);
  saveData();
  res.json({ success: true, group: newGroup });
});

// 更新分组基本设置与开关
app.put('/api/wecom-bot-groups/:id', adminRequired, (req, res) => {
  const id = parseInt(req.params.id);
  const group = (db.wecomBotConfig?.groups || []).find(g => g.id === id);
  if (!group) return res.status(404).json({ error: '分组不存在' });

  const body = req.body || {};
  if (body.name !== undefined) group.name = String(body.name).trim();
  if (body.enabled !== undefined) group.enabled = !!body.enabled;
  if (body.businessType !== undefined) group.businessType = body.businessType;
  if (body.stores !== undefined) group.stores = Array.isArray(body.stores) ? body.stores : [];
  if (body.timeRanges !== undefined) group.timeRanges = Array.isArray(body.timeRanges) ? body.timeRanges : [];
  if (body.dispatchMode !== undefined) group.dispatchMode = body.dispatchMode;

  addAuditLog(req.user.id, req.user.username, 'wecom_bot', '修改企微机器人分组: ' + group.name, req);
  saveData();
  res.json({ success: true, group });
});

// 删除分组
app.delete('/api/wecom-bot-groups/:id', adminRequired, (req, res) => {
  const id = parseInt(req.params.id);
  const idx = (db.wecomBotConfig?.groups || []).findIndex(g => g.id === id);
  if (idx === -1) return res.status(404).json({ error: '分组不存在' });

  const removed = db.wecomBotConfig.groups.splice(idx, 1)[0];
  addAuditLog(req.user.id, req.user.username, 'wecom_bot', '删除企微机器人分组: ' + removed.name, req);
  saveData();
  res.json({ success: true });
});

// 在分组中添加机器人
app.post('/api/wecom-bot-groups/:id/bots', adminRequired, (req, res) => {
  const groupId = parseInt(req.params.id);
  const group = (db.wecomBotConfig?.groups || []).find(g => g.id === groupId);
  if (!group) return res.status(404).json({ error: '分组不存在' });

  const body = req.body || {};
  const name = String(body.name || '').trim();
  const webhookUrl = String(body.webhookUrl || '').trim();
  if (!name) return res.status(400).json({ error: '机器人名称不能为空' });
  if (!webhookUrl || !webhookUrl.startsWith('http')) return res.status(400).json({ error: '请填写正确的 Webhook 地址' });

  if (!Array.isArray(group.bots)) group.bots = [];
  const bot = {
    id: db.wecomBotConfig.nextBotId++,
    name,
    webhookUrl,
    enabled: body.enabled !== false,
    dailyQuota: Math.max(0, parseInt(body.dailyQuota) || 0),
    todayCount: 0,
    createdAt: new Date().toISOString()
  };

  group.bots.push(bot);
  addAuditLog(req.user.id, req.user.username, 'wecom_bot', `在分组[${group.name}]添加机器人: ${bot.name}`, req);
  saveData();
  res.json({ success: true, bot });
});

// 编辑组内机器人（配额、名称、开关、Webhook）
app.put('/api/wecom-bot-groups/:groupId/bots/:botId', adminRequired, (req, res) => {
  const groupId = parseInt(req.params.groupId);
  const botId = parseInt(req.params.botId);
  const group = (db.wecomBotConfig?.groups || []).find(g => g.id === groupId);
  if (!group) return res.status(404).json({ error: '分组不存在' });

  const bot = (group.bots || []).find(b => b.id === botId);
  if (!bot) return res.status(404).json({ error: '机器人不存在' });

  const body = req.body || {};
  if (body.name !== undefined) bot.name = String(body.name).trim();
  if (body.webhookUrl !== undefined) bot.webhookUrl = String(body.webhookUrl).trim();
  if (body.enabled !== undefined) bot.enabled = !!body.enabled;
  if (body.dailyQuota !== undefined) bot.dailyQuota = Math.max(0, parseInt(body.dailyQuota) || 0);
  if (body.todayCount !== undefined) bot.todayCount = Math.max(0, parseInt(body.todayCount) || 0);

  addAuditLog(req.user.id, req.user.username, 'wecom_bot', `更新机器人[${bot.name}]配置`, req);
  saveData();
  res.json({ success: true, bot });
});

// 删除组内机器人
app.delete('/api/wecom-bot-groups/:groupId/bots/:botId', adminRequired, (req, res) => {
  const groupId = parseInt(req.params.groupId);
  const botId = parseInt(req.params.botId);
  const group = (db.wecomBotConfig?.groups || []).find(g => g.id === groupId);
  if (!group) return res.status(404).json({ error: '分组不存在' });

  const idx = (group.bots || []).findIndex(b => b.id === botId);
  if (idx === -1) return res.status(404).json({ error: '机器人不存在' });

  const removed = group.bots.splice(idx, 1)[0];
  addAuditLog(req.user.id, req.user.username, 'wecom_bot', `删除机器人[${removed.name}]`, req);
  saveData();
  res.json({ success: true });
});

// 一键重置某分组今日已发计数
app.post('/api/wecom-bot-groups/:id/reset-counts', adminRequired, (req, res) => {
  const id = parseInt(req.params.id);
  const group = (db.wecomBotConfig?.groups || []).find(g => g.id === id);
  if (!group) return res.status(404).json({ error: '分组不存在' });

  (group.bots || []).forEach(b => { b.todayCount = 0; });
  group.lastSendIndex = -1;
  group.lastCountDate = new Date().toISOString().slice(0, 10);

  addAuditLog(req.user.id, req.user.username, 'wecom_bot', `重置分组[${group.name}]今日分发计数`, req);
  saveData();
  res.json({ success: true, group });
});

// 机器人群内连通性测试发送
app.post('/api/wecom-bot-groups/:groupId/bots/:botId/test', adminRequired, async (req, res) => {
  const groupId = parseInt(req.params.groupId);
  const botId = parseInt(req.params.botId);
  const group = (db.wecomBotConfig?.groups || []).find(g => g.id === groupId);
  if (!group) return res.status(404).json({ error: '分组不存在' });
  const bot = (group.bots || []).find(b => b.id === botId);
  if (!bot) return res.status(404).json({ error: '机器人不存在' });

  try {
    const testContent = [
      `### 🤖 **企业微信机器人连通性测试**`,
      `> **所属分组**：${group.name}`,
      `> **机器人名称**：${bot.name}`,
      `> **分发策略**：${group.dispatchMode === 'quota' ? `配额分流 (上限 ${bot.dailyQuota || '无限制'} 条)` : group.dispatchMode === 'round_robin' ? '轮询分发' : '全量广播'}`,
      `> **今日已发**：${bot.todayCount || 0} 条`,
      `> **发送时间**：${new Date().toLocaleString('zh-CN')}`,
      `> **测试状态**：<font color="info">通信正常，已成功接入线索分发系统</font>`
    ].join('\n');

    const result = await sendWecomWebhook(bot.webhookUrl, {
      msgtype: 'markdown',
      markdown: { content: testContent }
    });

    res.json({ success: true, result });
  } catch (err) {
    res.status(400).json({ error: err.message || '测试发送失败' });
  }
});

// ==================== 二维码上传与异常反馈中心 API ====================

// 1. 上传微信二维码 / 名片截图
app.post('/api/upload-qrcode', authRequired, (req, res) => {
  try {
    const { imageBase64, filename } = req.body;
    if (!imageBase64) return res.status(400).json({ error: '图片数据不能为空' });

    const qrDir = path.join(ROOT_DIR, 'uploads', 'qrcodes');
    if (!fs.existsSync(qrDir)) {
      fs.mkdirSync(qrDir, { recursive: true });
    }

    const matches = imageBase64.match(/^data:image\/([A-Za-z-+\/]+);base64,(.+)$/);
    let ext = 'png';
    let buffer;
    if (matches && matches.length === 3) {
      ext = matches[1].replace('jpeg', 'jpg');
      buffer = Buffer.from(matches[2], 'base64');
    } else {
      buffer = Buffer.from(imageBase64, 'base64');
    }

    const fname = `qr_${Date.now()}_${Math.random().toString(36).slice(2, 7)}.${ext}`;
    const filePath = path.join(qrDir, fname);
    fs.writeFileSync(filePath, buffer);

    res.json({ success: true, url: `/uploads/qrcodes/${fname}` });
  } catch (err) {
    console.error('upload qrcode error:', err);
    res.status(500).json({ error: '上传二维码图片失败: ' + err.message });
  }
});

// 2. 免登录查看客户信息（供销售反馈页展示）
app.get('/api/public/customer-info', (req, res) => {
  const type = req.query.type || 'zc';
  const id = parseInt(req.query.id);
  const list = type === 'zc' ? (db.customers || []) : (db.financeCustomers || []);
  const customer = list.find(c => c.id === id);
  if (!customer) return res.status(404).json({ error: '客户记录不存在' });

  res.json({
    customer: {
      id: customer.id,
      name: customer.name,
      companyName: customer.companyName,
      phone: customer.phone,
      wechat: customer.wechat
    }
  });
});

// 3. 销售提交异常反馈 (自动备份原信息供补发对比)
app.post('/api/public/feedback', (req, res) => {
  const { type, id, reason, detail, sales } = req.body;
  const list = type === 'zc' ? (db.customers || []) : (db.financeCustomers || []);
  const customer = list.find(c => c.id === parseInt(id));
  if (!customer) return res.status(404).json({ error: '客户记录不存在' });

  // 备份原信息供后续重发对比
  if (!customer.originalPhone) customer.originalPhone = customer.phone || '';
  if (!customer.originalWechat) customer.originalWechat = customer.wechat || '';
  if (!customer.originalQrCodeUrl) customer.originalQrCodeUrl = customer.qrCodeUrl || '';

  customer.hasFeedback = true;
  customer.feedbackStatus = 'pending'; // pending(待处理), resolved(已重发), confirmed_invalid(已核销)
  customer.feedbackReason = reason || '联系不上';
  customer.feedbackDetail = detail || '';
  customer.feedbackSales = sales || '销售同事';
  customer.feedbackTime = new Date().toLocaleString('zh-CN');

  saveData();
  console.log(`[销售反馈异常] 客户ID: ${id}, 原因: ${customer.feedbackReason}, 提交人: ${customer.feedbackSales}`);
  res.json({ success: true });
});

// 4. 客服获取所有待处理的异常线索
app.get('/api/feedback-records', authRequired, (req, res) => {
  const isAdm = !!req.user.isAdmin;
  const currentUser = req.user.username;

  let zcList = (db.customers || []).filter(c => c.hasFeedback && c.feedbackStatus === 'pending');
  let fnList = (db.financeCustomers || []).filter(c => c.hasFeedback && c.feedbackStatus === 'pending');

  if (!isAdm) {
    zcList = zcList.filter(c => c.createdBy === currentUser);
    fnList = fnList.filter(c => c.createdBy === currentUser);
  }

  const result = [
    ...zcList.map(c => ({ ...c, _bizType: 'zc' })),
    ...fnList.map(c => ({ ...c, _bizType: 'finance' }))
  ].sort((a, b) => new Date(b.feedbackTime || 0) - new Date(a.feedbackTime || 0));

  res.json({ list: result, count: result.length });
});

// 5. 客服一键【更新并原路重发到企微群】（不扣提成，定向原群或全组推送）
app.post('/api/feedback-records/:id/resend', authRequired, async (req, res) => {
  const id = parseInt(req.params.id);
  const { type, phone, wechat, qrCodeUrl, remarks, resendRemark } = req.body;
  const list = type === 'zc' ? (db.customers || []) : (db.financeCustomers || []);
  const customer = list.find(c => c.id === id);
  if (!customer) return res.status(404).json({ error: '客户记录不存在' });

  if (phone !== undefined) customer.phone = phone;
  if (wechat !== undefined) customer.wechat = wechat;
  if (qrCodeUrl !== undefined) customer.qrCodeUrl = qrCodeUrl;
  if (remarks !== undefined) customer.remarks = remarks;
  customer.resendRemark = resendRemark || '已向客户核实并更新联系方式，请尽快添加！';

  customer.hasFeedback = false;
  customer.feedbackStatus = 'resolved';
  customer.isResend = true;

  saveData();

  // 优先定向原分发群机器人，若无则走规则匹配
  const targetBot = customer.dispatchedBotWebhook ? {
    id: customer.dispatchedBotId,
    name: '原销售群助手',
    webhookUrl: customer.dispatchedBotWebhook
  } : null;

  const creatorDisp = getUserDisplayName(req.user.username);
  routeAndDispatchGroupMessage({
    type: type || 'zc',
    customer,
    creatorName: creatorDisp,
    globalEnabled: db.wecomBotConfig?.globalEnabled !== false,
    groups: db.wecomBotConfig?.groups || [],
    rootDir: ROOT_DIR,
    baseUrl: `${req.protocol}://${req.get('host')}`,
    targetBot: targetBot,
    isDirect: !!targetBot,
    onLog: (msg) => console.log(msg),
    onSave: () => saveData()
  }).catch(err => console.error('[重发异常]', err.message));

  res.json({ success: true, customer });
});

// 6. 客服/主管标记【确认无效】（不扣提成，记录结案）
app.post('/api/feedback-records/:id/confirm-invalid', authRequired, (req, res) => {
  const id = parseInt(req.params.id);
  const { type } = req.body;
  const list = type === 'zc' ? (db.customers || []) : (db.financeCustomers || []);
  const customer = list.find(c => c.id === id);
  if (!customer) return res.status(404).json({ error: '客户记录不存在' });

  customer.feedbackStatus = 'confirmed_invalid';
  saveData();
  res.json({ success: true });
});

// AI客户信息识别设置。API Key仅在服务端加密保存，不会返回给浏览器。
app.get('/api/ai-settings', adminRequired, (req, res) => {
  res.json({ settings: getPublicAiSettings(db.aiConfig) });
});

app.put('/api/ai-settings', adminRequired, (req, res) => {
  const input = req.body || {};
  if (input.baseUrl !== undefined && input.baseUrl && !/^https?:\/\//i.test(String(input.baseUrl).trim())) {
    return res.status(400).json({ error: '接口地址必须以 http:// 或 https:// 开头' });
  }
  if (input.model !== undefined && String(input.model).trim().length > 120) {
    return res.status(400).json({ error: '模型名称过长' });
  }
  db.aiConfig = updateAiSettings(db.aiConfig, input);
  addAuditLog(req.user.id, req.user.username, 'ai_config', '更新AI客户信息识别配置', req);
  saveData();
  res.json({ success: true, settings: getPublicAiSettings(db.aiConfig) });
});

app.post('/api/ai-extract', authRequired, async (req, res) => {
  if (!hasPermission(req.user, 'extract') && !hasPermission(req.user, 'financeExtract')) {
    return res.status(403).json({ error: '无信息提取权限' });
  }
  const rawText = String(req.body?.text || '').trim();
  const type = req.body?.type === 'finance' ? 'finance' : 'customer';
  if (!rawText) return res.status(400).json({ error: '请先粘贴需要识别的内容' });
  if (rawText.length > 20000) return res.status(400).json({ error: '识别内容不能超过 20000 字' });
  try {
    const data = await extractCustomerInfo(db.aiConfig, type, rawText);
    addAuditLog(req.user.id, req.user.username, 'ai_extract', `AI识别${type === 'finance' ? '财税' : '职称'}客户信息`, req);
    res.json({ success: true, source: 'ai', model: db.aiConfig.model, data });
  } catch (error) {
    console.error('[AI识别失败]', JSON.stringify({
      type,
      endpoint: db.aiConfig?.baseUrl || '',
      model: db.aiConfig?.model || '',
      provider: db.aiConfig?.provider || '',
      temperature: db.aiConfig?.temperature,
      maxTokens: db.aiConfig?.maxTokens,
      timeoutMs: db.aiConfig?.timeoutMs,
      textLength: rawText.length,
      statusCode: error.statusCode || null,
      errorName: error.name || '',
      errorCode: error.code || '',
      error: error.message || '未知错误',
      responseBody: error.responseBody || ''
    }));
    res.status(502).json({ error: error.message || 'AI识别失败' });
  }
});

// 悟空CRM同步设置。凭据与Token仅在服务端加密保存，不会返回给浏览器。
app.get('/api/wukong-sync-settings', adminRequired, (req, res) => {
  res.json({ settings: getWukongSyncSettings(db.wukongSync), stores: db.stores });
});

app.put('/api/wukong-sync-settings', adminRequired, (req, res) => {
  const input = req.body || {};
  let selectedStores = Array.isArray(input.syncStores) ? input.syncStores.map(v => String(v || '').trim()).filter(Boolean) : [];
  // 自动过滤掉在当前店铺列表(db.stores)中不存在的无效店铺，并允许现有有效店铺正常保存
  selectedStores = selectedStores.filter(name => db.stores.includes(name));
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
  // 清理历史遗留的孤立同步任务：客户被删除后，队列中不应继续显示。
  const customerIds = new Set(db.customers.map(customer => Number(customer.id)));
  const validQueue = db.wukongSyncQueue.filter(job => customerIds.has(Number(job.customerId)));
  if (validQueue.length !== db.wukongSyncQueue.length) {
    db.wukongSyncQueue = validQueue;
    saveData();
  }
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
    const jobs = db.wukongSyncQueue.filter(job => job.status !== 'synced' && (!job.attempts || job.attempts < 10));
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

// 登记记录操作日志查询（登录用户可按记录查看）
app.get('/api/record-logs/:recordType/:recordId', authRequired, (req, res) => {
  const recordType = String(req.params.recordType || '').trim();
  const recordId = Number(req.params.recordId);
  if (!['customer', 'finance'].includes(recordType) || !Number.isInteger(recordId)) {
    return res.status(400).json({ error: '无效的登记记录' });
  }
  const logs = (db.auditLogs || []).slice().reverse().filter(log => {
    const context = log.context || {};
    return context.recordType === recordType && (
      Number(context.recordId) === recordId ||
      (Array.isArray(context.recordIds) && context.recordIds.map(Number).includes(recordId))
    );
  });
  res.json({ logs });
});

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

app.get('/api/lead-stats', authRequired, (req, res) => {
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
  
  // 合并数据（确保系统内每个有效用户，或当前登录用户，哪怕留资为0也必然显示一行供录入咨询量）
  const result = {};
  
  // 保底：管理员看到全员，普通员工保底看到自己
  const defaultUsers = req.user.isAdmin 
    ? (db.users || []).filter(u => !u.isAdmin).map(u => u.username)
    : [req.user.username];
    
  defaultUsers.forEach(uname => {
    if (uname) {
      result[uname] = {
        username: getDisplayName(uname),
        rawUser: uname,
        leadCount: 0,
        consultCount: 0,
        invalidConsultCount: 0,
        rate: 0,
        commission: 0
      };
    }
  });

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
app.get('/api/lead-stats/summary', authRequired, (req, res) => {
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

// 各店铺登记量：按客户登记表的「分配店铺」聚合，口径与留资量一致（排除作废客户）
// 支持单日 ?date=2026-09-13 或区间 ?startDate=&endDate=
app.get('/api/lead-stats/store-stats', authRequired, permRequired('leadStats'), (req, res) => {
  try {
    const single = String(req.query.date || '').trim();
    let startDate = String(req.query.startDate || '').trim();
    let endDate = String(req.query.endDate || '').trim();
    if (single) { startDate = single; endDate = single; }
    if (!startDate || !endDate) return res.status(400).json({ error: '缺少日期参数' });
    if (!Array.isArray(db.customers)) db.customers = [];
    if (!Array.isArray(db.stores)) db.stores = [];

    let customers = db.customers;
    if (!req.user.isAdmin) {
      customers = customers.filter(c => !c.createdBy || c.createdBy === req.user.username);
    }

    const counter = {};
    let total = 0;
    customers.forEach(c => {
      if (c.invalid) return;
      if (!c.date || typeof c.date !== 'string') return;
      const d = c.date.slice(0, 10);
      if (d < startDate || d > endDate) return;
      const store = String(c.assignedTo || '').trim() || '未分配店铺';
      counter[store] = (counter[store] || 0) + 1;
      total++;
    });

    // 已配置的店铺即使为 0 也列出，方便一眼看齐；「未分配店铺」仅在有数据时出现
    const names = db.stores.slice();
    Object.keys(counter).forEach(s => { if (names.indexOf(s) < 0) names.push(s); });
    const stores = names
      .map(name => ({ store: name, count: counter[name] || 0 }))
      .filter(row => row.count > 0 || row.store !== '未分配店铺')
      .sort((a, b) => (b.count - a.count) || a.store.localeCompare(b.store, 'zh-Hans-CN'));

    res.json({ date: single, startDate: startDate, endDate: endDate, stores: stores, total: total });
  } catch (err) {
    console.error('store-stats error:', err);
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

// ========== 留资统计数据 批量导出 / 批量导入 ==========
// CSV 列顺序即导入识别顺序；标注「只读」的列由系统计算，导入时忽略
const CONSULT_CSV_HEADER = ['日期', '员工', '员工账号', '总咨询量', '无效咨询', '意向咨询', '留资量', '留资率(%)', '提成(元)'];

function csvCell(value) {
  const text = value === null || value === undefined ? '' : String(value);
  return /[",\r\n]/.test(text) ? '"' + text.replace(/"/g, '""') + '"' : text;
}

function toNonNegativeInt(value) {
  if (value === null || value === undefined || String(value).trim() === '') return 0;
  const n = Number(String(value).trim());
  if (!Number.isFinite(n) || n < 0 || !Number.isInteger(n)) return null;
  return n;
}

function displayNameOf(username) {
  if (!username) return '(未分配)';
  const u = db.users.find(x => x.username === username);
  return (u && u.name) ? u.name : username;
}

// 构建 [员工 × 日期] 留资统计明细，口径与「留资统计」页签一致
function buildConsultDetail(startDate, endDate, user) {
  if (!Array.isArray(db.customers)) db.customers = [];
  if (!Array.isArray(db.consultStats)) db.consultStats = [];

  const map = {}; // username -> date -> { leads, consults, invalids }

  db.customers.forEach(c => {
    if (c.invalid) return;
    if (!c.date || typeof c.date !== 'string') return;
    const d = c.date.slice(0, 10);
    if (startDate && d < startDate) return;
    if (endDate && d > endDate) return;
    const u = c.createdBy || '(未分配)';
    if (!map[u]) map[u] = {};
    if (!map[u][d]) map[u][d] = { leads: 0, consults: 0, invalids: 0 };
    map[u][d].leads++;
  });

  db.consultStats.forEach(s => {
    const d = s.date;
    if (!d || !s.username) return;
    if (startDate && d < startDate) return;
    if (endDate && d > endDate) return;
    if (!map[s.username]) map[s.username] = {};
    if (!map[s.username][d]) map[s.username][d] = { leads: 0, consults: 0, invalids: 0 };
    map[s.username][d].consults = Number(s.consultCount || 0);
    map[s.username][d].invalids = Number(s.invalidConsultCount || 0);
  });

  const targetUsers = user.isAdmin ? Object.keys(map) : [user.username].filter(u => map[u]);
  const rows = [];
  targetUsers.forEach(u => {
    Object.keys(map[u]).sort().forEach(d => {
      const dd = map[u][d];
      const effective = getEffectiveConsultCount(dd.consults, dd.invalids);
      const rate = effective > 0 ? Math.round(dd.leads / effective * 1000) / 10 : 0;
      rows.push({
        date: d,
        username: u,
        displayName: displayNameOf(u),
        consultCount: dd.consults,
        invalidConsultCount: Number(dd.invalids || 0),
        effectiveConsultCount: effective,
        leadCount: dd.leads,
        rate: rate,
        commission: effective > 0 ? calcCommission(rate, dd.leads) : 0
      });
    });
  });
  rows.sort((a, b) => (a.date === b.date ? b.leadCount - a.leadCount : (a.date < b.date ? -1 : 1)));
  return rows;
}

// 导出留资统计数据（Excel 可直接打开的 CSV，且可再次导入）
app.get('/api/lead-stats/export', authRequired, permRequired('leadStats'), (req, res) => {
  try {
    const scope = String(req.query.scope || 'day');
    let startDate, endDate, label;
    if (scope === 'month') {
      const month = String(req.query.month || '');
      if (!/^\d{4}-\d{2}$/.test(month)) return res.status(400).json({ error: '缺少或非法的month参数' });
      const [yy, mm] = month.split('-').map(Number);
      startDate = month + '-01';
      endDate = month + '-' + String(new Date(yy, mm, 0).getDate()).padStart(2, '0');
      label = month;
    } else if (scope === 'range') {
      startDate = String(req.query.startDate || '');
      endDate = String(req.query.endDate || '');
      if (!startDate || !endDate) return res.status(400).json({ error: '缺少 startDate / endDate 参数' });
      label = startDate + '_' + endDate;
    } else {
      const date = String(req.query.date || localDateStr(new Date()));
      startDate = date;
      endDate = date;
      label = date;
    }

    const rows = buildConsultDetail(startDate, endDate, req.user);
    const lines = [CONSULT_CSV_HEADER.join(',')];
    rows.forEach(r => {
      lines.push([
        r.date, r.displayName, r.username,
        r.consultCount, r.invalidConsultCount, r.effectiveConsultCount,
        r.leadCount, r.rate, r.commission
      ].map(csvCell).join(','));
    });

    res.setHeader('Content-Type', 'text/csv; charset=utf-8');
    res.setHeader('Content-Disposition', 'attachment; filename=lead-stats_' + label + '.csv');
    res.send('\uFEFF' + lines.join('\r\n') + '\r\n');
  } catch (err) {
    console.error('lead-stats export error:', err);
    res.status(500).json({ error: '导出失败: ' + err.message });
  }
});

// 导入留资统计数据（先预览后写入，带字段校验、重复处理、失败行提示）
app.post('/api/lead-stats/import', authRequired, permRequired('editConsult'), (req, res) => {
  try {
    const body = req.body || {};
    const rawRows = Array.isArray(body.rows) ? body.rows : [];
    const preview = body.preview === true;
    const onDuplicate = body.onDuplicate === 'skip' ? 'skip' : 'overwrite';
    if (!rawRows.length) return res.status(400).json({ error: '没有可导入的数据行' });

    if (!Array.isArray(db.consultStats)) db.consultStats = [];
    const today = localDateStr(new Date());
    const MAX_ERRORS = 50;

    const failed = [];
    const valid = [];
    const seen = {}; // 文件内去重：date|username -> 首次出现的行号
    const pushError = (line, reason) => failed.push({ line: line, reason: reason });

    rawRows.forEach((r, i) => {
      const row = r || {};
      const line = Number(row._line) || (i + 2); // 第 1 行为表头
      const date = String(row['日期'] !== undefined ? row['日期'] : (row.date || '')).trim();
      let username = String(row['员工账号'] !== undefined ? row['员工账号'] : (row.username || '')).trim();
      const nameCol = String(row['员工'] !== undefined ? row['员工'] : (row.displayName || '')).trim();
      const consultRaw = row['总咨询量'] !== undefined ? row['总咨询量'] : row.consultCount;
      const invalidRaw = row['无效咨询'] !== undefined ? row['无效咨询'] : row.invalidConsultCount;

      if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) { pushError(line, '日期缺失或格式错误（应为 YYYY-MM-DD）'); return; }
      if (!username && nameCol) {
        const byName = db.users.find(u => u.name === nameCol);
        if (byName) username = byName.username;
      }
      if (!username) { pushError(line, '员工账号为空'); return; }
      if (!db.users.some(u => u.username === username)) { pushError(line, '员工账号不存在：' + username); return; }

      const consultCount = toNonNegativeInt(consultRaw);
      const invalidConsultCount = toNonNegativeInt(invalidRaw);
      if (consultCount === null) { pushError(line, '总咨询量必须是非负整数：' + String(consultRaw === undefined ? '' : consultRaw)); return; }
      if (invalidConsultCount === null) { pushError(line, '无效咨询必须是非负整数：' + String(invalidRaw === undefined ? '' : invalidRaw)); return; }
      if (invalidConsultCount > consultCount) { pushError(line, '无效咨询(' + invalidConsultCount + ')大于总咨询量(' + consultCount + ')'); return; }
      if (!req.user.isAdmin && username !== req.user.username) { pushError(line, '无权导入其他员工的数据：' + username); return; }
      if (!req.user.isAdmin && date !== today) { pushError(line, '非管理员只能导入当天(' + today + ')的数据'); return; }

      const key = date + '|' + username;
      if (seen[key]) { pushError(line, '与文件内第 ' + seen[key] + ' 行重复（同日期同员工）'); return; }
      seen[key] = line;

      const exist = db.consultStats.find(s => s.date === date && s.username === username);
      valid.push({ line: line, date: date, username: username, consultCount: consultCount, invalidConsultCount: invalidConsultCount, exist: exist });
    });

    const createdCount = valid.filter(v => !v.exist).length;
    const updatedCount = valid.filter(v => v.exist).length;
    const skipped = onDuplicate === 'skip' ? updatedCount : 0;

    const base = {
      total: rawRows.length,
      valid: valid.length,
      created: createdCount,
      updated: updatedCount,
      skipped: skipped,
      willWrite: onDuplicate === 'skip' ? createdCount : valid.length,
      failed: failed.length,
      errors: failed.slice(0, MAX_ERRORS),
      errorTruncated: failed.length > MAX_ERRORS
    };

    if (preview) return res.json(Object.assign({ preview: true }, base));

    let added = 0, changed = 0;
    valid.forEach(v => {
      if (v.exist) {
        if (onDuplicate === 'skip') return;
        v.exist.consultCount = v.consultCount;
        v.exist.invalidConsultCount = v.invalidConsultCount;
        changed++;
      } else {
        db.consultStats.push({
          id: db.nextConsultStatId++,
          date: v.date,
          username: v.username,
          consultCount: v.consultCount,
          invalidConsultCount: v.invalidConsultCount
        });
        added++;
      }
    });

    if (added || changed) {
      addAuditLog(req.user.id, req.user.username, 'consult_edit',
        '导入留资统计：新增' + added + '条，更新' + changed + '条，跳过' + skipped + '条，失败' + failed.length + '条', req);
      saveData();
    }

    res.json(Object.assign({ success: true, created: added, updated: changed, skipped: skipped }, {
      total: base.total, valid: base.valid, failed: base.failed,
      errors: base.errors, errorTruncated: base.errorTruncated
    }));
  } catch (err) {
    console.error('lead-stats import error:', err);
    res.status(500).json({ error: '导入失败: ' + err.message });
  }
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

// 免登录直接访问异常反馈页面路由
app.get(['/feedback', '/feedback.html', '/public/feedback.html'], (req, res) => {
  res.sendFile(path.join(ROOT_DIR, 'public', 'feedback.html'));
});

// 免登录销售主管调度台路由
app.get(['/bot-dispatch', '/bot-dispatch.html', '/public/bot-dispatch.html'], (req, res) => {
  res.sendFile(path.join(ROOT_DIR, 'public', 'bot-dispatch.html'));
});

// ========== 销售主管专属免登录调度 API (严格受限权限：仅限排班时段、配额、开关、计数重置) ==========
app.get('/api/public/leader-bot-manage', (req, res) => {
  if (!db.wecomBotConfig || typeof db.wecomBotConfig !== 'object') {
    db.wecomBotConfig = { globalEnabled: true, groups: [], nextGroupId: 1, nextBotId: 1 };
  }

  // 严格脱敏：过滤掉 Webhook 真实密钥，只向主管开放调度排班字段
  const safeGroups = (db.wecomBotConfig.groups || []).map(g => ({
    id: g.id,
    name: g.name,
    enabled: !!g.enabled,
    businessType: g.businessType || 'all',
    stores: g.stores || [],
    timeRanges: g.timeRanges || [],
    dispatchMode: g.dispatchMode || 'quota',
    bots: (g.bots || []).map(b => ({
      id: b.id,
      name: b.name,
      enabled: !!b.enabled,
      dailyQuota: b.dailyQuota || 0,
      todayCount: b.todayCount || 0
    }))
  }));

  res.json({
    globalEnabled: db.wecomBotConfig.globalEnabled !== false,
    groups: safeGroups
  });
});

// 主管调整分组开关与班次时间
app.put('/api/public/leader-bot-manage/group/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const group = (db.wecomBotConfig?.groups || []).find(g => g.id === id);
  if (!group) return res.status(404).json({ error: '分组不存在' });

  const body = req.body || {};
  if (body.enabled !== undefined) group.enabled = !!body.enabled;
  if (body.timeRanges !== undefined && Array.isArray(body.timeRanges)) {
    group.timeRanges = body.timeRanges;
  }
  if (body.dispatchMode !== undefined && ['quota', 'round_robin', 'broadcast'].includes(body.dispatchMode)) {
    group.dispatchMode = body.dispatchMode;
  }

  saveData();
  res.json({ success: true, group: { id: group.id, name: group.name, enabled: group.enabled, timeRanges: group.timeRanges, dispatchMode: group.dispatchMode } });
});

// 主管调整单个群机器人开关与配额
app.put('/api/public/leader-bot-manage/group/:groupId/bot/:botId', (req, res) => {
  const groupId = parseInt(req.params.groupId);
  const botId = parseInt(req.params.botId);
  const group = (db.wecomBotConfig?.groups || []).find(g => g.id === groupId);
  if (!group) return res.status(404).json({ error: '分组不存在' });

  const bot = (group.bots || []).find(b => b.id === botId);
  if (!bot) return res.status(404).json({ error: '机器人不存在' });

  const body = req.body || {};
  if (body.enabled !== undefined) bot.enabled = !!body.enabled;
  if (body.dailyQuota !== undefined) bot.dailyQuota = Math.max(0, parseInt(body.dailyQuota) || 0);

  saveData();
  res.json({ success: true, bot: { id: bot.id, name: bot.name, enabled: bot.enabled, dailyQuota: bot.dailyQuota } });
});

// 主管一键清零某分组今日计数
app.post('/api/public/leader-bot-manage/group/:id/reset', (req, res) => {
  const id = parseInt(req.params.id);
  const group = (db.wecomBotConfig?.groups || []).find(g => g.id === id);
  if (!group) return res.status(404).json({ error: '分组不存在' });

  (group.bots || []).forEach(b => { b.todayCount = 0; });
  group.lastSendIndex = -1;
  group.lastCountDate = new Date().toISOString().slice(0, 10);

  saveData();
  res.json({ success: true });
});

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
