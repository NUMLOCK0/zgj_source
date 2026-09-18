/**
 * 企业微信群机器人多分组、配额分流、轮询分发与二维码大图连发引擎
 */
const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { URL } = require('url');

/**
 * 校验当前时间是否落在给定的时间范围列表中（支持跨天如 18:00 - 09:00）
 */
function isTimeInRanges(timeRanges, nowDate = new Date()) {
  if (!Array.isArray(timeRanges) || timeRanges.length === 0) {
    return true; // 未配置时间段默认全天有效
  }

  const curHour = nowDate.getHours();
  const curMin = nowDate.getMinutes();
  const curTotalMinutes = curHour * 60 + curMin;

  for (const range of timeRanges) {
    if (!range || !range.start || !range.end) continue;
    const [sH, sM] = range.start.split(':').map(Number);
    const [eH, eM] = range.end.split(':').map(Number);
    if (Number.isNaN(sH) || Number.isNaN(sM) || Number.isNaN(eH) || Number.isNaN(eM)) continue;

    const startMin = sH * 60 + sM;
    const endMin = eH * 60 + eM;

    if (startMin <= endMin) {
      if (curTotalMinutes >= startMin && curTotalMinutes <= endMin) return true;
    } else {
      if (curTotalMinutes >= startMin || curTotalMinutes <= endMin) return true;
    }
  }

  return false;
}

/**
 * 发送请求至企微 Webhook
 */
function sendWecomWebhook(webhookUrl, payload) {
  return new Promise((resolve, reject) => {
    try {
      const urlObj = new URL(webhookUrl);
      const postData = JSON.stringify(payload);
      const isHttps = urlObj.protocol === 'https:';
      const client = isHttps ? https : http;

      const options = {
        hostname: urlObj.hostname,
        port: urlObj.port || (isHttps ? 443 : 80),
        path: urlObj.pathname + urlObj.search,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Content-Length': Buffer.byteLength(postData)
        },
        timeout: 8000
      };

      const req = client.request(options, (res) => {
        let rawData = '';
        res.setEncoding('utf8');
        res.on('data', (chunk) => { rawData += chunk; });
        res.on('end', () => {
          try {
            const parsed = JSON.parse(rawData);
            if (parsed.errcode === 0) {
              resolve(parsed);
            } else {
              reject(new Error(`企微接口返回错误 [${parsed.errcode}]: ${parsed.errmsg}`));
            }
          } catch (e) {
            reject(new Error(`解析企微响应失败: ${rawData.slice(0, 100)}`));
          }
        });
      });

      req.on('error', (err) => { reject(err); });
      req.on('timeout', () => {
        req.destroy();
        reject(new Error('请求企微机器人超时 (8s)'));
      });

      req.write(postData);
      req.end();
    } catch (err) {
      reject(err);
    }
  });
}

/**
 * 读取本地图片并计算 Base64 和 MD5
 */
function getLocalImageMedia(imageRelativePath, rootDir) {
  try {
    if (!imageRelativePath) return null;
    const fullPath = path.join(rootDir, imageRelativePath.replace(/^\//, ''));
    if (!fs.existsSync(fullPath)) return null;

    const fileBuf = fs.readFileSync(fullPath);
    const base64 = fileBuf.toString('base64');
    const md5 = crypto.createHash('md5').update(fileBuf).digest('hex');
    return { base64, md5 };
  } catch (err) {
    console.error('读取图片媒体失败:', err.message);
    return null;
  }
}

/**
 * 格式化职称客户推送 Markdown 卡片（彻底去姓名化，支持被加老师微信与新旧信息对比）
 */
function formatZcCustomerMarkdown(customer, creatorName, feedbackUrl = '') {
  const isResend = customer.isResend ? '【已重新核实·补发线索】' : '新职称线索登记通知';
  const lines = [
    `### 🎯 **${isResend}**`
  ];

  if (customer.phone) {
    lines.push(`> **最新电话**：<font color="info">${customer.phone}</font>`);
  }
  if (customer.wechat) {
    lines.push(`> **最新微信**：${customer.wechat}`);
  }
  if (customer.teacherWechat) {
    lines.push(`> **被加老师微信**：<font color="warning">${customer.teacherWechat}</font>`);
  }
  if (!customer.phone && !customer.wechat && !customer.teacherWechat) {
    lines.push(`> **联系方式**：<font color="comment">见下方微信二维码名片</font>`);
  }

  lines.push(`> **学历专业**：${[customer.degree, customer.major].filter(Boolean).join(' / ') || '未填'}`);
  lines.push(`> **申报级别**：<font color="warning">${customer.applyLevel || '未填'}</font>`);
  if (customer.reviewMajor) lines.push(`> **评审专业**：${customer.reviewMajor}`);
  if (customer.ssCity) lines.push(`> **社保/城市**：${customer.ssCity}`);
  lines.push(`> **分配店铺**：<font color="comment">${customer.assignedTo || '未分配'}</font>`);
  lines.push(`> **录入人员**：${creatorName || customer.createdBy || '系统'}`);
  lines.push(`> **登记时间**：${customer.date || new Date().toLocaleString('zh-CN')}`);

  // 如果是补发，醒目展示原错误信息对比
  if (customer.isResend && (customer.originalPhone || customer.originalWechat || customer.feedbackReason)) {
    lines.push(`\n> ---`);
    lines.push(`> 📋 **原异常信息记录 (供销售对照)**：`);
    if (customer.originalPhone) lines.push(`> • 原填电话：${customer.originalPhone}`);
    if (customer.originalWechat) lines.push(`> • 原填微信：${customer.originalWechat}`);
    if (customer.feedbackReason) lines.push(`> • 销售反馈：<font color="warning">${customer.feedbackReason}</font>`);
    if (customer.resendRemark) {
      lines.push(`> 💬 **客服核实说明**：<font color="info">${customer.resendRemark}</font>`);
    }
  } else if (customer.remarks) {
    lines.push(`> **补充备注**：${customer.remarks}`);
  }

  if (customer.qrCodeUrl) {
    lines.push(`> **微信名片大图**：<font color="comment">包含最新名片大图，请见下方 👇</font>`);
  }
  if (feedbackUrl && !customer.isResend) {
    lines.push(`\n[👉 联系不上/异常？点此一键上报反馈](${feedbackUrl})`);
  }

  return lines.join('\n');
}

/**
 * 格式化财税客户推送 Markdown 卡片（彻底去姓名化，支持被加老师微信与新旧信息对比）
 */
function formatFinanceCustomerMarkdown(customer, creatorName, feedbackUrl = '') {
  const isResend = customer.isResend ? '【已重新核实·补发线索】' : '新财税线索登记通知';
  const commissionTag = customer.orderNo ? '5元单' : '2元单';
  const lines = [
    `### 💼 **${isResend}**`,
    `> **业务类型**：<font color="warning">${customer.serviceType || '财税咨询'}</font>`,
    `> **订单编号**：${customer.orderNo ? `${customer.orderNo} (${commissionTag})` : `无订单号 (${commissionTag})`}`
  ];

  if (customer.companyName && customer.companyName !== '无' && customer.companyName !== '未填写') {
    lines.push(`> **公司名称**：${customer.companyName}`);
  }

  if (customer.phone) {
    lines.push(`> **最新电话**：<font color="info">${customer.phone}</font>`);
  }
  if (customer.wechat) {
    lines.push(`> **最新微信**：${customer.wechat}`);
  }
  if (customer.teacherWechat) {
    lines.push(`> **被加老师微信**：<font color="warning">${customer.teacherWechat}</font>`);
  }
  if (!customer.phone && !customer.wechat && !customer.teacherWechat) {
    lines.push(`> **联系方式**：<font color="comment">见下方微信二维码名片</font>`);
  }

  if (customer.city) lines.push(`> **所在城市**：${customer.city}`);
  lines.push(`> **分配店铺**：<font color="comment">${customer.assignedTo || '未分配'}</font>`);
  lines.push(`> **录入人员**：${creatorName || customer.createdBy || '系统'}`);
  lines.push(`> **登记时间**：${customer.date || new Date().toLocaleString('zh-CN')}`);

  // 如果是补发，醒目展示原错误信息对比
  if (customer.isResend && (customer.originalPhone || customer.originalWechat || customer.feedbackReason)) {
    lines.push(`\n> ---`);
    lines.push(`> 📋 **原异常信息记录 (供销售对照)**：`);
    if (customer.originalPhone) lines.push(`> • 原填电话：${customer.originalPhone}`);
    if (customer.originalWechat) lines.push(`> • 原填微信：${customer.originalWechat}`);
    if (customer.feedbackReason) lines.push(`> • 销售反馈：<font color="warning">${customer.feedbackReason}</font>`);
    if (customer.resendRemark) {
      lines.push(`> 💬 **客服核实说明**：<font color="info">${customer.resendRemark}</font>`);
    }
  } else if (customer.remarks && customer.remarks !== '无') {
    lines.push(`> **补充说明**：${customer.remarks}`);
  }

  if (customer.qrCodeUrl) {
    lines.push(`> **微信名片大图**：<font color="comment">包含最新名片大图，请见下方 👇</font>`);
  }
  if (feedbackUrl && !customer.isResend) {
    lines.push(`\n[👉 联系不上/异常？点此一键上报反馈](${feedbackUrl})`);
  }

  return lines.join('\n');
}

function localDateStr(d) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  return y + '-' + m + '-' + dd;
}

/**
 * 检查并自动跨日重置今日已发计数
 */
function checkDailyReset(group) {
  const todayStr = localDateStr(new Date());
  if (group.lastCountDate !== todayStr) {
    group.lastCountDate = todayStr;
    if (Array.isArray(group.bots)) {
      group.bots.forEach(b => {
        b.todayCount = 0;
      });
    }
  }
}

/**
 * 分组内机器人的选择调度算法（配额模式、轮询模式、全量广播模式）
 */
function selectBotsInGroup(group) {
  checkDailyReset(group);
  const activeBots = (group.bots || []).filter(b => b.enabled && b.webhookUrl);
  if (!activeBots.length) return [];

  const mode = group.dispatchMode || 'quota';

  if (mode === 'broadcast') {
    return activeBots;
  }

  if (mode === 'round_robin') {
    if (typeof group.lastSendIndex !== 'number') group.lastSendIndex = -1;
    const nextIndex = (group.lastSendIndex + 1) % activeBots.length;
    group.lastSendIndex = nextIndex;
    const selectedBot = activeBots[nextIndex];
    return [selectedBot];
  }

  // 配额分流模式 (Quota)
  for (const bot of activeBots) {
    const quota = Number(bot.dailyQuota) || 0;
    const current = Number(bot.todayCount) || 0;
    if (quota <= 0 || current < quota) {
      return [bot];
    }
  }

  return [activeBots[0]];
}

/**
 * 核心路由器：方案 B（Markdown 卡片 + 原生二维码大图双条连发）
 */
async function routeAndDispatchGroupMessage({ type, customer, creatorName, globalEnabled = true, groups = [], rootDir = '', baseUrl = '', onLog, onSave, targetBot = null, isDirect = false }) {
  if (!globalEnabled) {
    if (typeof onLog === 'function') onLog('[企微推送跳过] 全局推送总开关已关闭');
    return { matched: 0, sent: 0, errors: [] };
  }

  let botsToDispatch = [];

  if (isDirect && targetBot) {
    botsToDispatch.push({ bot: targetBot, group: { name: '定向重发' } });
  } else {
    if (!Array.isArray(groups) || groups.length === 0) return { matched: 0, sent: 0, errors: [] };

    const now = new Date();
    const matchedGroups = [];

    for (const g of groups) {
      if (!g.enabled) continue;
      if (g.businessType && g.businessType !== 'all' && g.businessType !== type) continue;

      if (Array.isArray(g.stores) && g.stores.length > 0 && !g.stores.includes('ALL')) {
        const assigned = String(customer.assignedTo || '').trim();
        if (!assigned || !g.stores.includes(assigned)) continue;
      }

      if (Array.isArray(g.timeRanges) && g.timeRanges.length > 0) {
        if (!isTimeInRanges(g.timeRanges, now)) continue;
      }

      matchedGroups.push(g);
    }

    if (matchedGroups.length === 0) return { matched: 0, sent: 0, errors: [] };

    matchedGroups.forEach(g => {
      const selected = selectBotsInGroup(g);
      selected.forEach(bot => {
        botsToDispatch.push({ bot, group: g });
      });
    });
  }

  if (botsToDispatch.length === 0) return { matched: 0, sent: 0, errors: [] };

  // 1. 准备反馈 URL (直接使用 /feedback 友好免登录路径)
  const feedbackBase = (baseUrl || 'http://localhost:3002').replace(/\/$/, '');
  const feedbackUrl = `${feedbackBase}/feedback?type=${type}&id=${customer.id}`;

  // 2. 组装 Markdown 消息体
  const markdownText = type === 'zc'
    ? formatZcCustomerMarkdown(customer, creatorName, feedbackUrl)
    : formatFinanceCustomerMarkdown(customer, creatorName, feedbackUrl);

  const textPayload = {
    msgtype: 'markdown',
    markdown: { content: markdownText }
  };

  // 3. 准备二维码图片 Payload（如果有图片）
  let imagePayload = null;
  if (customer.qrCodeUrl && rootDir) {
    const media = getLocalImageMedia(customer.qrCodeUrl, rootDir);
    if (media) {
      imagePayload = {
        msgtype: 'image',
        image: {
          base64: media.base64,
          md5: media.md5
        }
      };
    }
  }

  // 4. 并发向目标机器人发送（方案 B: 先发卡片，后发原生大图）
  let sent = 0;
  const errors = [];

  await Promise.allSettled(
    botsToDispatch.map(async ({ bot, group }) => {
      try {
        // 第一条：Markdown 卡片
        await sendWecomWebhook(bot.webhookUrl, textPayload);
        bot.todayCount = (Number(bot.todayCount) || 0) + 1;
        sent++;

        // 记录当初分发成功的机器人与分组，供异常重发时原路推回
        customer.dispatchedBotId = bot.id;
        customer.dispatchedBotWebhook = bot.webhookUrl;
        customer.dispatchedGroupName = group.name;

        // 第二条：如果包含二维码大图，紧接着推送大图
        if (imagePayload) {
          try {
            await sendWecomWebhook(bot.webhookUrl, imagePayload);
            if (typeof onLog === 'function') onLog(`[企微二维码发送成功] 机器人: ${bot.name}`);
          } catch (imgErr) {
            console.error('发送二维码大图异常:', imgErr.message);
          }
        }

        if (typeof onLog === 'function') {
          onLog(`[企微推送成功] 分组: ${group.name}, 机器人: ${bot.name} (今日已发: ${bot.todayCount}/${bot.dailyQuota || '无限制'})`);
        }
      } catch (err) {
        errors.push({ groupName: group.name, botName: bot.name, error: err.message });
        if (typeof onLog === 'function') {
          onLog(`[企微推送失败] 分组: ${group.name}, 机器人: ${bot.name}, 错误: ${err.message}`);
        }
      }
    })
  );

  if (typeof onSave === 'function') {
    try { onSave(); } catch (e) {}
  }

  return { matched: botsToDispatch.length, sent, errors };
}

module.exports = {
  isTimeInRanges,
  sendWecomWebhook,
  getLocalImageMedia,
  formatZcCustomerMarkdown,
  formatFinanceCustomerMarkdown,
  checkDailyReset,
  selectBotsInGroup,
  routeAndDispatchGroupMessage
};
