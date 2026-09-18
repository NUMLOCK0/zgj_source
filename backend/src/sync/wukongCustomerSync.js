const crypto = require('crypto');
const http = require('http');
const https = require('https');

const DEFAULT_TIMEOUT_MS = 5000;
const CONFIG_KEY = crypto.createHash('sha256')
  .update(process.env.WUKONG_CONFIG_ENCRYPTION_KEY || process.env.ZGJ_CONFIG_ENCRYPTION_KEY || 'zgj-wukong-local-config-v1')
  .digest();

function stripEmoji(str) {
  if (!str) return '';
  // 过滤所有 4 字节的 Emoji 与特殊 Unicode 字符，防止老旧 MySQL utf8 字符集报 1366 错误
  return String(str).replace(/[\uD800-\uDBFF][\uDC00-\uDFFF]|\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDE4F]|\uD83E[\uDD00-\uDDFF]/g, '').trim();
}

function normalizeString(value) {
  return stripEmoji(value);
}

function normalizeBaseUrl(value) {
  return normalizeString(value)
    .replace(/\/+$/, '')
    .replace(/\/index\.php\/(?:admin\/base\/login|crm\/index\/dashboard|crm\/customer\/syncFromZgj)$/i, '')
    .replace(/\/(?:admin\/base\/login|crm\/index\/dashboard|crm\/customer\/syncFromZgj)$/i, '');
}

function encrypt(value) {
  const text = normalizeString(value);
  if (!text) return '';
  const iv = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv('aes-256-gcm', CONFIG_KEY, iv);
  const content = Buffer.concat([cipher.update(text, 'utf8'), cipher.final()]);
  return [iv.toString('base64'), cipher.getAuthTag().toString('base64'), content.toString('base64')].join('.');
}

function decrypt(value) {
  if (!value) return '';
  try {
    const [ivText, tagText, contentText] = String(value).split('.');
    const decipher = crypto.createDecipheriv('aes-256-gcm', CONFIG_KEY, Buffer.from(ivText, 'base64'));
    decipher.setAuthTag(Buffer.from(tagText, 'base64'));
    return Buffer.concat([decipher.update(Buffer.from(contentText, 'base64')), decipher.final()]).toString('utf8');
  } catch (err) {
    return '';
  }
}

function defaultConfig() {
  return { enabled: true, baseUrl: '', username: '', encryptedPassword: '', encryptedToken: '', encryptedSessionId: '', tokenUpdatedAt: '', tokenStatus: 'missing', tokenCheckedAt: '', syncStores: [] };
}

function wukongApiUrl(baseUrl, path) {
  const base = normalizeBaseUrl(baseUrl);
  const prefix = base.endsWith('/index.php') ? base : base + '/index.php';
  return prefix + path;
}

function normalizeConfig(value) {
  const config = Object.assign(defaultConfig(), value || {});
  config.enabled = !!config.enabled;
  config.baseUrl = normalizeBaseUrl(config.baseUrl);
  config.username = normalizeString(config.username);
  config.syncStores = Array.isArray(config.syncStores) ? [...new Set(config.syncStores.map(normalizeString).filter(Boolean))] : [];
  return config;
}

function getWukongSyncSettings(config) {
  const normalized = normalizeConfig(config);
  const hasToken = !!decrypt(normalized.encryptedToken) && !!decrypt(normalized.encryptedSessionId);
  return {
    enabled: normalized.enabled,
    baseUrl: normalized.baseUrl,
    username: normalized.username,
    syncStores: normalized.syncStores,
    hasPassword: !!decrypt(normalized.encryptedPassword),
    hasToken,
    tokenUpdatedAt: normalized.tokenUpdatedAt || '',
    tokenStatus: hasToken ? (normalized.tokenStatus || 'valid') : 'missing',
    tokenCheckedAt: normalized.tokenCheckedAt || ''
  };
}

function updateWukongSyncSettings(current, input) {
  const previous = normalizeConfig(current);
  const next = normalizeConfig({
    ...previous,
    enabled: input.enabled === undefined ? previous.enabled : input.enabled,
    baseUrl: input.baseUrl === undefined ? previous.baseUrl : input.baseUrl,
    username: input.username === undefined ? previous.username : input.username,
    syncStores: input.syncStores === undefined ? previous.syncStores : input.syncStores
  });
  const password = normalizeString(input.password);
  const connectionChanged = next.baseUrl !== previous.baseUrl || next.username !== previous.username || !!password;
  if (password) next.encryptedPassword = encrypt(password);
  if (connectionChanged) {
    next.encryptedToken = '';
    next.encryptedSessionId = '';
    next.tokenUpdatedAt = '';
    next.tokenStatus = 'missing';
    next.tokenCheckedAt = '';
  }
  return next;
}

function buildRemark(customer) {
  const parts = [
    ['微信号', customer.wechat], ['学历', customer.degree], ['专业', customer.major], ['当前职称', customer.titleLevel],
    ['社保城市', customer.ssCity], ['评审专业', customer.reviewMajor], ['申报级别', customer.applyLevel],
    ['结论', customer.conclusion], ['店铺', customer.assignedTo], ['成交状态', customer.dealStatus], ['原备注', customer.remarks]
  ];
  return parts.filter((item) => normalizeString(item[1])).map((item) => item[0] + ': ' + normalizeString(item[1])).join('\n');
}

function buildPayload(customer, user) {
  return {
    source_system: 'zgj',
    source_customer_id: String(customer.id),
    source_created_by: customer.createdBy || (user && user.username) || '',
    customer: {
      name: normalizeString(customer.name) || ('职称客户-' + customer.id),
      mobile: normalizeString(customer.phone),
      address: normalizeString(customer.ssCity) ? [normalizeString(customer.ssCity)] : [],
      detail_address: normalizeString(customer.ssCity),
      source: normalizeString(customer.assignedTo) || '线上注册',
      data_type: normalizeString(customer.applyLevel),
      remark: buildRemark(customer)
    }
  };
}

function requestJson(url, body, options = {}) {
  return new Promise((resolve, reject) => {
    const bodyText = JSON.stringify(body || {});
    const target = new URL(url);
    const client = target.protocol === 'https:' ? https : http;
    const req = client.request({
      protocol: target.protocol, hostname: target.hostname, port: target.port,
      path: target.pathname + target.search, method: options.method || 'POST', timeout: options.timeoutMs || DEFAULT_TIMEOUT_MS,
      headers: Object.assign(options.method === 'GET' ? {} : { 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(bodyText) }, options.headers || {})
    }, (res) => {
      let responseText = '';
      res.setEncoding('utf8');
      res.on('data', (chunk) => { responseText += chunk; });
      res.on('end', () => {
        let responseJson = null;
        try { responseJson = responseText ? JSON.parse(responseText) : null; } catch (err) {}
        if (res.statusCode >= 200 && res.statusCode < 300 && (!responseJson || !responseJson.code || Number(responseJson.code) === 200)) {
          resolve({ statusCode: res.statusCode, body: responseJson || responseText });
          return;
        }
        const message = responseJson && (responseJson.error || responseJson.msg) ? (responseJson.error || responseJson.msg) : responseText;
        reject(new Error('悟空CRM请求失败 HTTP ' + res.statusCode + ': ' + (message || '未知错误')));
      });
    });
    req.on('timeout', () => req.destroy(new Error('悟空CRM请求超时')));
    req.on('error', reject);
    if (options.method !== 'GET') req.write(bodyText);
    req.end();
  });
}

function legacyConfig() {
  return { url: process.env.WUKONG_SYNC_URL || '', secret: process.env.WUKONG_SYNC_SECRET || '', timeoutMs: Number(process.env.WUKONG_SYNC_TIMEOUT_MS || DEFAULT_TIMEOUT_MS) };
}

async function fetchWukongToken(config) {
  const current = normalizeConfig(config);
  const password = decrypt(current.encryptedPassword);
  if (!current.baseUrl || !current.username || !password) throw new Error('请先填写悟空CRM地址、账号和密码');
  const result = await requestJson(wukongApiUrl(current.baseUrl, '/admin/base/login'), { username: current.username, password, isRemember: 0 });
  const token = result.body && result.body.data && result.body.data.authKey;
  const sessionId = result.body && result.body.data && result.body.data.sessionId;
  if (!token || !sessionId) throw new Error('悟空CRM未返回有效 Token 或会话标识');
  current.encryptedToken = encrypt(token);
  current.encryptedSessionId = encrypt(sessionId);
  current.tokenUpdatedAt = new Date().toISOString();
  current.tokenStatus = 'valid';
  current.tokenCheckedAt = current.tokenUpdatedAt;
  return current;
}

async function validateWukongToken(config) {
  const current = normalizeConfig(config);
  const token = decrypt(current.encryptedToken);
  const sessionId = decrypt(current.encryptedSessionId);
  const checkedAt = new Date().toISOString();
  if (!current.baseUrl || !token || !sessionId) {
    current.tokenStatus = 'missing';
    current.tokenCheckedAt = checkedAt;
    return { valid: false, reason: '尚未获取悟空CRM Token', config: current };
  }
  try {
    // 目标地址示例：https://scrm.zctom.com/index.php/crm/index/dashboard
    const result = await requestJson(wukongApiUrl(current.baseUrl, '/crm/index/dashboard'), {}, { headers: { AuthKey: token, SessionId: sessionId } });
    if (!result.body || typeof result.body !== 'object' || !Object.prototype.hasOwnProperty.call(result.body, 'data')) {
      throw new Error('悟空CRM未返回有效仪表盘数据');
    }
    current.tokenStatus = 'valid';
    current.tokenCheckedAt = checkedAt;
    return { valid: true, config: current };
  } catch (err) {
    current.encryptedToken = '';
    current.encryptedSessionId = '';
    current.tokenStatus = 'expired';
    current.tokenCheckedAt = checkedAt;
    return { valid: false, reason: err.message || '悟空CRM Token已过期', config: current };
  }
}

async function syncCustomerToWukong(customer, user, settings) {
  const config = normalizeConfig(settings);
  if (config.enabled) {
    if (config.syncStores.length === 0 || !config.syncStores.includes(normalizeString(customer.assignedTo))) {
      return { skipped: true, reason: '该客户所属店铺未启用同步' };
    }
    const token = decrypt(config.encryptedToken);
    const sessionId = decrypt(config.encryptedSessionId);
    if (!token || !sessionId) return { skipped: true, reason: '悟空CRM Token 未获取' };
    return requestJson(wukongApiUrl(config.baseUrl, '/crm/customer/syncFromZgj'), buildPayload(customer, user), { headers: { AuthKey: token, SessionId: sessionId } });
  }

  const legacy = legacyConfig();
  if (!legacy.url || !legacy.secret) return { skipped: true, reason: '悟空CRM同步未启用' };
  const body = buildPayload(customer, user);
  const timestamp = Math.floor(Date.now() / 1000).toString();
  const signature = crypto.createHmac('sha256', legacy.secret).update(timestamp + '.' + JSON.stringify(body)).digest('hex');
  return requestJson(legacy.url, body, { timeoutMs: legacy.timeoutMs, headers: { 'X-ZGJ-Timestamp': timestamp, 'X-ZGJ-Signature': signature } });
}

module.exports = { syncCustomerToWukong, getWukongSyncSettings, updateWukongSyncSettings, fetchWukongToken, validateWukongToken };
