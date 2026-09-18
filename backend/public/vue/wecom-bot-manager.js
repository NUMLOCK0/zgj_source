// 企微机器人分组与配额分发配置管理面板 (完整纯净版)
(function() {
  const style = document.createElement('style');
  style.id = 'wecom-bot-groups-style';
  style.textContent = `
    /* 严格限定面板宽度与边距，杜绝超出或被左侧侧边栏遮挡 */
    #wecom-bot-group-manager-card.wecom-group-card {
      background: #ffffff;
      border-radius: 12px;
      border: 1px solid #e2e8f0;
      box-shadow: 0 2px 8px rgba(15, 23, 42, 0.04);
      margin-top: 14px;
      margin-bottom: 24px;
      overflow: hidden;
      width: 100% !important;
      max-width: 100% !important;
      min-width: 0 !important;
      box-sizing: border-box !important;
      position: relative !important;
      clear: both;
    }
    .wecom-group-header {
      padding: 12px 16px;
      border-bottom: 1px solid #f1f5f9;
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: #f8fafc;
      flex-wrap: wrap;
      gap: 10px;
      box-sizing: border-box;
      width: 100%;
    }
    .wecom-header-title {
      font-size: 15px;
      font-weight: 700;
      color: #0f172a;
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .wecom-header-desc {
      font-size: 12px;
      color: #64748b;
      margin-top: 3px;
    }
    .wecom-header-controls {
      display: flex;
      align-items: center;
      gap: 8px;
      flex-wrap: wrap;
    }
    .wecom-global-toggle {
      display: flex;
      align-items: center;
      gap: 6px;
      font-size: 12px;
      font-weight: 600;
      color: #334155;
      background: #ffffff;
      padding: 4px 8px;
      border-radius: 6px;
      border: 1px solid #e2e8f0;
    }
    .wecom-btn-create-group {
      background: #0ea5e9;
      color: #fff;
      border: none;
      padding: 6px 12px;
      border-radius: 6px;
      font-size: 12px;
      font-weight: 600;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 6px;
      transition: background 0.2s;
    }
    .wecom-btn-create-group:hover { background: #0284c7; }

    .wecom-group-body {
      padding: 14px;
      display: flex;
      flex-direction: column;
      gap: 14px;
      box-sizing: border-box;
      width: 100%;
    }
    .wecom-single-group {
      border: 1px solid #e2e8f0;
      border-radius: 10px;
      background: #ffffff;
      box-shadow: 0 1px 3px rgba(0,0,0,0.02);
      overflow: hidden;
      box-sizing: border-box;
      width: 100%;
    }
    .wecom-sg-head {
      padding: 10px 14px;
      background: #f8fafc;
      border-bottom: 1px solid #f1f5f9;
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 8px;
      box-sizing: border-box;
      width: 100%;
    }
    .wecom-sg-title-box {
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .wecom-sg-name {
      font-size: 14px;
      font-weight: 700;
      color: #1e293b;
    }
    .wecom-badge {
      font-size: 11px;
      padding: 2px 7px;
      border-radius: 5px;
      font-weight: 600;
    }
    .wecom-badge.zc { background: #dcfce7; color: #15803d; }
    .wecom-badge.finance { background: #fef3c7; color: #b45309; }
    .wecom-badge.all { background: #e0f2fe; color: #0369a1; }
    .wecom-badge.mode { background: #f3e8ff; color: #7e22ce; }

    .wecom-sg-actions {
      display: flex;
      align-items: center;
      gap: 6px;
      flex-wrap: wrap;
    }
    .wecom-btn-xs {
      background: #f8fafc;
      border: 1px solid #cbd5e1;
      color: #475569;
      padding: 3px 7px;
      border-radius: 5px;
      font-size: 11.5px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.15s;
    }
    .wecom-btn-xs:hover { background: #e2e8f0; color: #1e293b; }
    .wecom-btn-xs.del { color: #ef4444; border-color: #fecaca; }
    .wecom-btn-xs.del:hover { background: #fef2f2; }
    .wecom-btn-xs.test { background: #eff6ff; color: #2563eb; border-color: #bfdbfe; }
    .wecom-btn-xs.test:hover { background: #dbeafe; }

    .wecom-sg-content {
      padding: 12px 14px;
      box-sizing: border-box;
      width: 100%;
    }
    .wecom-sg-meta {
      display: flex;
      gap: 14px;
      font-size: 12px;
      color: #64748b;
      margin-bottom: 10px;
      padding-bottom: 6px;
      border-bottom: 1px dashed #e2e8f0;
      flex-wrap: wrap;
      box-sizing: border-box;
    }
    .wecom-sg-meta span b { color: #334155; }

    .wecom-bot-subgrid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
      gap: 10px;
      box-sizing: border-box;
      width: 100%;
    }
    .wecom-subbot-item {
      border: 1px solid #e2e8f0;
      border-radius: 8px;
      padding: 10px 12px;
      background: #fafafa;
      position: relative;
      box-sizing: border-box;
      min-width: 0;
    }
    .wecom-subbot-top {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 6px;
    }
    .wecom-subbot-name {
      font-size: 13.5px;
      font-weight: 700;
      color: #1e293b;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      max-width: 150px;
    }
    
    .wecom-progress-wrap {
      margin: 8px 0;
    }
    .wecom-progress-info {
      display: flex;
      justify-content: space-between;
      font-size: 11.5px;
      margin-bottom: 4px;
    }
    .wecom-progress-bar {
      height: 6px;
      background: #e2e8f0;
      border-radius: 3px;
      overflow: hidden;
    }
    .wecom-progress-fill {
      height: 100%;
      background: #0ea5e9;
      border-radius: 3px;
      transition: width 0.3s;
    }
    .wecom-progress-fill.full { background: #10b981; }

    .wecom-subbot-actions {
      display: flex;
      justify-content: flex-end;
      gap: 6px;
      border-top: 1px solid #f1f5f9;
      padding-top: 6px;
      margin-top: 4px;
    }

    /* Switch开关组件 */
    .wecom-switch {
      position: relative;
      display: inline-block;
      width: 32px;
      height: 18px;
    }
    .wecom-switch input { opacity: 0; width: 0; height: 0; }
    .wecom-slider {
      position: absolute; cursor: pointer; top: 0; left: 0; right: 0; bottom: 0;
      background-color: #cbd5e1;
      transition: .2s;
      border-radius: 18px;
    }
    .wecom-slider:before {
      position: absolute; content: ""; height: 14px; width: 14px; left: 2px; bottom: 2px;
      background-color: white;
      transition: .2s;
      border-radius: 50%;
    }
    input:checked + .wecom-slider { background-color: #0ea5e9; }
    input:checked + .wecom-slider:before { transform: translateX(14px); }

    /* Modal 弹窗 */
    .wecom-modal-mask {
      position: fixed;
      top: 0; left: 0; right: 0; bottom: 0;
      background: rgba(15, 23, 42, 0.45);
      backdrop-filter: blur(2px);
      z-index: 999999;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 16px;
      box-sizing: border-box;
    }
    .wecom-modal {
      background: #fff;
      border-radius: 12px;
      width: 100%;
      max-width: 520px;
      max-height: 90vh;
      overflow-y: auto;
      box-shadow: 0 10px 25px rgba(0,0,0,0.1);
      display: flex;
      flex-direction: column;
      box-sizing: border-box;
    }
    .wecom-modal-head {
      padding: 16px 20px;
      border-bottom: 1px solid #f1f5f9;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .wecom-modal-head h4 { margin: 0; font-size: 15.5px; font-weight: 700; color: #0f172a; }
    .wecom-close-btn { background: none; border: none; font-size: 20px; color: #94a3b8; cursor: pointer; }
    .wecom-close-btn:hover { color: #475569; }

    .wecom-form-item {
      padding: 10px 20px;
      display: flex;
      flex-direction: column;
      gap: 6px;
      box-sizing: border-box;
    }
    .wecom-form-item label {
      font-size: 12.5px;
      font-weight: 600;
      color: #334155;
    }
    .wecom-input, .wecom-select {
      height: 34px;
      padding: 0 10px;
      border: 1px solid #cbd5e1;
      border-radius: 6px;
      font-size: 12.5px;
      outline: none;
      box-sizing: border-box;
    }
    .wecom-input:focus, .wecom-select:focus { border-color: #0ea5e9; }

    .wecom-modal-foot {
      padding: 14px 20px;
      border-top: 1px solid #f1f5f9;
      display: flex;
      justify-content: flex-end;
      gap: 10px;
      background: #fafafa;
      border-radius: 0 0 12px 12px;
    }
    .wecom-btn-cancel {
      padding: 6px 14px;
      background: #fff;
      border: 1px solid #cbd5e1;
      border-radius: 6px;
      font-size: 12.5px;
      cursor: pointer;
      color: #475569;
    }
    .wecom-btn-primary {
      padding: 6px 16px;
      background: #0ea5e9;
      border: none;
      border-radius: 6px;
      font-size: 12.5px;
      font-weight: 600;
      color: #fff;
      cursor: pointer;
    }
    .wecom-btn-primary:hover { background: #0284c7; }
    .wecom-empty-tip { text-align: center; padding: 30px 0; color: #94a3b8; font-size: 13px; }
  `;
  document.head.appendChild(style);

  let state = {
    config: { globalEnabled: true, groups: [] },
    stores: [],
    financeStores: []
  };

  async function fetchConfig() {
    try {
      const res = await fetch('/api/wecom-bot-groups');
      if (res.ok) {
        const data = await res.json();
        state.config = data.config || { globalEnabled: true, groups: [] };
        state.stores = data.stores || [];
        state.financeStores = data.financeStores || [];
      }
    } catch (e) {
      console.error('获取企微机器人分组失败:', e);
    }
  }

  function isSyncSettingsPage() {
    const hash = (window.location.hash || '').toLowerCase();
    const path = (window.location.pathname || '').toLowerCase();
    
    // 严格限制：必须处于 /settings/sync 路由下
    const isSyncRoute = hash.includes('/settings/sync') || path.includes('/settings/sync') || hash.includes('settings-sync');
    
    // 必须存在同步设置专属组件并且其处于可见状态
    const syncScopeCard = document.querySelector('.sync-scope-card, .sync-connection-card, .sync-settings');
    const isSyncCardVisible = !!(syncScopeCard && (syncScopeCard.offsetWidth > 0 || syncScopeCard.offsetHeight > 0 || syncScopeCard.getClientRects().length > 0));
    
    // 如果处于非设置路由（如 dashboard, workbench, customer, finance, operation 等）或其它设置子路由，坚决不允许挂载
    const isOtherRoute = hash.includes('/dashboard') || hash.includes('/workbench') || 
                         hash.includes('/customer') || hash.includes('/finance') || 
                         hash.includes('/operation') || hash.includes('/punch') ||
                         hash.includes('settings-profile') || hash.includes('settings-accounts') || 
                         hash.includes('settings-customer-config') || hash.includes('settings-finance-config') || 
                         hash.includes('settings-audit') || hash.includes('settings-face-enroll');

    if (isOtherRoute) {
      return false;
    }

    return isSyncRoute && isSyncCardVisible;
  }

  function getSettingsMountTarget() {
    // 挂载在同步设置区域内（例如 sync-scope-card 之后或 sync-settings 容器底部）
    const scopeCard = document.querySelector('.sync-scope-card');
    if (scopeCard && scopeCard.parentNode && scopeCard.offsetHeight > 0) {
      return { container: scopeCard.parentNode, refNode: scopeCard.nextSibling };
    }
    const syncCard = document.querySelector('.sync-connection-card');
    if (syncCard && syncCard.parentNode && syncCard.offsetHeight > 0) {
      return { container: syncCard.parentNode, refNode: syncCard.nextSibling };
    }
    const syncSettings = document.querySelector('.sync-settings');
    if (syncSettings && syncSettings.offsetHeight > 0) {
      return { container: syncSettings, refNode: null };
    }
    return null;
  }

  function renderGroupPanel() {
    if (!isSyncSettingsPage()) {
      const existing = document.getElementById('wecom-bot-group-manager-card');
      if (existing) existing.remove();
      return;
    }

    const mountInfo = getSettingsMountTarget();
    if (!mountInfo || !mountInfo.container) return;

    let container = document.getElementById('wecom-bot-group-manager-card');
    if (!container) {
      container = document.createElement('div');
      container.id = 'wecom-bot-group-manager-card';
      container.className = 'wecom-group-card';
      if (mountInfo.refNode) {
        mountInfo.container.insertBefore(container, mountInfo.refNode);
      } else {
        mountInfo.container.appendChild(container);
      }
    }

    const groups = state.config.groups || [];
    const fullLeaderLink = window.location.origin + '/bot-dispatch';

    const groupsHtml = groups.length === 0
      ? `<div class="wecom-empty-tip">暂未创建机器人分组，点击右上角“创建分组”配置您的销售群分流方案</div>`
      : groups.map(g => {
          const modeMap = { quota: '按配额分流 (满额切下个)', round_robin: '轮询分流 (一人一条)', broadcast: '全量广播 (组内全发)' };
          const bizMap = { zc: '职称业务', finance: '财税业务', all: '全部业务' };
          const bots = g.bots || [];

          return `
            <div class="wecom-single-group">
              <div class="wecom-sg-head">
                <div class="wecom-sg-title-box">
                  <span class="wecom-sg-name">${escapeHtml(g.name)}</span>
                  <span class="wecom-badge ${g.businessType}">${bizMap[g.businessType] || '全部'}</span>
                  <span class="wecom-badge mode">${modeMap[g.dispatchMode] || '配额分流'}</span>
                </div>
                <div class="wecom-sg-actions">
                  <label class="wecom-switch" title="分组开关">
                    <input type="checkbox" data-group-toggle="${g.id}" ${g.enabled ? 'checked' : ''}>
                    <span class="wecom-slider"></span>
                  </label>
                  <button class="wecom-btn-xs" data-group-action="add-bot" data-group-id="${g.id}">添加群机器人</button>
                  <button class="wecom-btn-xs" data-group-action="reset-count" data-group-id="${g.id}">清零计数</button>
                  <button class="wecom-btn-xs" data-group-action="edit-group" data-group-id="${g.id}">编辑分组</button>
                  <button class="wecom-btn-xs del" data-group-action="del-group" data-group-id="${g.id}">删除</button>
                </div>
              </div>
              <div class="wecom-sg-content">
                <div class="wecom-sg-meta">
                  <span><b>适用店铺:</b> ${g.stores && g.stores.length ? g.stores.join('、') : '全部店铺通用'}</span>
                  <span><b>班次时段:</b> ${g.timeRanges && g.timeRanges.length ? g.timeRanges.map(t => `${t.start}~${t.end}`).join(' | ') : '全天 (24小时)'}</span>
                </div>

                ${bots.length === 0 ? `<div style="text-align:center; padding:16px 0; color:#94a3b8; font-size:12.5px;">该分组下暂无机器人，请点击上方“添加群机器人”</div>` : `
                  <div class="wecom-bot-subgrid">
                    ${bots.map(b => {
                      const quota = Number(b.dailyQuota) || 0;
                      const count = Number(b.todayCount) || 0;
                      const percent = quota > 0 ? Math.min(100, Math.round(count / quota * 100)) : 100;
                      const isFull = quota > 0 && count >= quota;

                      return `
                        <div class="wecom-subbot-item">
                          <div class="wecom-subbot-top">
                            <span class="wecom-subbot-name">${escapeHtml(b.name)}</span>
                            <label class="wecom-switch" title="单机器人开关">
                              <input type="checkbox" data-bot-toggle="${g.id}_${b.id}" ${b.enabled ? 'checked' : ''}>
                              <span class="wecom-slider"></span>
                            </label>
                          </div>

                          <div class="wecom-progress-wrap">
                            <div class="wecom-progress-info">
                              <span style="color:#64748b;">今日分发进度</span>
                              <span style="font-weight:700; color:${isFull ? '#10b981' : '#0ea5e9'};">
                                ${count} / ${quota > 0 ? quota + ' 条' : '无限制'}
                              </span>
                            </div>
                            <div class="wecom-progress-bar">
                              <div class="wecom-progress-fill ${isFull ? 'full' : ''}" style="width: ${percent}%;"></div>
                            </div>
                          </div>

                          <div class="wecom-subbot-actions">
                            <button class="wecom-btn-xs test" data-bot-action="test" data-group-id="${g.id}" data-bot-id="${b.id}">测试连通</button>
                            <button class="wecom-btn-xs" data-bot-action="edit" data-group-id="${g.id}" data-bot-id="${b.id}">编辑配额</button>
                            <button class="wecom-btn-xs del" data-bot-action="del" data-group-id="${g.id}" data-bot-id="${b.id}">移除</button>
                          </div>
                        </div>
                      `;
                    }).join('')}
                  </div>
                `}
              </div>
            </div>
          `;
        }).join('');

    container.innerHTML = `
      <div class="wecom-group-header">
        <div>
          <div class="wecom-header-title">企微销售群机器人分组与配额分发</div>
          <div class="wecom-header-desc">按业务线、班次时段、店铺分组，支持设置每个销售群的每日分发配额（如A群满50条自动切B群）</div>
        </div>
        <div class="wecom-header-controls">
          <div style="display:flex; align-items:center; background:#fff; border:1px solid #cbd5e1; border-radius:8px; padding:2px 8px; gap:6px;">
            <span style="font-size:12px; font-weight:700; color:#0369a1; white-space:nowrap;">主管调度台:</span>
            <input type="text" id="leader-link-display-input" readonly value="${fullLeaderLink}" style="width:170px; height:24px; border:none; background:transparent; font-size:12px; color:#475569; outline:none; font-family:monospace;" />
            <button type="button" id="btn-copy-leader-link" style="background:#0ea5e9; color:#fff; border:none; border-radius:5px; padding:3px 8px; font-size:11.5px; font-weight:600; cursor:pointer;">复制链接</button>
          </div>
          <div class="wecom-global-toggle">
            <span>企微推送总开关</span>
            <label class="wecom-switch">
              <input type="checkbox" id="wecom-global-switch" ${state.config.globalEnabled !== false ? 'checked' : ''}>
              <span class="wecom-slider"></span>
            </label>
          </div>
          <button class="wecom-btn-create-group" id="btn-create-group">创建机器人分组</button>
        </div>
      </div>
      <div class="wecom-group-body">
        ${groupsHtml}
      </div>
    `;

    bindEvents(container);
  }

  function bindEvents(container) {
    // 复制主管链接
    container.querySelector('#btn-copy-leader-link')?.addEventListener('click', () => {
      const fullLink = window.location.origin + '/bot-dispatch';
      const linkInput = container.querySelector('#leader-link-display-input');
      if (linkInput) {
        linkInput.select();
        linkInput.setSelectionRange(0, 99999);
      }

      let copied = false;
      try {
        copied = document.execCommand('copy');
      } catch(e) {}

      if (copied) {
        alert('主管免登调度台链接已成功复制：\\n' + fullLink + '\\n\\n发给销售主管即可在手机随时排班和调整配额！');
      } else {
        prompt('请按 Ctrl+C 复制以下主管调度链接：', fullLink);
      }
    });

    // 全局总开关
    container.querySelector('#wecom-global-switch')?.addEventListener('change', async (e) => {
      const enabled = e.target.checked;
      await fetch('/api/wecom-bot-groups/toggle-global', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ enabled })
      });
      state.config.globalEnabled = enabled;
    });

    // 创建分组按钮
    container.querySelector('#btn-create-group')?.addEventListener('click', () => openGroupModal());

    // 分组开关
    container.querySelectorAll('[data-group-toggle]').forEach(chk => {
      chk.addEventListener('change', async (e) => {
        const id = parseInt(e.target.dataset.groupToggle);
        const enabled = e.target.checked;
        await fetch(`/api/wecom-bot-groups/${id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ enabled })
        });
      });
    });

    // 单个机器人开关
    container.querySelectorAll('[data-bot-toggle]').forEach(chk => {
      chk.addEventListener('change', async (e) => {
        const [groupId, botId] = e.target.dataset.botToggle.split('_').map(Number);
        const enabled = e.target.checked;
        await fetch(`/api/wecom-bot-groups/${groupId}/bots/${botId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ enabled })
        });
      });
    });

    // 分组操作按钮
    container.querySelectorAll('[data-group-action]').forEach(btn => {
      btn.addEventListener('click', () => {
        const action = btn.dataset.groupAction;
        const groupId = parseInt(btn.dataset.groupId);
        const group = (state.config.groups || []).find(g => g.id === groupId);

        if (action === 'add-bot') openBotModal(groupId);
        if (action === 'edit-group') openGroupModal(group);
        if (action === 'del-group') deleteGroup(groupId, group?.name);
        if (action === 'reset-count') resetGroupCount(groupId, group?.name);
      });
    });

    // 机器人操作按钮
    container.querySelectorAll('[data-bot-action]').forEach(btn => {
      btn.addEventListener('click', () => {
        const action = btn.dataset.botAction;
        const groupId = parseInt(btn.dataset.groupId);
        const botId = parseInt(btn.dataset.botId);
        const group = (state.config.groups || []).find(g => g.id === groupId);
        const bot = (group?.bots || []).find(b => b.id === botId);

        if (action === 'test') testBot(groupId, botId);
        if (action === 'edit') openBotModal(groupId, bot);
        if (action === 'del') deleteBot(groupId, botId, bot?.name);
      });
    });
  }

  function escapeHtml(str) {
    return String(str || '').replace(/[&<>"']/g, m => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[m]);
  }

  async function testBot(groupId, botId) {
    try {
      const res = await fetch(`/api/wecom-bot-groups/${groupId}/bots/${botId}/test`, { method: 'POST' });
      const data = await res.json();
      if (res.ok && data.success) {
        alert('测试消息已成功发送至该企微群！');
      } else {
        alert('发送失败: ' + (data.error || '未知错误'));
      }
    } catch (e) {
      alert('网络请求异常: ' + e.message);
    }
  }

  async function deleteGroup(id, name) {
    if (!confirm(`确定删除分组 "${name}" 及其组内的所有机器人吗？`)) return;
    try {
      const res = await fetch(`/api/wecom-bot-groups/${id}`, { method: 'DELETE' });
      if (res.ok) {
        await fetchConfig();
        renderGroupPanel();
      }
    } catch (e) { alert('删除失败: ' + e.message); }
  }

  async function resetGroupCount(id, name) {
    if (!confirm(`确定将分组 "${name}" 今日已发计数全部清零吗？`)) return;
    try {
      const res = await fetch(`/api/wecom-bot-groups/${id}/reset-counts`, { method: 'POST' });
      if (res.ok) {
        await fetchConfig();
        renderGroupPanel();
      }
    } catch (e) { alert('操作失败: ' + e.message); }
  }

  async function deleteBot(groupId, botId, name) {
    if (!confirm(`确定从该分组中移除机器人 "${name}" 吗？`)) return;
    try {
      const res = await fetch(`/api/wecom-bot-groups/${groupId}/bots/${botId}`, { method: 'DELETE' });
      if (res.ok) {
        await fetchConfig();
        renderGroupPanel();
      }
    } catch (e) { alert('删除失败: ' + e.message); }
  }

  // 分组编辑/添加弹窗
  function openGroupModal(group = null) {
    const isEdit = !!group;
    const allStores = Array.from(new Set([...state.stores, ...state.financeStores]));
    let selectedStores = new Set(group?.stores || []);

    const modal = document.createElement('div');
    modal.className = 'wecom-modal-mask';
    modal.innerHTML = `
      <div class="wecom-modal">
        <div class="wecom-modal-head">
          <h4>${isEdit ? '编辑机器人分组' : '新建机器人分组'}</h4>
          <button class="wecom-close-btn">&times;</button>
        </div>

        <div class="wecom-form-item">
          <label>分组名称 <span style="color:red">*</span></label>
          <input type="text" id="g-name" class="wecom-input" placeholder="例如：职称白班销售分流组" value="${escapeHtml(group?.name || '')}" />
        </div>

        <div class="wecom-form-item">
          <label>分发策略 / 规则</label>
          <select id="g-mode" class="wecom-select">
            <option value="quota" ${group?.dispatchMode === 'quota' ? 'selected' : ''}>按数量配额分流 (A群发满50条自动切B群)</option>
            <option value="round_robin" ${group?.dispatchMode === 'round_robin' ? 'selected' : ''}>按比例轮询分发 (A群一条、B群一条交替)</option>
            <option value="broadcast" ${group?.dispatchMode === 'broadcast' ? 'selected' : ''}>全量广播模式 (组内所有群同时收到)</option>
          </select>
        </div>

        <div class="wecom-form-item">
          <label>关联业务类型</label>
          <select id="g-biz" class="wecom-select">
            <option value="all" ${group?.businessType === 'all' ? 'selected' : ''}>全部业务 (职称 + 财税通用)</option>
            <option value="zc" ${group?.businessType === 'zc' ? 'selected' : ''}>仅职称业务客户</option>
            <option value="finance" ${group?.businessType === 'finance' ? 'selected' : ''}>仅财税业务客户</option>
          </select>
        </div>

        <div class="wecom-form-item">
          <label>适用店铺 (不选则全部店铺通用)</label>
          <div class="wecom-checkbox-group" id="g-store-chips">
            ${allStores.map(s => `
              <div class="wecom-checkbox-chip ${selectedStores.has(s) ? 'active' : ''}" data-store="${escapeHtml(s)}">${escapeHtml(s)}</div>
            `).join('')}
          </div>
        </div>

        <div class="wecom-form-item">
          <label>班次与生效时段</label>
          <select id="g-shift" class="wecom-select" style="margin-bottom: 8px;">
            <option value="all">全天 24 小时生效</option>
            <option value="day">白班时段 (09:00 - 18:00)</option>
            <option value="night">晚班/夜班时段 (18:00 - 次日09:00)</option>
            <option value="custom">自定义时间段</option>
          </select>
          <div id="g-custom-time" style="display: none; gap: 8px; align-items: center;">
            <input type="time" id="g-time-start" class="wecom-input" value="${group?.timeRanges?.[0]?.start || '09:00'}" />
            <span>至</span>
            <input type="time" id="g-time-end" class="wecom-input" value="${group?.timeRanges?.[0]?.end || '18:00'}" />
          </div>
        </div>

        <div class="wecom-modal-foot">
          <button class="wecom-btn-cancel">取消</button>
          <button class="wecom-btn-primary" id="btn-save-group">保存分组</button>
        </div>
      </div>
    `;

    document.body.appendChild(modal);

    modal.querySelectorAll('#g-store-chips .wecom-checkbox-chip').forEach(c => {
      c.addEventListener('click', () => {
        const s = c.dataset.store;
        if (selectedStores.has(s)) { selectedStores.delete(s); c.classList.remove('active'); }
        else { selectedStores.add(s); c.classList.add('active'); }
      });
    });

    const shiftSel = modal.querySelector('#g-shift');
    const customTime = modal.querySelector('#g-custom-time');
    const startIn = modal.querySelector('#g-time-start');
    const endIn = modal.querySelector('#g-time-end');

    if (group?.timeRanges?.length) {
      const tr = group.timeRanges[0];
      if (tr.start === '09:00' && tr.end === '18:00') shiftSel.value = 'day';
      else if (tr.start === '18:00' && tr.end === '09:00') shiftSel.value = 'night';
      else { shiftSel.value = 'custom'; customTime.style.display = 'flex'; }
    }

    shiftSel.addEventListener('change', () => {
      const val = shiftSel.value;
      if (val === 'day') { customTime.style.display = 'none'; startIn.value = '09:00'; endIn.value = '18:00'; }
      else if (val === 'night') { customTime.style.display = 'none'; startIn.value = '18:00'; endIn.value = '09:00'; }
      else if (val === 'custom') { customTime.style.display = 'flex'; }
      else { customTime.style.display = 'none'; }
    });

    modal.querySelector('.wecom-close-btn').addEventListener('click', () => modal.remove());
    modal.querySelector('.wecom-btn-cancel').addEventListener('click', () => modal.remove());

    const saveBtn = modal.querySelector('#btn-save-group');
    saveBtn.addEventListener('click', async () => {
      const name = modal.querySelector('#g-name').value.trim();
      const dispatchMode = modal.querySelector('#g-mode').value;
      const businessType = modal.querySelector('#g-biz').value;

      if (!name) return alert('请填写分组名称');

      let timeRanges = [];
      const shift = shiftSel.value;
      if (shift === 'day') timeRanges = [{ start: '09:00', end: '18:00' }];
      else if (shift === 'night') timeRanges = [{ start: '18:00', end: '09:00' }];
      else if (shift === 'custom') timeRanges = [{ start: startIn.value, end: endIn.value }];

      const payload = {
        name,
        dispatchMode,
        businessType,
        stores: Array.from(selectedStores),
        timeRanges
      };

      saveBtn.disabled = true;
      const origText = saveBtn.textContent;
      saveBtn.textContent = '保存中...';

      try {
        const url = isEdit ? `/api/wecom-bot-groups/${group.id}` : '/api/wecom-bot-groups';
        const method = isEdit ? 'PUT' : 'POST';
        const res = await fetch(url, {
          method,
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        if (res.ok) {
          modal.remove();
          await fetchConfig();
          renderGroupPanel();
        } else {
          const err = await res.json();
          alert('保存失败: ' + (err.error || '未知错误'));
          saveBtn.disabled = false;
          saveBtn.textContent = origText;
        }
      } catch (e) {
        alert('请求异常: ' + e.message);
        saveBtn.disabled = false;
        saveBtn.textContent = origText;
      }
    });
  }

  // 组内机器人添加/编辑弹窗
  function openBotModal(groupId, bot = null) {
    const isEdit = !!bot;
    const modal = document.createElement('div');
    modal.className = 'wecom-modal-mask';
    modal.innerHTML = `
      <div class="wecom-modal">
        <div class="wecom-modal-head">
          <h4>${isEdit ? '编辑群机器人配置与配额' : '添加群机器人至该组'}</h4>
          <button class="wecom-close-btn">&times;</button>
        </div>

        <div class="wecom-form-item">
          <label>机器人名称 <span style="color:red">*</span></label>
          <input type="text" id="b-name" class="wecom-input" placeholder="例如：销售1群助手" value="${escapeHtml(bot?.name || '')}" />
        </div>

        <div class="wecom-form-item">
          <label>企业微信群 Webhook 地址 <span style="color:red">*</span></label>
          <input type="text" id="b-webhook" class="wecom-input" placeholder="https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key=..." value="${escapeHtml(bot?.webhookUrl || '')}" />
        </div>

        <div class="wecom-form-item">
          <label>每日分发配额 (条) <span style="font-weight:normal; color:#64748b;">(0 表示不设上限)</span></label>
          <input type="number" id="b-quota" class="wecom-input" min="0" placeholder="例如：50" value="${bot?.dailyQuota !== undefined ? bot.dailyQuota : 50}" />
        </div>

        ${isEdit ? `
          <div class="wecom-form-item">
            <label>今日已分发数量</label>
            <input type="number" id="b-count" class="wecom-input" min="0" value="${bot?.todayCount || 0}" />
          </div>
        ` : ''}

        <div class="wecom-modal-foot">
          <button class="wecom-btn-cancel">取消</button>
          <button class="wecom-btn-primary" id="btn-save-bot">保存机器人</button>
        </div>
      </div>
    `;

    document.body.appendChild(modal);
    modal.querySelector('.wecom-close-btn').addEventListener('click', () => modal.remove());
    modal.querySelector('.wecom-btn-cancel').addEventListener('click', () => modal.remove());

    const saveBotBtn = modal.querySelector('#btn-save-bot');
    saveBotBtn.addEventListener('click', async () => {
      const name = modal.querySelector('#b-name').value.trim();
      const webhookUrl = modal.querySelector('#b-webhook').value.trim();
      const dailyQuota = parseInt(modal.querySelector('#b-quota').value) || 0;

      if (!name) return alert('请填写机器人名称');
      if (!webhookUrl || !webhookUrl.startsWith('http')) return alert('请填写正确的 Webhook 地址');

      const payload = { name, webhookUrl, dailyQuota };
      if (isEdit) {
        payload.todayCount = parseInt(modal.querySelector('#b-count')?.value) || 0;
      }

      saveBotBtn.disabled = true;
      const origText = saveBotBtn.textContent;
      saveBotBtn.textContent = '保存中...';

      try {
        const url = isEdit ? `/api/wecom-bot-groups/${groupId}/bots/${bot.id}` : `/api/wecom-bot-groups/${groupId}/bots`;
        const method = isEdit ? 'PUT' : 'POST';
        const res = await fetch(url, {
          method,
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        if (res.ok) {
          modal.remove();
          await fetchConfig();
          renderGroupPanel();
        } else {
          const err = await res.json();
          alert('保存失败: ' + (err.error || '未知错误'));
          saveBotBtn.disabled = false;
          saveBotBtn.textContent = origText;
        }
      } catch (e) {
        alert('请求异常: ' + e.message);
        saveBotBtn.disabled = false;
        saveBotBtn.textContent = origText;
      }
    });
  }

  function tryMountPanel() {
    if (!isSyncSettingsPage()) {
      const existing = document.getElementById('wecom-bot-group-manager-card');
      if (existing) existing.remove();
      return;
    }
    const mountInfo = getSettingsMountTarget();
    if (!mountInfo || !mountInfo.container) {
      const existing = document.getElementById('wecom-bot-group-manager-card');
      if (existing) existing.remove();
      return;
    }
    if (!document.getElementById('wecom-bot-group-manager-card')) {
      fetchConfig().then(() => renderGroupPanel());
    }
  }

  setInterval(tryMountPanel, 500);
  window.addEventListener('popstate', tryMountPanel);
  window.addEventListener('hashchange', tryMountPanel);
  window.addEventListener('DOMContentLoaded', tryMountPanel);
})();
