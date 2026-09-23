// 纯矢量图标 (SVG) + 呼吸闪动胶囊 + 完美避开左侧菜单的 Element 原生异常处置组件
(function() {
  if (window._feedbackNativeWorkbenchInjected) return;
  window._feedbackNativeWorkbenchInjected = true;
  const style = document.createElement('style');
  style.id = 'workbench-pro-feedback-style';
  style.textContent = `
    /* 1. 顶部工作台操作栏内的呼吸闪动微光胶囊 (不占大面积横幅，绝不被左侧栏遮挡) */
    .pro-feedback-pill {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 4px 12px;
      background: #fef2f2;
      border: 1px solid #f87171;
      border-radius: 20px;
      color: #dc2626;
      font-size: 12.5px;
      font-weight: 600;
      cursor: pointer;
      user-select: none;
      transition: all 0.2s ease;
      box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.5);
      animation: pulseGlow 1.8s infinite cubic-bezier(0.4, 0, 0.6, 1);
      margin-right: 8px;
    }
    .pro-feedback-pill:hover {
      background: #fee2e2;
      transform: translateY(-1px);
    }
    @keyframes pulseGlow {
      0% {
        box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.6);
      }
      70% {
        box-shadow: 0 0 0 8px rgba(239, 68, 68, 0);
      }
      100% {
        box-shadow: 0 0 0 0 rgba(239, 68, 68, 0);
      }
    }
    .pro-pill-badge {
      background: #ef4444;
      color: #ffffff;
      font-size: 11px;
      font-weight: 700;
      padding: 1px 6px;
      border-radius: 10px;
      min-width: 18px;
      text-align: center;
    }

    /* 2. 右侧抽屉 (Element Plus Drawer 规范) */
    .pro-drawer-mask {
      position: fixed;
      top: 0; left: 0; right: 0; bottom: 0;
      background: rgba(15, 23, 42, 0.4);
      backdrop-filter: blur(2px);
      z-index: 999999;
      display: flex;
      justify-content: flex-end;
    }
    .pro-drawer-panel {
      width: 100%;
      max-width: 460px;
      height: 100%;
      background: #ffffff;
      box-shadow: -4px 0 20px rgba(0, 0, 0, 0.08);
      display: flex;
      flex-direction: column;
      animation: drawerSlide 0.25s cubic-bezier(0.16, 1, 0.3, 1);
    }
    @keyframes drawerSlide {
      from { transform: translateX(100%); }
      to { transform: translateX(0); }
    }
    .pro-drawer-head {
      padding: 16px 20px;
      border-bottom: 1px solid #f1f5f9;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .pro-drawer-title {
      font-size: 15.5px;
      font-weight: 700;
      color: #0f172a;
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .pro-btn-icon-close {
      background: none;
      border: none;
      cursor: pointer;
      color: #94a3b8;
      display: flex;
      align-items: center;
      padding: 4px;
      border-radius: 4px;
    }
    .pro-btn-icon-close:hover { color: #475569; background: #f1f5f9; }

    .pro-drawer-body {
      flex: 1;
      overflow-y: auto;
      padding: 18px 20px;
      display: flex;
      flex-direction: column;
      gap: 12px;
    }
    .pro-fb-card {
      border: 1px solid #e2e8f0;
      border-radius: 10px;
      padding: 14px;
      background: #ffffff;
      transition: all 0.15s;
    }
    .pro-fb-card:hover { border-color: #cbd5e1; }
    .pro-fb-top {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 6px;
    }
    .pro-fb-name {
      font-size: 14px;
      font-weight: 700;
      color: #1e293b;
    }
    .pro-fb-biz-tag {
      font-size: 11px;
      font-weight: 600;
      padding: 1px 6px;
      border-radius: 4px;
      background: #f1f5f9;
      color: #64748b;
    }
    .pro-fb-note {
      background: #fff1f2;
      color: #9f1239;
      font-size: 12px;
      padding: 8px 10px;
      border-radius: 6px;
      margin: 8px 0;
      line-height: 1.4;
      border-left: 3px solid #f43f5e;
    }
    .pro-fb-foot {
      display: flex;
      justify-content: flex-end;
      gap: 8px;
      margin-top: 10px;
      border-top: 1px solid #f8fafc;
      padding-top: 8px;
    }
    .pro-btn-sub-resend {
      background: #0ea5e9;
      color: #ffffff;
      border: none;
      padding: 5px 12px;
      border-radius: 5px;
      font-size: 12px;
      font-weight: 600;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 4px;
    }
    .pro-btn-sub-resend:hover { background: #0284c7; }
    .pro-btn-sub-inv {
      background: #f8fafc;
      color: #64748b;
      border: 1px solid #cbd5e1;
      padding: 5px 10px;
      border-radius: 5px;
      font-size: 12px;
      cursor: pointer;
    }

    /* 3. 弹窗 Form */
    .pro-dlg-mask {
      position: fixed; top: 0; left: 0; right: 0; bottom: 0;
      background: rgba(15, 23, 42, 0.45); backdrop-filter: blur(1.5px);
      z-index: 1000001; display: flex; align-items: center; justify-content: center;
    }
    .pro-dlg {
      background: #ffffff;
      border-radius: 12px;
      width: 92%;
      max-width: 440px;
      padding: 20px;
      box-shadow: 0 16px 36px rgba(0,0,0,0.1);
    }
    .pro-dlg-head {
      display: flex; justify-content: space-between; align-items: center;
      margin-bottom: 14px; padding-bottom: 10px; border-bottom: 1px solid #f1f5f9;
    }
    .pro-dlg-head h4 { margin: 0; font-size: 15px; font-weight: 700; color: #0f172a; }
    .pro-dlg-form-item { margin-bottom: 12px; }
    .pro-dlg-form-item label { display: block; font-size: 12px; font-weight: 600; color: #475569; margin-bottom: 4px; }
    .pro-dlg-input {
      width: 100%; height: 32px; padding: 0 10px; border: 1px solid #cbd5e1;
      border-radius: 6px; font-size: 12.5px; box-sizing: border-box; background: #f8fafc; outline: none;
    }
    .pro-dlg-input:focus { border-color: #0ea5e9; background: #fff; }
    .pro-dlg-qr-box {
      border: 1.5px dashed #cbd5e1; border-radius: 8px; padding: 10px; text-align: center;
      background: #f8fafc; cursor: pointer; font-size: 12px; color: #64748b;
    }
    .pro-dlg-qr-box:hover { border-color: #0ea5e9; background: #f0f9ff; color: #0284c7; }
    .pro-dlg-foot { display: flex; justify-content: flex-end; gap: 8px; margin-top: 16px; }
    .pro-btn-cancel { background: #f1f5f9; color: #475569; border: none; padding: 6px 14px; border-radius: 6px; font-size: 12.5px; cursor: pointer; }
    .pro-btn-ok { background: #0ea5e9; color: #fff; border: none; padding: 6px 16px; border-radius: 6px; font-size: 12.5px; font-weight: 600; cursor: pointer; }
  `;
  document.head.appendChild(style);

  // SVG 矢量图标库
  const SVG_ALERT = `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>`;
  const SVG_CLOSE = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>`;
  const SVG_REFRESH = `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 4 23 10 17 10"></polyline><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"></path></svg>`;

  let fbList = [];

  async function fetchFeedbacks() {
    try {
      const res = await fetch('/api/feedback-records');
      if (res.ok) {
        const data = await res.json();
        fbList = data.list || [];
        renderPulsePill(data.count || 0);
      }
    } catch (e) {}
  }

  // 将呼吸闪烁徽标挂载到工作台顶部操作区（绝不挡左侧栏）
  function renderPulsePill(count) {
    // 寻找挂载容器：优先右上角用户区或工作台顶部操作栏
    const mountTarget = document.querySelector('.header-actions, .panel-actions, .user-name-wrapper, .scope-nav-segment-bar') || document.querySelector('.page-header, .panel-header');
    let pill = document.getElementById('pro-feedback-pill');

    if (!mountTarget) return;

    if (count <= 0) {
      if (pill) pill.remove();
      return;
    }

    if (!pill) {
      pill = document.createElement('div');
      pill.id = 'pro-feedback-pill';
      pill.className = 'pro-feedback-pill';
      pill.addEventListener('click', () => openDrawer());
      mountTarget.prepend(pill);
    }

    pill.innerHTML = `
      ${SVG_ALERT}
      <span>异常待办</span>
      <span class="pro-pill-badge">${count}</span>
    `;
  }

  function openDrawer() {
    const mask = document.createElement('div');
    mask.className = 'pro-drawer-mask';
    mask.innerHTML = `
      <div class="pro-drawer-panel">
        <div class="pro-drawer-head">
          <div class="pro-drawer-title">${SVG_ALERT} 销售反馈待核实线索 (${fbList.length})</div>
          <button class="pro-btn-icon-close">${SVG_CLOSE}</button>
        </div>

        <div class="pro-drawer-body">
          ${fbList.length === 0 ? `<div style="text-align:center; padding:40px 0; color:#94a3b8; font-size:13px;">暂无待处理异常</div>` : fbList.map(item => `
            <div class="pro-fb-card">
              <div class="pro-fb-top">
                <span class="pro-fb-name">${escapeHtml(item.name || item.companyName || '客户')} · <span style="font-family:monospace; color:#0284c7;">${escapeHtml(item.phone || item.wechat || '无联系方式')}</span></span>
                <span class="pro-fb-biz-tag">${escapeHtml(item._bizType === 'zc' ? '职称' : '财税')}</span>
              </div>

              <div class="pro-fb-note">
                <b>销售反馈:</b> ${escapeHtml(item.feedbackReason || '联系不上')}
                ${item.feedbackDetail ? `<div style="margin-top:2px;">说明: ${escapeHtml(item.feedbackDetail)}</div>` : ''}
                <div style="font-size:11px; color:#be123c; margin-top:4px;">反馈人: ${escapeHtml(item.feedbackSales || '销售')} · ${escapeHtml(item.feedbackTime || '-')}</div>
              </div>

              ${item.qrCodeUrl ? `<div style="margin:6px 0; font-size:12px; color:#64748b;">微信名片: <img src="${item.qrCodeUrl}" style="height:44px; vertical-align:middle; border-radius:4px;" /></div>` : ''}

              <div class="pro-fb-foot">
                <button class="pro-btn-sub-inv" data-btn-inv="${item.id}" data-type="${item._bizType}">标记为真无效</button>
                <button class="pro-btn-sub-resend" data-btn-resend="${item.id}" data-type="${item._bizType}">${SVG_REFRESH} 重新核实并重推</button>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;

    document.body.appendChild(mask);
    mask.querySelector('.pro-btn-icon-close').addEventListener('click', () => mask.remove());
    mask.addEventListener('click', (e) => { if (e.target === mask) mask.remove(); });

    mask.querySelectorAll('[data-btn-inv]').forEach(btn => {
      btn.addEventListener('click', async () => {
        const id = btn.dataset.btnInv;
        const type = btn.dataset.type;
        if (!confirm('确认该线索确实无法联系并结案吗？')) return;
        await fetch(`/api/feedback-records/${id}/confirm-invalid`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ type })
        });
        mask.remove();
        fetchFeedbacks();
      });
    });

    mask.querySelectorAll('[data-btn-resend]').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = parseInt(btn.dataset.btnResend);
        const type = btn.dataset.type;
        const customer = fbList.find(c => c.id === id);
        mask.remove();
        openDialog(customer, type);
      });
    });
  }

  function openDialog(customer, type) {
    let newQr = customer?.qrCodeUrl || '';
    const mask = document.createElement('div');
    mask.className = 'pro-dlg-mask';
    mask.innerHTML = `
      <div class="pro-dlg">
        <div class="pro-dlg-head">
          <h4>核实并原路重推至企微群</h4>
          <button class="pro-btn-icon-close">${SVG_CLOSE}</button>
        </div>

        <div class="pro-dlg-form-item">
          <label>联系电话</label>
          <input type="text" id="dlg-phone" class="pro-dlg-input" value="${escapeHtml(customer?.phone || '')}" />
        </div>

        <div class="pro-dlg-form-item">
          <label>微信号码</label>
          <input type="text" id="dlg-wechat" class="pro-dlg-input" value="${escapeHtml(customer?.wechat || '')}" />
        </div>

        <div class="pro-dlg-form-item">
          <label>微信二维码名片 (支持直接 Ctrl+V 粘贴)</label>
          <div class="pro-dlg-qr-box" id="dlg-qr-box">
            <div id="dlg-qr-tip">点击选择图片 或 截图后按 Ctrl+V 粘贴</div>
            <input type="file" id="dlg-file" accept="image/*" style="display:none;" />
            <div id="dlg-preview">${newQr ? `<img src="${newQr}" style="max-height:70px; border-radius:4px; margin-top:6px;" />` : ''}</div>
          </div>
        </div>

        <div class="pro-dlg-form-item">
          <label>给销售的核实说明</label>
          <input type="text" id="dlg-remark" class="pro-dlg-input" placeholder="例如：已向客户索取最新微信名片，请扫码添加！" />
        </div>

        <div class="pro-dlg-foot">
          <button class="pro-btn-cancel">取消</button>
          <button class="pro-btn-ok" id="btn-submit-resend">确认重发至企微群</button>
        </div>
      </div>
    `;

    document.body.appendChild(mask);
    mask.querySelector('.pro-btn-icon-close').addEventListener('click', () => mask.remove());
    mask.querySelector('.pro-btn-cancel').addEventListener('click', () => mask.remove());

    const qrBox = mask.querySelector('#dlg-qr-box');
    const fileInput = mask.querySelector('#dlg-file');
    const preview = mask.querySelector('#dlg-preview');

    qrBox.addEventListener('click', () => fileInput.click());
    fileInput.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (file) uploadImage(file);
    });

    function uploadImage(file) {
      const reader = new FileReader();
      reader.onload = async (ev) => {
        const base64 = ev.target.result;
        preview.innerHTML = `<img src="${base64}" style="max-height:70px; border-radius:4px; margin-top:6px;" />`;
        try {
          const res = await fetch('/api/upload-qrcode', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ imageBase64: base64 })
          });
          const data = await res.json();
          if (res.ok && data.url) newQr = data.url;
        } catch (e) {}
      };
      reader.readAsDataURL(file);
    }

    mask.querySelector('#btn-submit-resend').addEventListener('click', async () => {
      const phone = mask.querySelector('#dlg-phone').value.trim();
      const wechat = mask.querySelector('#dlg-wechat').value.trim();
      const resendRemark = mask.querySelector('#dlg-remark').value.trim();

      try {
        const res = await fetch(`/api/feedback-records/${customer.id}/resend`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            type,
            phone,
            wechat,
            qrCodeUrl: newQr,
            resendRemark
          })
        });
        if (res.ok) {
          alert('已原路重推至企微销售群！');
          mask.remove();
          fetchFeedbacks();
        } else {
          const err = await res.json();
          alert('重发失败: ' + (err.error || '未知错误'));
        }
      } catch (e) { alert('请求异常: ' + e.message); }
    });
  }

  function escapeHtml(str) {
    return String(str || '').replace(/[&<>"']/g, m => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[m]);
  }

  setInterval(fetchFeedbacks, 5000);
  setTimeout(fetchFeedbacks, 800);
})();
