const crypto = require('crypto');
const http = require('http');
const https = require('https');

const CONFIG_KEY = crypto.createHash('sha256')
  .update(process.env.AI_CONFIG_ENCRYPTION_KEY || process.env.ZGJ_CONFIG_ENCRYPTION_KEY || 'zgj-ai-local-config-v1')
  .digest();

const CUSTOMER_FIELDS = ['name', 'phone', 'wechat', 'degree', 'major', 'titleLevel', 'ssCity', 'reviewMajor', 'applyLevel', 'conclusion', 'remarks'];
const FINANCE_FIELDS = ['phone', 'wechat', 'orderNo', 'serviceType', 'taxpayerType', 'city', 'remarks'];
const TITLE_LEVELS = ['初级', '中级', '副高', '正高'];

function encrypt(value) {
  const text = String(value || '').trim();
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
  } catch (error) {
    return '';
  }
}

function defaultConfig() {
  return {
    enabled: false,
    provider: 'openai-compatible',
    baseUrl: 'https://api.openai.com/v1',
    model: '',
    encryptedApiKey: '',
    temperature: 0.1,
    maxTokens: 800,
    timeoutMs: 60000
  };
}

function normalizeConfig(value) {
  const config = Object.assign(defaultConfig(), value || {});
  config.enabled = !!config.enabled;
  config.provider = String(config.provider || 'openai-compatible').trim();
  config.baseUrl = String(config.baseUrl || '').trim().replace(/\/+$/, '');
  config.model = String(config.model || '').trim();
  config.temperature = Math.min(2, Math.max(0, Number(config.temperature ?? 0.1)));
  config.maxTokens = Math.min(4096, Math.max(128, Math.round(Number(config.maxTokens || 800))));
  config.timeoutMs = Math.min(60000, Math.max(5000, Math.round(Number(config.timeoutMs || 60000))));
  return config;
}

function getPublicSettings(value) {
  const config = normalizeConfig(value);
  return {
    enabled: config.enabled,
    provider: config.provider,
    baseUrl: config.baseUrl,
    model: config.model,
    temperature: config.temperature,
    maxTokens: config.maxTokens,
    timeoutMs: config.timeoutMs,
    hasApiKey: !!decrypt(config.encryptedApiKey),
    apiKeyHint: decrypt(config.encryptedApiKey) ? '已配置（不会回显）' : ''
  };
}

function getApiKey(value) {
  return decrypt(normalizeConfig(value).encryptedApiKey);
}

function updateSettings(current, input) {
  const previous = normalizeConfig(current);
  const next = normalizeConfig({
    ...previous,
    enabled: input.enabled === undefined ? previous.enabled : input.enabled,
    provider: input.provider === undefined ? previous.provider : input.provider,
    baseUrl: input.baseUrl === undefined ? previous.baseUrl : input.baseUrl,
    model: input.model === undefined ? previous.model : input.model,
    temperature: input.temperature === undefined ? previous.temperature : input.temperature,
    maxTokens: input.maxTokens === undefined ? previous.maxTokens : input.maxTokens,
    timeoutMs: input.timeoutMs === undefined ? previous.timeoutMs : input.timeoutMs
  });
  const apiKey = String(input.apiKey || '').trim();
  if (apiKey) next.encryptedApiKey = encrypt(apiKey);
  return next;
}

function requestJson(url, body, timeoutMs, apiKey) {
  return new Promise((resolve, reject) => {
    const target = new URL(url);
    const client = target.protocol === 'https:' ? https : http;
    const bodyText = JSON.stringify(body);
    const request = client.request({
      protocol: target.protocol,
      hostname: target.hostname,
      port: target.port,
      path: target.pathname + target.search,
      method: 'POST',
      timeout: timeoutMs,
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(bodyText)
      }
    }, response => {
      let text = '';
      response.setEncoding('utf8');
      response.on('data', chunk => { text += chunk; });
      response.on('end', () => {
        let data = null;
        try { data = text ? JSON.parse(text) : null; } catch (error) {}
        if (response.statusCode >= 200 && response.statusCode < 300) return resolve(data || {});
        const message = data?.error?.message || data?.error || data?.message || text;
        const error = new Error(`AI接口请求失败（HTTP ${response.statusCode}）：${message || '未知错误'}`);
        error.statusCode = response.statusCode;
        error.responseBody = text.slice(0, 2000);
        reject(error);
      });
    });
    request.on('timeout', () => request.destroy(new Error('AI接口请求超时')));
    request.on('error', reject);
    request.write(bodyText);
    request.end();
  });
}

function endpointFor(config) {
  const base = config.baseUrl || '';
  return /\/chat\/completions$/i.test(base) ? base : `${base}/chat/completions`;
}

function fieldsFor(type) {
  return type === 'finance' ? FINANCE_FIELDS : CUSTOMER_FIELDS;
}

function promptFor(type) {
  if (type === 'finance') {
    return '你负责整理财税客户信息。只返回 JSON 对象，不要 Markdown，不要解释。字段必须来自：phone,wechat,orderNo,serviceType,taxpayerType,city,remarks。无法确定的字段返回空字符串。不要臆造不存在的信息。';
  }
  return '你负责整理职称客户信息。只返回 JSON 对象，不要 Markdown，不要解释。字段必须来自：name,phone,wechat,degree,major,titleLevel,ssCity,reviewMajor,applyLevel,conclusion,remarks。职称等级只输出申报职称 applyLevel，等级仅使用初级、中级、副高、正高；不要把聊天中出现的职称等级直接填入 titleLevel，titleLevel 由系统根据 applyLevel 自动推导为低一级。识别 applyLevel 时按以下顺序：1）明确出现“申报、报名、报考、想评、准备评、评审、目标”等词后的等级，使用该等级；2）如果没有这些关键词，但文本明确出现“初级/中级/副高/正高”“初级工程师/中级工程师/高级工程师”等职称或证书，直接把出现的等级作为 applyLevel，不要根据工作年限把它升级；3）只有完全没有明确等级时，才可以根据上下文谨慎推断。特别注意：“大专 工作10年以上 土木工程专业 中级工程师证”应识别为 applyLevel“中级”，titleLevel 由系统推导为“初级”，不能因为工作10年以上改成副高。如果缺少明确等级和足够上下文，applyLevel 返回空字符串。无法确定的其他字段返回空字符串，不要臆造不存在的信息。';
}

function extractJson(content) {
  const text = Array.isArray(content)
    ? content.map(item => typeof item === 'string' ? item : item?.text || '').join('')
    : String(content || '');
  const cleaned = text.replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/i, '').trim();
  try { return JSON.parse(cleaned); } catch (error) {
    const start = cleaned.indexOf('{');
    const end = cleaned.lastIndexOf('}');
    if (start < 0 || end <= start) throw new Error('AI返回内容不是有效的JSON');
    try { return JSON.parse(cleaned.slice(start, end + 1)); } catch (parseError) { throw new Error('AI返回内容不是有效的JSON'); }
  }
}

function normalizeResult(value, type) {
  const fields = fieldsFor(type);
  const result = {};
  fields.forEach(field => { result[field] = value && value[field] !== undefined && value[field] !== null ? String(value[field]).trim() : ''; });
  return result;
}

function normalizeTitleLevel(value) {
  const text = String(value || '').trim();
  if (!text) return '';
  if (/正高|正高级|教授级/.test(text)) return '正高';
  if (/副高|副高级|高级工程师/.test(text)) return '副高';
  if (/中级/.test(text)) return '中级';
  if (/初级|助理|员级/.test(text)) return '初级';
  return text;
}

function completeTitleLevels(value) {
  const result = { ...value };
  result.applyLevel = normalizeTitleLevel(result.applyLevel);
  const applyIndex = TITLE_LEVELS.indexOf(result.applyLevel);
  result.titleLevel = applyIndex > 0 ? TITLE_LEVELS[applyIndex - 1] : '';
  return result;
}

async function extractCustomerInfo(configValue, type, rawText) {
  const config = normalizeConfig(configValue);
  const apiKey = decrypt(config.encryptedApiKey);
  if (!config.enabled) throw new Error('AI识别未启用，请先在系统设置中开启');
  if (!config.baseUrl || !config.model || !apiKey) throw new Error('AI识别配置不完整，请填写接口地址、模型名称和 API Key');
  const response = await requestJson(endpointFor(config), {
    model: config.model,
    temperature: config.temperature,
    max_tokens: config.maxTokens,
    messages: [
      { role: 'system', content: promptFor(type) },
      { role: 'user', content: String(rawText || '').trim() }
    ]
  }, config.timeoutMs, apiKey);
  const content = response?.choices?.[0]?.message?.content;
  if (!content) throw new Error('AI接口未返回识别结果');
  const result = normalizeResult(extractJson(content), type);
  return type === 'customer' ? completeTitleLevels(result) : result;
}

module.exports = {
  defaultConfig,
  normalizeConfig,
  getPublicSettings,
  getApiKey,
  updateSettings,
  extractCustomerInfo,
  normalizeTitleLevel,
  completeTitleLevels
};
