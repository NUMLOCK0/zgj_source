/*
 * OpenAI 兼容接口测试脚本
 *
 * 直接读取数据库配置测试：
 *   node scripts/test-ai-extract.js --from-db
 *
 * 也支持环境变量：
 *   $env:AI_BASE_URL='https://api.deepseek.com/v1'
 *   $env:AI_MODEL='deepseek-chat'
 *   $env:AI_API_KEY='你的 API Key'
 *   node scripts/test-ai-extract.js
 *
 * 可选环境变量：AI_TYPE=customer|finance、AI_TEXT=测试文本、AI_TIMEOUT_MS=65000
 */
const http = require('http');
const https = require('https');
const path = require('path');
const defaultData = require('../src/config/defaultData');
const { createSqliteStore } = require('../src/db/sqliteStore');
const { getApiKey } = require('../src/ai/customerAi');

async function loadDatabaseConfig() {
  const store = await createSqliteStore({ rootDir: path.join(__dirname, '..'), defaultData });
  const data = store.loadData();
  return {
    baseUrl: data.aiConfig?.baseUrl || '',
    model: data.aiConfig?.model || '',
    apiKey: getApiKey(data.aiConfig),
    timeoutMs: data.aiConfig?.timeoutMs || 60000
  };
}

async function main() {
  const fromDb = process.argv.includes('--from-db');
  const databaseConfig = fromDb ? await loadDatabaseConfig() : {};
  const baseUrl = String(process.env.AI_BASE_URL || databaseConfig.baseUrl || '').replace(/\/+$/, '');
  const model = String(process.env.AI_MODEL || databaseConfig.model || '').trim();
  const apiKey = String(process.env.AI_API_KEY || databaseConfig.apiKey || '').trim();
  const type = process.env.AI_TYPE === 'finance' ? 'finance' : 'customer';
  const timeoutMs = Number(process.env.AI_TIMEOUT_MS || databaseConfig.timeoutMs || 65000);
  const text = process.env.AI_TEXT || (type === 'finance'
    ? '客户咨询代理记账，微信 abc123，电话 13800138000，所在城市广州。'
    : '张三，电话 13800138000，微信 zhangsan，本科，计算机专业，想申报中级职称。');

  if (!baseUrl || !model || !apiKey) {
    console.error(fromDb ? '数据库中的 AI 配置不完整，请先在系统设置中填写接口地址、模型名称和 API Key' : '缺少测试配置，请先设置 AI_BASE_URL、AI_MODEL、AI_API_KEY');
    process.exitCode = 2;
    return;
  }

  const endpoint = /\/chat\/completions$/i.test(baseUrl) ? baseUrl : `${baseUrl}/chat/completions`;
  const system = type === 'finance'
    ? '只返回 JSON。字段：phone,wechat,orderNo,serviceType,taxpayerType,city,remarks。无法确定的字段返回空字符串。'
    : '只返回 JSON。字段：name,phone,wechat,degree,major,titleLevel,ssCity,reviewMajor,applyLevel,conclusion,remarks。只输出申报职称 applyLevel，等级仅使用初级、中级、副高、正高；titleLevel 由系统根据 applyLevel 自动推导为低一级。明确申报等级优先；如果没有申报关键词，但文本出现“初级/中级/副高/正高”或对应工程师证书，直接把该等级作为 applyLevel，不要根据工作年限升级。例如“大专 工作10年以上 土木工程专业 中级工程师证”必须返回 applyLevel 为中级，titleLevel 由系统推导为初级。无法确定时返回空字符串。';
  const body = JSON.stringify({
    model,
    temperature: 0.1,
    max_tokens: 800,
    messages: [{ role: 'system', content: system }, { role: 'user', content: text }]
  });
  const target = new URL(endpoint);
  const client = target.protocol === 'https:' ? https : http;

  console.log(JSON.stringify({ endpoint, model, type, timeoutMs, textLength: text.length, configSource: fromDb ? 'database' : 'environment' }, null, 2));

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
      'Content-Length': Buffer.byteLength(body)
    }
  }, response => {
    let responseText = '';
    response.setEncoding('utf8');
    response.on('data', chunk => { responseText += chunk; });
    response.on('end', () => {
      console.log(`HTTP ${response.statusCode}`);
      try {
        const data = JSON.parse(responseText);
        console.log(JSON.stringify(data, null, 2));
      } catch (error) {
        console.log(responseText.slice(0, 4000));
      }
      process.exitCode = response.statusCode >= 200 && response.statusCode < 300 ? 0 : 1;
    });
  });

  request.on('timeout', () => {
    console.error(`请求超过 ${timeoutMs}ms 未返回`);
    request.destroy(new Error('AI接口请求超时'));
  });
  request.on('error', error => {
    console.error(JSON.stringify({ error: error.message || '未知网络错误', name: error.name || '', code: error.code || '', endpoint, model, type, timeoutMs }, null, 2));
    process.exitCode = 1;
  });
  request.write(body);
  request.end();
}

main().catch(error => {
  console.error(error.stack || error.message || error);
  process.exitCode = 1;
});
