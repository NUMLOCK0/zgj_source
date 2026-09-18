// 综合大屏【🚨 异常线索处置中心】独立 Tab 视图与原路重推闭环组件
(function() {
  const style = document.createElement('style');
  style.id = 'workbench-feedback-tab-style';
  style.textContent = `
    .feedback-workbench-view {
      margin-top: 16px;
      animation: fadeIn 0.25s ease-in-out;
    }
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(6px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .fw-head-card {
      background: #ffffff;
      border-radius: 14px;
      border: 1px solid #fecaca;
      padding: 16px 20px;
      margin-bottom: 16px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      box-shadow: 0 2px 8px rgba(220, 38, 38, 0.05);
      background: linear-gradient(135deg, #fff5f5 0%, #ffffff 100%);
    }
    .fw-title {
      font-size: 17px;
      font-weight: 800;
      color: #dc2626;
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .fw-sub {
      font-size: 13px;
      color: #64748b;
      margin-top: 4px;
    }

    .fw-cards-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(360px, 1fr));
      gap: 16px;
    }
    .fw-card-item {
      background: #ffffff;
      border-radius: 14px;
      border: 1px solid #e2e8f0;
      box-shadow: 0 2px 6px rgba(0,0,0,0.03);
      padding: 18px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      transition: all 0.2s;
      position: relative;
    }
    .fw-card-item:hover {
      border-color: #cbd5e1;
      box-shadow: 0 6px 16px rgba(0,0,0,0.06);
    }
    .fw-badge-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 10px;
    }
    .fw-reason-tag {
      background: #fef2f2;
      border: 1px solid #fecaca;
      color: #dc2626;
      font-size: 12px;
      font-weight: 700;
      padding: 2px 8px;
      border-radius: 6px;
    }
    .fw-cust-name {
      font-size: 16px;
      font-weight: 800;
      color: #0f172a;
      margin-bottom: 8px;
      display: flex;
      align-items: center;
      gap: 6px;
    }
    .fw-info-list {
      font-size: 13px;
      color: #334155;
      display: flex;
      flex-direction: column;
      gap: 6px;
      margin-bottom: 14px;
      background: #f8fafc;
      padding: 10px;
      border-radius: 8px;
    }
    .fw-sales-note {
      font-size: 12.5px;
      color: #b91c1c;
      background: #fff1f2;
      padding: 8px 10px;
      border-radius: 6px;
      margin-bottom: 12px;
      border-left: 3px solid #f43f5e;
    }
    .fw-card-foot {
      border-top: 1px solid #f1f5f9;
      padding-top: 12px;
      display: flex;
      justify-content: flex-end;
      gap: 8px;
    }
    .fw-btn-primary {
      background: #0ea5e9;
      color: #fff;
      border: none;
      padding: 7px 14px;
      border-radius: 6px;
      font-size: 13px;
      font-weight: 700;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 4px;
    }
    .fw-btn-primary:hover { background: #0284c7; }
    .fw-btn-default {
      background: #f1f5f9;
      color: #64748b;
      border: 1px solid #cbd5e1;
      padding: 7px 12px;
      border-radius: 6px;
      font-size: 13px;
      cursor: pointer;
    }
  `;
  document.head.appendChild(style);

  let fbList = [];

  async function fetchFeedbackList() {
    try {
      const res = await fetch('/api/feedback-records');
      if (res.ok) {
        const data = await res.json();
        fbList = data.list || [];
        renderTabBadge(data.count || 0);
        if (window.currentActiveScope === 'feedback') {
          renderFeedbackView();
        }
      }
    } catch (e) {}
  }

  function renderTabBadge(count) {
    const scopeBar = document.querySelector('.scope-nav-segment-bar, .scope-nav-bar');
    if (!scopeBar) return;

    let fbBtn = document.getElementById('scope-btn-feedback');
    if (!fbBtn) {
      fbBtn = document.createElement('button');
      fbBtn.id = 'scope-btn-feedback';
      fbBtn.type = 'button';
      fbBtn.className = 'scope-seg-btn';
      scopeBar.appendChild(fbBtn);

      fbBtn.addEventListener('click', () => {
        document.querySelectorAll('.scope-seg-btn').forEach(b => b.classList.remove('active'));
        fbBtn.classList.add('active');
        window.currentActiveScope = 'feedback';
        
        // 隐藏其他面板
        const mainContent = document.querySelector('.dashboard-content, .studio-dashboard-main, .scope-view-container');
        if (mainContent) mainContent.style.display = 'none';

        renderFeedbackView();
      });

      // 监听其他Tab点击切回
      scopeBar.querySelectorAll('.scope-seg-btn:not(#scope-btn-feedback)').forEach(btn => {
        btn.addEventListener('click', () => {
          window.currentActiveScope = '';
          const fbView = document.getElementById('feedback-workbench-view');
          if (fbView) fbView.style.display = 'none';
          const mainContent = document.querySelector('.dashboard-content, .studio-dashboard-main, .scope-view-container');
          if (mainContent) mainContent.style.display = '';
        });
      });
    }

    fbBtn.innerHTML = `🚨 异常线索处置 ${count > 0 ? `<span style="background:#ef4444; color:#fff; border-radius:10px; padding:1px 6px; font-size:11px; margin-left:4px;">${count}</span>` : ''}`;
  }

  function renderFeedbackView() {
    let container = document.getElementById('feedback-workbench-view');
    const scopeBar = document.querySelector('.scope-nav-segment-bar, .scope-nav-bar')?.closest('.dash-top-bar, .page-header, .dashboard-wrapper') || document.querySelector('.dashboard-page');
    if (!scopeBar) return;

    if (!container) {
      container = document.createElement('div');
      container.id = 'feedback-workbench-view';
      container.className = 'feedback-workbench-view';
      scopeBar.parentNode.insertBefore(container, scopeBar.nextSibling);
    }
    container.style.display = 'block';

    const cardsHtml = fbList.length === 0
      ? `<div style="text-align:center; padding:60px 0; background:#fff; border-radius:14px; border:1px solid #e2e8f0; color:#94a3b8;">
           <div style="font-size:36px; margin-bottom:10px;">🎉</div>
           <div style="font-size:16px; font-weight:700; color:#0f172a;">暂无待处理的异常线索</div>
           <div style="font-size:13px; margin-top:4px;">销售反馈联系不上或二维码失效的客户会实时汇总至此处</div>
         </div>`
      : `<div class="fw-cards-grid">
          ${fbList.map(c => `
            <div class="fw-card-item">
              <div>
                <div class="fw-badge-row">
                  <span class="fw-reason-tag">🚨 ${escapeHtml(c.feedbackReason || '联系不上')}</span>
                  <span style="font-size:12px; color:#64748b;">${escapeHtml(c._bizType === 'zc' ? '🎯 职称业务' : '💼 财税业务')}</span>
                </div>
                <div class="fw-cust-name">${escapeHtml(c.name || c.companyName || '客户')} · <span style="font-family:monospace; color:#0284c7;">${escapeHtml(c.phone || c.wechat || '无号码')}</span></div>
                
                <div class="fw-sales-note">
                  💬 <b>销售说明:</b> ${escapeHtml(c.feedbackDetail || '加不上或提示二维码已过期')}
                  <div style="font-size:11.5px; color:#9f1239; margin-top:4px;">反馈人: ${escapeHtml(c.feedbackSales || '销售')} (${escapeHtml(c.feedbackTime || '-')})</div>
                </div>

                <div class="fw-info-list">
                  <div>🏢 <b>分配店铺:</b> ${escapeHtml(c.assignedTo || '未分配')}</div>
                  <div>👤 <b>录入客服:</b> ${escapeHtml(c.createdBy || '-')}</div>
                  ${c.qrCodeUrl ? `<div>📸 <b>已有名片:</b> <img src="${c.qrCodeUrl}" style="height:50px; vertical-align:middle; border-radius:4px; margin-left:6px;" /></div>` : ''}
                </div>
              </div>

              <div class="fw-card-foot">
                <button class="fw-btn-default" data-btn-inv="${c.id}" data-type="${c._bizType}">标记为真无效</button>
                <button class="fw-btn-primary" data-btn-resend="${c.id}" data-type="${c._bizType}">🔄 重新核实并重推企微</button>
              </div>
            </div>
          `).join('')}
        </div>`;

    container.innerHTML = `
      <div class="fw-head-card">
        <div>
          <div class="fw-title">🚨 销售线索异常处置中心 (待处理: ${fbList.length} 条)</div>
          <div class="fw-sub">销售在企微群反馈联系不上、二维码过期等异常的线索会实时汇聚于此，客服核实更新后可一键原路重推企微群</div>
        </div>
        <button class="fw-btn-default" id="btn-refresh-fb" style="background:#fff; font-weight:700;">🔄 刷新列表</button>
      </div>
      ${cardsHtml}
    `;

    container.querySelector('#btn-refresh-fb')?.addEventListener('click', () => fetchFeedbackList());

    container.querySelectorAll('[data-btn-inv]').forEach(btn => {
      btn.addEventListener('click', async () => {
        const id = btn.dataset.btnInv;
        const type = btn.dataset.type;
        if (!confirm('确认该线索确实无法联系并结案吗？')) return;
        await fetch(`/api/feedback-records/${id}/confirm-invalid`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ type })
        });
        fetchFeedbackList();
      });
    });

    container.querySelectorAll('[data-btn-resend]').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = parseInt(btn.dataset.btnResend);
        const type = btn.dataset.type;
        const customer = fbList.find(c => c.id === id);
        openResendModal(customer, type);
      });
    });
  }

  function escapeHtml(str) {
    return String(str || '').replace(/[&<>"']/g, m => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[m]);
  }

  function openResendModal(customer, type) {
    let newQrCode = customer?.qrCodeUrl || '';
    const modal = document.createElement('div');
    modal.className = 'fc-modal-mask';
    modal.innerHTML = `
      <div class="fc-modal" style="max-width:520px;">
        <div class="fc-modal-head">
          <h3>🔄 修改信息并原路重推至企微群</h3>
          <button class="fc-close">&times;</button>
        </div>

        <div style="margin-bottom:12px;">
          <label style="font-size:13px; font-weight:700; display:block; margin-bottom:4px;">联系电话</label>
          <input type="text" id="resend-phone" class="wecom-input" value="${escapeHtml(customer?.phone || '')}" />
        </div>

        <div style="margin-bottom:12px;">
          <label style="font-size:13px; font-weight:700; display:block; margin-bottom:4px;">微信号码</label>
          <input type="text" id="resend-wechat" class="wecom-input" value="${escapeHtml(customer?.wechat || '')}" />
        </div>

        <div style="margin-bottom:12px;">
          <label style="font-size:13px; font-weight:700; display:block; margin-bottom:4px;">微信二维码截图 (可直接按 Ctrl+V 粘贴)</label>
          <div class="qr-paste-box" id="resend-qr-box">
            <div id="qr-tip-text">📸 点击选择图片 或 截图后按 Ctrl+V 粘贴</div>
            <input type="file" id="resend-file-input" accept="image/*" style="display:none;" />
            <div id="qr-preview-area">${newQrCode ? `<img src="${newQrCode}" class="qr-preview-img" />` : ''}</div>
          </div>
        </div>

        <div style="margin-bottom:16px;">
          <label style="font-size:13px; font-weight:700; display:block; margin-bottom:4px;">给销售的核实说明 (将显示在群卡片中)</label>
          <textarea id="resend-remarks" class="wecom-input" style="height:60px; padding:8px;" placeholder="例如：已向客户索取最新个人微信名片，请扫下方大图添加！"></textarea>
        </div>

        <div style="display:flex; justify-content:flex-end; gap:10px;">
          <button class="wecom-btn-cancel fc-cancel">取消</button>
          <button class="wecom-btn-primary" id="btn-do-resend" style="background:#0ea5e9; padding:8px 20px;">🚀 原路重推至企微群</button>
        </div>
      </div>
    `;

    document.body.appendChild(modal);
    modal.querySelector('.fc-close').addEventListener('click', () => modal.remove());
    modal.querySelector('.fc-cancel').addEventListener('click', () => modal.remove());

    const qrBox = modal.querySelector('#resend-qr-box');
    const fileInput = modal.querySelector('#resend-file-input');
    const previewArea = modal.querySelector('#qr-preview-area');

    qrBox.addEventListener('click', () => fileInput.click());
    fileInput.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (file) handleImageFile(file);
    });

    async function handleImageFile(file) {
      const reader = new FileReader();
      reader.onload = async (ev) => {
        const base64 = ev.target.result;
        previewArea.innerHTML = `<img src="${base64}" class="qr-preview-img" />`;
        try {
          const res = await fetch('/api/upload-qrcode', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ imageBase64: base64 })
          });
          const data = await res.json();
          if (res.ok && data.url) {
            newQrCode = data.url;
          }
        } catch (err) {}
      };
      reader.readAsDataURL(file);
    }

    modal.querySelector('#btn-do-resend').addEventListener('click', async () => {
      const phone = modal.querySelector('#resend-phone').value.trim();
      const wechat = modal.querySelector('#resend-wechat').value.trim();
      const resendRemark = modal.querySelector('#resend-remarks').value.trim();

      try {
        const res = await fetch(`/api/feedback-records/${customer.id}/resend`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            type,
            phone,
            wechat,
            qrCodeUrl: newQrCode,
            resendRemark
          })
        });
        if (res.ok) {
          alert('✅ 已原路重推至企微销售群！');
          modal.remove();
          fetchFeedbackList();
        } else {
          const err = await res.json();
          alert('重发失败: ' + (err.error || '未知错误'));
        }
      } catch (e) { alert('请求异常: ' + e.message); }
    });
  }

  setInterval(fetchFeedbackList, 6000);
  setTimeout(fetchFeedbackList, 1000);
})();
