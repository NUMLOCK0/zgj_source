// 客服工作台异常线索待办中心与图片/二维码直接粘贴上传扩展
(function() {
  const style = document.createElement('style');
  style.id = 'feedback-center-style';
  style.textContent = `
    /* 顶部异常悬浮气泡 */
    .feedback-bell-pill {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 5px 12px;
      background: #fef2f2;
      border: 1px solid #fecaca;
      color: #dc2626;
      border-radius: 20px;
      font-size: 12.5px;
      font-weight: 700;
      cursor: pointer;
      box-shadow: 0 2px 6px rgba(220, 38, 38, 0.12);
      transition: all 0.2s;
      animation: pulse-red 2s infinite;
    }
    .feedback-bell-pill:hover { background: #fee2e2; transform: scale(1.02); }
    @keyframes pulse-red {
      0% { box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.4); }
      70% { box-shadow: 0 0 0 8px rgba(239, 68, 68, 0); }
      100% { box-shadow: 0 0 0 0 rgba(239, 68, 68, 0); }
    }

    /* 异常抽屉/弹窗 */
    .fc-modal-mask {
      position: fixed; top: 0; left: 0; right: 0; bottom: 0;
      background: rgba(15, 23, 42, 0.6); backdrop-filter: blur(2px);
      display: flex; align-items: center; justify-content: center; z-index: 999999;
    }
    .fc-modal {
      background: #ffffff; border-radius: 16px; width: 92%; max-width: 680px; max-height: 85vh;
      overflow-y: auto; padding: 22px; box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.15);
    }
    .fc-modal-head {
      display: flex; justify-content: space-between; align-items: center;
      margin-bottom: 16px; padding-bottom: 12px; border-bottom: 1px solid #f1f5f9;
    }
    .fc-modal-head h3 { margin: 0; font-size: 17px; color: #0f172a; font-weight: 800; display: flex; align-items: center; gap: 8px; }
    .fc-close { background: none; border: none; font-size: 22px; cursor: pointer; color: #94a3b8; }

    .fc-list { display: flex; flex-direction: column; gap: 12px; }
    .fc-item {
      border: 1px solid #fecaca; background: #fff5f5; border-radius: 12px; padding: 14px;
      display: flex; justify-content: space-between; align-items: flex-start; gap: 12px; flex-wrap: wrap;
    }
    .fc-item-main { flex: 1; min-width: 240px; }
    .fc-item-title { font-size: 14.5px; font-weight: 700; color: #1e293b; margin-bottom: 4px; }
    .fc-reason-badge {
      display: inline-block; font-size: 11px; font-weight: 700; padding: 2px 8px; border-radius: 4px;
      background: #dc2626; color: #fff; margin-bottom: 6px;
    }
    .fc-item-desc { font-size: 12.5px; color: #475569; line-height: 1.4; }
    .fc-item-meta { font-size: 11.5px; color: #94a3b8; margin-top: 6px; }

    .fc-item-actions { display: flex; gap: 8px; align-items: center; }
    .fc-btn-resend {
      background: #0ea5e9; color: #fff; border: none; padding: 6px 14px; border-radius: 6px;
      font-size: 12.5px; font-weight: 700; cursor: pointer;
    }
    .fc-btn-invalid {
      background: #f1f5f9; color: #64748b; border: 1px solid #cbd5e1; padding: 6px 12px;
      border-radius: 6px; font-size: 12.5px; cursor: pointer;
    }

    /* 粘贴二维码提示区域 */
    .qr-paste-box {
      border: 2px dashed #cbd5e1; border-radius: 10px; padding: 12px; text-align: center;
      background: #f8fafc; cursor: pointer; transition: all 0.2s; margin-top: 10px;
    }
    .qr-paste-box:hover { border-color: #0ea5e9; background: #f0f9ff; }
    .qr-preview-img { max-height: 120px; border-radius: 8px; margin-top: 8px; box-shadow: 0 2px 6px rgba(0,0,0,0.1); }
  `;
  document.head.appendChild(style);

  let feedbackItems = [];

  // 获取客服待处理异常数据
  async function fetchFeedbacks() {
    try {
      const res = await fetch('/api/feedback-records');
      if (res.ok) {
        const data = await res.json();
        feedbackItems = data.list || [];
        updateBellIndicator(data.count || 0);
      }
    } catch (e) {
      console.error('获取异常线索失败:', e);
    }
  }

  function updateBellIndicator(count) {
    const targetHeader = document.querySelector('.page-header .header-actions, .panel-header .panel-actions, .user-name-wrapper');
    let pill = document.getElementById('feedback-bell-pill');

    if (count <= 0) {
      if (pill) pill.remove();
      return;
    }

    if (!pill) {
      pill = document.createElement('div');
      pill.id = 'feedback-bell-pill';
      pill.className = 'feedback-bell-pill';
      pill.addEventListener('click', () => openFeedbackModal());
      if (targetHeader) targetHeader.prepend(pill);
      else document.body.appendChild(pill);
    }
    pill.innerHTML = `🚨 待核实线索 (${count})`;
  }

  function openFeedbackModal() {
    const modal = document.createElement('div');
    modal.className = 'fc-modal-mask';
    modal.innerHTML = `
      <div class="fc-modal">
        <div class="fc-modal-head">
          <h3>🚨 销售反馈异常线索 (${feedbackItems.length})</h3>
          <button class="fc-close">&times;</button>
        </div>

        <div class="fc-list">
          ${feedbackItems.length === 0 ? `<div style="text-align:center; padding:30px 0; color:#94a3b8;">太棒了，当前暂无异常反馈！</div>` : feedbackItems.map(item => `
            <div class="fc-item">
              <div class="fc-item-main">
                <span class="fc-reason-badge">${escapeHtml(item.feedbackReason || '联系不上')}</span>
                <div class="fc-item-title">${escapeHtml(item.name || item.companyName || '客户')} · <span style="font-family:monospace; color:#2563eb;">${escapeHtml(item.phone || item.wechat || '无联系方式')}</span></div>
                <div class="fc-item-desc">${escapeHtml(item.feedbackDetail ? '详情: ' + item.feedbackDetail : '销售反馈加不上或联系不上，请重新核对')}</div>
                <div class="fc-item-meta">由销售 [${escapeHtml(item.feedbackSales || '同事')}] 于 ${escapeHtml(item.feedbackTime || '-')} 提交反馈</div>
                ${item.qrCodeUrl ? `<div><img src="${item.qrCodeUrl}" class="qr-preview-img" title="当前二维码" /></div>` : ''}
              </div>
              <div class="fc-item-actions">
                <button class="fc-btn-resend" data-resend-id="${item.id}" data-biz="${item._bizType}">🔄 核对并重发</button>
                <button class="fc-btn-invalid" data-invalid-id="${item.id}" data-biz="${item._bizType}">已核实无效</button>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;

    document.body.appendChild(modal);
    modal.querySelector('.fc-close').addEventListener('click', () => modal.remove());

    modal.querySelectorAll('[data-invalid-id]').forEach(btn => {
      btn.addEventListener('click', async () => {
        const id = btn.dataset.invalidId;
        const type = btn.dataset.biz;
        if (!confirm('确认该客户无法联系并结案吗？')) return;
        await fetch(`/api/feedback-records/${id}/confirm-invalid`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ type })
        });
        modal.remove();
        fetchFeedbacks();
      });
    });

    modal.querySelectorAll('[data-resend-id]').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = parseInt(btn.dataset.resendId);
        const type = btn.dataset.biz;
        const customer = feedbackItems.find(c => c.id === id);
        modal.remove();
        openResendModal(customer, type);
      });
    });
  }

  function openResendModal(customer, type) {
    let newQrCode = customer?.qrCodeUrl || '';
    const modal = document.createElement('div');
    modal.className = 'fc-modal-mask';
    modal.innerHTML = `
      <div class="fc-modal" style="max-width:520px;">
        <div class="fc-modal-head">
          <h3>🔄 修改信息并重新推送到销售群</h3>
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
          <label style="font-size:13px; font-weight:700; display:block; margin-bottom:4px;">微信二维码截图 (可直接在此粘贴 Ctrl+V)</label>
          <div class="qr-paste-box" id="resend-qr-box">
            <div id="qr-tip-text">📸 点击选择图片 或 截图后按 Ctrl+V 粘贴</div>
            <input type="file" id="resend-file-input" accept="image/*" style="display:none;" />
            <div id="qr-preview-area">${newQrCode ? `<img src="${newQrCode}" class="qr-preview-img" />` : ''}</div>
          </div>
        </div>

        <div style="margin-bottom:16px;">
          <label style="font-size:13px; font-weight:700; display:block; margin-bottom:4px;">补充说明 / 给销售的备注</label>
          <textarea id="resend-remarks" class="wecom-input" style="height:60px; padding:8px;" placeholder="例如：电话已重新打通，请及时添加！">${escapeHtml(customer?.remarks || '')}</textarea>
        </div>

        <div style="display:flex; justify-content:flex-end; gap:10px;">
          <button class="wecom-btn-cancel fc-cancel">取消</button>
          <button class="wecom-btn-primary" id="btn-do-resend" style="background:#0ea5e9; padding:8px 20px;">🚀 重新推送至企微群</button>
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

    // 支持直接在弹窗内粘贴图片 Ctrl+V
    window.addEventListener('paste', handlePasteEvent);
    function handlePasteEvent(e) {
      const items = e.clipboardData?.items || [];
      for (const item of items) {
        if (item.type.indexOf('image') !== -1) {
          const file = item.getAsFile();
          handleImageFile(file);
          break;
        }
      }
    }

    async function handleImageFile(file) {
      const reader = new FileReader();
      reader.onload = async (ev) => {
        const base64 = ev.target.result;
        previewArea.innerHTML = `<img src="${base64}" class="qr-preview-img" />`;
        // 上传到后端
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
        } catch (err) {
          console.error('上传图片失败:', err);
        }
      };
      reader.readAsDataURL(file);
    }

    modal.querySelector('#btn-do-resend').addEventListener('click', async () => {
      window.removeEventListener('paste', handlePasteEvent);
      const phone = modal.querySelector('#resend-phone').value.trim();
      const wechat = modal.querySelector('#resend-wechat').value.trim();
      const remarks = modal.querySelector('#resend-remarks').value.trim();

      try {
        const res = await fetch(`/api/feedback-records/${customer.id}/resend`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            type,
            phone,
            wechat,
            qrCodeUrl: newQrCode,
            remarks
          })
        });
        if (res.ok) {
          alert('✅ 已更新并重新推送到销售群！');
          modal.remove();
          fetchFeedbacks();
        } else {
          const err = await res.json();
          alert('重发失败: ' + (err.error || '未知错误'));
        }
      } catch (e) {
        alert('请求异常: ' + e.message);
      }
    });
  }

  function escapeHtml(str) {
    return String(str || '').replace(/[&<>"']/g, m => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[m]);
  }

  // 轮询检查待处理反馈（每8秒一次）
  setInterval(fetchFeedbacks, 8000);
  setTimeout(fetchFeedbacks, 1500);
})();
