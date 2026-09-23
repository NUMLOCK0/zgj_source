// 1. 移动端相机/相册原生选图
// 2. 快捷选择/填写“被加老师微信”
// 3. 客户登记表去姓名、紧凑高密度排版、嵌入二维码缩略图与异常反馈重发状态
(function() {
  const style = document.createElement('style');
  style.id = 'compact-table-and-teacher-style';
  style.textContent = `
    /* ==================== 1. 全局客户表格高密度紧凑排版优化 ==================== */
    /* 压缩表格行高、字号与内边距，提升单屏信息承载量 50%+ */
    .el-table .el-table__cell, 
    .customers-page .el-table th, 
    .customers-page .el-table td {
      padding: 6px 4px !important;
      font-size: 12px !important;
    }
    .el-table th.el-table__cell {
      background-color: #f8fafc !important;
      color: #334155 !important;
      font-weight: 700 !important;
      font-size: 12.5px !important;
    }
    
    /* 隐藏所有姓名列及无意义字段 */
    .col-hide-name, th[label="客户姓名"], td[class*="name"] .user-name-title {
      display: none !important;
    }

    /* 联系方式与被加老师紧凑胶囊 */
    .contact-badge-cell {
      display: flex;
      flex-direction: column;
      gap: 2px;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, monospace;
    }
    .teacher-pill {
      display: inline-block;
      font-size: 11px;
      font-weight: 600;
      padding: 1px 5px;
      border-radius: 4px;
      background: #fef3c7;
      color: #92400e;
      border: 1px solid #fde68a;
      width: fit-content;
    }

    /* 状态列胶囊 (正常/销售异常/已核实重发) */
    .fb-status-tag {
      font-size: 11px;
      font-weight: 700;
      padding: 2px 6px;
      border-radius: 4px;
      display: inline-flex;
      align-items: center;
      gap: 4px;
      white-space: nowrap;
    }
    .fb-status-tag.normal { background: #f1f5f9; color: #64748b; }
    .fb-status-tag.pending { background: #fee2e2; color: #dc2626; border: 1px solid #fca5a5; }
    .fb-status-tag.resolved { background: #ecfdf5; color: #059669; border: 1px solid #a7f3d0; }

    /* 表格内名片小缩略图 */
    .table-qr-thumb {
      width: 28px;
      height: 28px;
      border-radius: 4px;
      object-fit: cover;
      cursor: pointer;
      border: 1px solid #cbd5e1;
      vertical-align: middle;
      transition: transform 0.15s;
    }
    .table-qr-thumb:hover { transform: scale(1.5); z-index: 10; position: relative; }

    /* ==================== 2. 提取面板：相册选图 + 被加老师微信输入 ==================== */
    .extract-extra-bar {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: space-between;
      gap: 8px;
      margin-top: 8px;
      padding: 8px 12px;
      background: #f8fafc;
      border-radius: 8px;
      border: 1px solid #e2e8f0;
    }
    .teacher-input-wrap {
      display: flex;
      align-items: center;
      gap: 6px;
      flex: 1;
      min-width: 220px;
    }
    .teacher-lbl {
      font-size: 12px;
      font-weight: 600;
      color: #475569;
      white-space: nowrap;
    }
    .teacher-input {
      height: 28px;
      padding: 0 8px;
      font-size: 12px;
      border: 1px solid #cbd5e1;
      border-radius: 5px;
      background: #fff;
      outline: none;
      flex: 1;
    }
    .teacher-input:focus { border-color: #0ea5e9; }
    
    .photo-upload-btn {
      display: inline-flex;
      align-items: center;
      gap: 5px;
      background: #ffffff;
      border: 1px solid #cbd5e1;
      color: #334155;
      padding: 4px 10px;
      border-radius: 6px;
      font-size: 12px;
      font-weight: 600;
      cursor: pointer;
      user-select: none;
      transition: all 0.15s;
    }
    .photo-upload-btn:hover { background: #f1f5f9; border-color: #94a3b8; }
  `;
  document.head.appendChild(style);

  // 纯 SVG 图标
  const SVG_CAMERA = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path><circle cx="12" cy="13" r="4"></circle></svg>`;

  try {
    window.lastSelectedTeacherWechat = localStorage.getItem('last_teacher_wechat') || '';
  } catch (e) {
    window.lastSelectedTeacherWechat = '';
  }

  // 增强提取面板操作栏
  function injectExtractToolbar() {
    try {
      const parent = document.querySelector('.textarea-glow-box, .studio-card, .textarea-status-bar');
      if (!parent) return;

      let bar = document.getElementById('extract-extra-bar');
      if (!bar) {
        bar = document.createElement('div');
        bar.id = 'extract-extra-bar';
        bar.className = 'extract-extra-bar';
        parent.parentNode.insertBefore(bar, parent.nextSibling);
      }

      if (!bar.querySelector('#ipt-teacher-wechat')) {
        bar.innerHTML = `
          <div class="teacher-input-wrap">
            <span class="teacher-lbl">被加老师微信:</span>
            <input type="text" id="ipt-teacher-wechat" class="teacher-input" placeholder="主动添加时填写老师微信" value="${escapeHtml(window.lastSelectedTeacherWechat)}" />
          </div>
          <div>
            <input type="file" id="mobile-photo-picker" accept="image/*" style="display:none;" />
            <label for="mobile-photo-picker" class="photo-upload-btn">
              ${SVG_CAMERA}
              <span>相册选名片/拍二维码</span>
            </label>
          </div>
        `;

        const ipt = bar.querySelector('#ipt-teacher-wechat');
        ipt.addEventListener('input', (e) => {
          window.lastSelectedTeacherWechat = e.target.value.trim();
          try {
            localStorage.setItem('last_teacher_wechat', window.lastSelectedTeacherWechat);
          } catch(err){}
        });

        const filePicker = bar.querySelector('#mobile-photo-picker');
        filePicker.addEventListener('change', (e) => {
          const file = e.target.files[0];
          if (file) {
            const reader = new FileReader();
            reader.onload = async (ev) => {
              const base64 = ev.target.result;
              if (window.renderPastePreview) {
                window.renderPastePreview(base64, ipt);
              }
              try {
                const res = await fetch('/api/upload-qrcode', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ imageBase64: base64 })
                });
                const data = await res.json();
                if (res.ok && data.url) {
                  window.currentBoundQrUrl = data.url;
                }
              } catch (err) {}
            };
            reader.readAsDataURL(file);
          }
        });
      }
    } catch(e) {}
  }

  // 拦截全局 fetch，自动注入 teacherWechat 与二维码
  if (!window._fetchWrappedByCompactEnhancer) {
    window._fetchWrappedByCompactEnhancer = true;
    const originalFetch = window.fetch;
    window.fetch = async function(...args) {
      try {
        const [url, config] = args;
        if (typeof url === 'string' && (url.includes('/api/customers') || url.includes('/api/finance-customers')) && config && config.method === 'POST') {
          if (config.body && typeof config.body === 'string') {
            const bodyObj = JSON.parse(config.body);
            if (!bodyObj.teacherWechat && window.lastSelectedTeacherWechat) {
              bodyObj.teacherWechat = window.lastSelectedTeacherWechat;
            }
            if (!bodyObj.qrCodeUrl && window.currentBoundQrUrl) {
              bodyObj.qrCodeUrl = window.currentBoundQrUrl;
            }
            config.body = JSON.stringify(bodyObj);
          }
        }
      } catch (e) {}
      return originalFetch.apply(this, args);
    };
  }

  function escapeHtml(str) {
    return String(str || '').replace(/[&<>"']/g, m => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[m]);
  }

  setInterval(injectExtractToolbar, 1000);
})();
