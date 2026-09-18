// 纯矢量图标 (SVG) 提取预览组件 + 大图缩略展示与点击全屏大图预览
(function() {
  if (window._qrPasteSupportInjected) return;
  window._qrPasteSupportInjected = true;
  const style = document.createElement('style');
  style.id = 'qr-paste-card-style';
  style.textContent = `
    .pasted-qr-card {
      display: flex;
      flex-direction: column;
      gap: 10px;
      padding: 12px 14px;
      background: #f0fdf4;
      border: 1.5px solid #86efac;
      border-radius: 10px;
      margin-top: 10px;
      margin-bottom: 10px;
      box-shadow: 0 2px 8px rgba(22, 163, 74, 0.08);
      animation: slide-down 0.25s ease-out;
      box-sizing: border-box;
      width: 100%;
    }
    @keyframes slide-down {
      from { opacity: 0; transform: translateY(-6px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .pqc-top-bar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1px dashed #bbf7d0;
      padding-bottom: 8px;
    }
    .pqc-title {
      font-size: 13.5px;
      font-weight: 700;
      color: #15803d;
      display: flex;
      align-items: center;
      gap: 6px;
    }
    .pqc-btn-remove {
      background: #ffffff;
      color: #ef4444;
      border: 1px solid #fecaca;
      padding: 3px 10px;
      border-radius: 6px;
      font-size: 12px;
      cursor: pointer;
      font-weight: 600;
      transition: all 0.15s;
    }
    .pqc-btn-remove:hover { background: #fef2f2; border-color: #ef4444; }

    .pqc-content-row {
      display: flex;
      align-items: center;
      gap: 14px;
    }
    .pqc-img-preview-box {
      position: relative;
      cursor: pointer;
      border-radius: 8px;
      overflow: hidden;
      border: 1px solid #86efac;
      background: #ffffff;
      box-shadow: 0 1px 4px rgba(0,0,0,0.05);
      flex-shrink: 0;
      display: inline-block;
    }
    .pqc-img-preview-box:hover .pqc-hover-zoom {
      opacity: 1;
    }
    .pqc-large-thumb {
      display: block;
      width: 90px;
      height: 90px;
      object-fit: cover;
      background: #fff;
    }
    .pqc-hover-zoom {
      position: absolute;
      top: 0; left: 0; right: 0; bottom: 0;
      background: rgba(0, 0, 0, 0.45);
      color: #ffffff;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 11px;
      font-weight: 600;
      opacity: 0;
      transition: opacity 0.2s;
    }
    .pqc-info-desc {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }
    .pqc-info-main {
      font-size: 13px;
      font-weight: 600;
      color: #166534;
    }
    .pqc-info-sub {
      font-size: 12px;
      color: #4b5563;
      line-height: 1.4;
    }
    .pqc-badge-ready {
      display: inline-block;
      width: fit-content;
      font-size: 11px;
      font-weight: 700;
      padding: 1px 6px;
      border-radius: 4px;
      background: #dcfce7;
      color: #15803d;
      border: 1px solid #bbf7d0;
    }

    /* 全屏大图查看模态窗 */
    .pqc-modal-lightbox {
      position: fixed;
      top: 0; left: 0; right: 0; bottom: 0;
      background: rgba(0, 0, 0, 0.75);
      backdrop-filter: blur(4px);
      z-index: 9999999;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 20px;
      cursor: zoom-out;
      animation: fadeIn 0.2s ease-out;
    }
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    .pqc-lightbox-img {
      max-width: 90vw;
      max-height: 85vh;
      border-radius: 8px;
      box-shadow: 0 10px 30px rgba(0,0,0,0.3);
      cursor: default;
    }
  `;
  document.head.appendChild(style);

  const SVG_CHECK = `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#16a34a" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>`;
  const SVG_ZOOM = `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right:2px;"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line><line x1="11" y1="8" x2="11" y2="14"></line><line x1="8" y1="11" x2="14" y2="11"></line></svg>`;

  window.currentBoundQrUrl = '';
  window.currentBoundBase64 = '';

  document.addEventListener('paste', async function(e) {
    try {
      const activeEl = document.activeElement;
      const items = e.clipboardData?.items || [];
      for (const item of items) {
        if (item.type.indexOf('image') !== -1) {
          const file = item.getAsFile();
          if (!file) continue;
          const reader = new FileReader();
          reader.onload = async (ev) => {
            const base64 = ev.target.result;
            window.currentBoundBase64 = base64;
            renderPastePreview(base64, activeEl);

            try {
              const res = await fetch('/api/upload-qrcode', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ imageBase64: base64 })
              });
              const data = await res.json();
              if (res.ok && data.url) {
                window.currentBoundQrUrl = data.url;
                const cardTitle = document.querySelector('.pqc-title');
                if (cardTitle) cardTitle.innerHTML = `${SVG_CHECK} 微信名片/二维码截图已就绪`;
              }
            } catch (err) {
              console.error('上传截图失败:', err);
            }
          };
          reader.readAsDataURL(file);
          break;
        }
      }
    } catch(e) {}
  });

  window.renderPastePreview = function(base64, targetEl) {
    window.currentBoundBase64 = base64;
    const parentContainer = targetEl ? targetEl.closest('.textarea-glow-box, .studio-card, .el-textarea') : document.querySelector('.textarea-glow-box, .studio-card');
    if (!parentContainer) return;

    let card = document.getElementById('pasted-qr-active-card');
    if (!card) {
      card = document.createElement('div');
      card.id = 'pasted-qr-active-card';
      card.className = 'pasted-qr-card';
      parentContainer.parentNode.insertBefore(card, parentContainer.nextSibling);
    }

    card.innerHTML = `
      <div class="pqc-top-bar">
        <div class="pqc-title">${SVG_CHECK} 已粘贴名片图片预览</div>
        <button type="button" class="pqc-btn-remove" id="btn-remove-qr-card">移除图片</button>
      </div>
      <div class="pqc-content-row">
        <div class="pqc-img-preview-box" id="btn-view-large-img" title="点击查看高清大图">
          <img src="${base64}" class="pqc-large-thumb" />
          <div class="pqc-hover-zoom">${SVG_ZOOM}大图</div>
        </div>
        <div class="pqc-info-desc">
          <div class="pqc-badge-ready">✓ 已成功关联当前登记客户</div>
          <div class="pqc-info-main">名片/二维码截图已提取</div>
          <div class="pqc-info-sub">点击左侧图片可全屏查看；点击【一键登记】时将连发高清大图推送至企微销售群</div>
        </div>
      </div>
    `;

    // 绑定移除事件
    card.querySelector('#btn-remove-qr-card')?.addEventListener('click', () => {
      window.currentBoundQrUrl = '';
      window.currentBoundBase64 = '';
      card.remove();
    });

    // 绑定点击大图预览
    card.querySelector('#btn-view-large-img')?.addEventListener('click', () => {
      openLightbox(base64);
    });
  };

  function openLightbox(src) {
    const box = document.createElement('div');
    box.className = 'pqc-modal-lightbox';
    box.innerHTML = `<img src="${src}" class="pqc-lightbox-img" title="点击任意空白处关闭" />`;
    box.addEventListener('click', (e) => {
      if (e.target !== box.querySelector('.pqc-lightbox-img')) {
        box.remove();
      }
    });
    document.body.appendChild(box);
  }

  const originalFetch = window.fetch;
  window.fetch = async function(...args) {
    const [url, config] = args;
    if (typeof url === 'string' && (url.includes('/api/customers') || url.includes('/api/finance-customers')) && config && config.method === 'POST') {
      try {
        if (config.body && window.currentBoundQrUrl) {
          const bodyObj = JSON.parse(config.body);
          if (!bodyObj.qrCodeUrl) {
            bodyObj.qrCodeUrl = window.currentBoundQrUrl;
            config.body = JSON.stringify(bodyObj);
          }
        }
      } catch (e) {}
    }
    const res = await originalFetch.apply(this, args);
    if (typeof url === 'string' && (url.includes('/api/customers') || url.includes('/api/finance-customers')) && config && config.method === 'POST') {
      window.currentBoundQrUrl = '';
      window.currentBoundBase64 = '';
      const card = document.getElementById('pasted-qr-active-card');
      if (card) card.remove();
    }
    return res;
  };
})();
