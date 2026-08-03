// src/ui/panel.js

const createPanelHTML = () => {
    return `
        <div id="qis-panel-container" style="display: none;">
        <div id="qis-panel">
            <div id="qis-panel-header">
            <span id="qis-panel-title">⚙️ QisToolkitWS</span>
            <button id="qis-panel-close">✕</button>
            </div>
            <div id="qis-panel-body">
            <div style="padding: 20px; color: #aaa; text-align: center; font-size: 14px;">
                🚀 工具箱已加载<br>
                <span style="font-size: 12px; color: #666;">功能开发中，敬请期待...</span>
            </div>
            </div>
            <div id="qis-panel-footer">
            <span>v0.0.1</span>
            </div>
        </div>
        </div>
    `;
};

const injectPanelStyles = () => {
    const style = document.createElement('style');
    style.id = 'qis-panel-styles';
    style.textContent = `
        /* ===== 遮罩层 ===== */
        #qis-panel-container {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.6);
        backdrop-filter: blur(4px);
        z-index: 999999;
        display: none;
        animation: qisFadeIn 0.25s ease;
        }

        /* ===== 面板 ===== */
        #qis-panel {
        /* 使用 margin: auto 居中，彻底解放 transform */
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        margin: auto;
        width: 560px;
        max-width: 90vw;
        max-height: 80vh;
        background: #1a1a2e;
        border: 1px solid #313244;
        border-radius: 16px;
        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.8);
        display: flex;
        flex-direction: column;
        overflow: hidden;
        /* 动画只控制缩放和上移，不影响定位 */
        animation: qisSlideUp 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        /* ===== 标题栏 ===== */
        #qis-panel-header {
        padding: 16px 20px;
        background: #0f0f1a;
        border-bottom: 1px solid #2a2a3e;
        display: flex;
        justify-content: space-between;
        align-items: center;
        user-select: none;
        cursor: move;
        }
        #qis-panel-title {
        font-size: 18px;
        font-weight: 600;
        color: #e0e0e0;
        font-family: 'Segoe UI', system-ui, sans-serif;
        letter-spacing: 0.5px;
        }
        #qis-panel-close {
        background: none;
        border: none;
        color: #888;
        font-size: 22px;
        cursor: pointer;
        padding: 0 8px;
        line-height: 1;
        transition: color 0.2s, transform 0.2s;
        }
        #qis-panel-close:hover {
        color: #ff6b6b;
        transform: rotate(90deg);
        }

        /* ===== 内容区 ===== */
        #qis-panel-body {
        flex: 1;
        padding: 0;
        background: #1a1a2e;
        color: #cdd6f4;
        font-family: 'Segoe UI', system-ui, sans-serif;
        overflow-y: auto;
        min-height: 200px;
        }
        #qis-panel-body::-webkit-scrollbar {
        width: 6px;
        }
        #qis-panel-body::-webkit-scrollbar-track {
        background: #1a1a2e;
        }
        #qis-panel-body::-webkit-scrollbar-thumb {
        background: #45475a;
        border-radius: 3px;
        }

        /* ===== 底部 ===== */
        #qis-panel-footer {
        padding: 10px 20px;
        background: #0f0f1a;
        border-top: 1px solid #2a2a3e;
        color: #585b70;
        font-size: 12px;
        font-family: 'Segoe UI', system-ui, sans-serif;
        text-align: right;
        }

        /* ===== 动画 ===== */
        @keyframes qisFadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
        }
        @keyframes qisSlideUp {
        from {
            opacity: 0;
            transform: scale(0.95) translateY(20px);
        }
        to {
            opacity: 1;
            transform: scale(1) translateY(0);
        }
        }
    `;
    document.head.appendChild(style);
};

export const createPanel = () => {
    // 注入样式和 HTML（只一次）
    if (!document.getElementById('qis-panel-styles')) {
        injectPanelStyles();
    }
    if (!document.getElementById('qis-panel-container')) {
        document.body.insertAdjacentHTML('beforeend', createPanelHTML());
    }

    const container = document.getElementById('qis-panel-container');
    const panelEl = document.getElementById('qis-panel');
    const closeBtn = document.getElementById('qis-panel-close');

    let isVisible = false;

    // ===== 显示 =====
    const show = () => {
        // 重置面板为居中状态（恢复 margin: auto，清除 left/top）
        panelEl.style.left = '0';
        panelEl.style.top = '0';
        panelEl.style.right = '0';
        panelEl.style.bottom = '0';
        panelEl.style.margin = 'auto';
        panelEl.style.transform = ''; // 清除拖拽时设置的 transform
        container.style.display = 'block';
        isVisible = true;
    };

    // ===== 隐藏 =====
    const hide = () => {
        container.style.display = 'none';
        isVisible = false;
    };

    // ===== 切换 =====
    const toggle = () => {
        isVisible ? hide() : show();
    };

    // ===== 关闭按钮 =====
    if (closeBtn) {
        closeBtn.addEventListener('click', hide);
    }

    // ===== 点击遮罩空白处关闭 =====
    container.addEventListener('click', (e) => {
        if (e.target === container) {
            hide();
        }
    });

    // ===== ESC 关闭 =====
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && isVisible) {
            hide();
        }
    });

    // ============================================
    // ===== 拖拽功能（适配 margin:auto 居中） =====
    // ============================================
    const header = document.getElementById('qis-panel-header');
    let isDragging = false;
    let offsetX = 0, offsetY = 0;

    if (header && panelEl) {
        header.addEventListener('mousedown', (e) => {
            if (e.target.tagName === 'BUTTON') return;

            isDragging = true;

            // 1. 获取面板当前在视口中的位置和尺寸
            const rect = panelEl.getBoundingClientRect();

            // ===== 🆕 关键修复：固定当前高度，防止拖拽时回缩 =====
            panelEl.style.height = rect.height + 'px';

            // 2. 切换到 left/top 定位（清除 margin:auto 和 right/bottom）
            panelEl.style.right = 'auto';
            panelEl.style.bottom = 'auto';
            panelEl.style.margin = '0';
            panelEl.style.left = rect.left + 'px';
            panelEl.style.top = rect.top + 'px';
            panelEl.style.transform = 'none';

            // 3. 记录鼠标偏移
            offsetX = e.clientX - rect.left;
            offsetY = e.clientY - rect.top;

            document.body.style.userSelect = 'none';

            document.addEventListener('mousemove', onMouseMove);
            document.addEventListener('mouseup', onMouseUp);
        });

        const onMouseMove = (e) => {
            if (!isDragging) return;

            let newLeft = e.clientX - offsetX;
            let newTop = e.clientY - offsetY;

            // 边界限制
            const panelWidth = panelEl.offsetWidth;
            const panelHeight = panelEl.offsetHeight;
            const maxX = window.innerWidth - panelWidth;
            const maxY = window.innerHeight - panelHeight;
            newLeft = Math.max(0, Math.min(newLeft, maxX));
            newTop = Math.max(0, Math.min(newTop, maxY));

            panelEl.style.left = newLeft + 'px';
            panelEl.style.top = newTop + 'px';
        };

        const onMouseUp = () => {
            isDragging = false;
            document.body.style.userSelect = '';
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp);
        };
    }

    return {
        show,
        hide,
        toggle,
        get visible() { return isVisible; },
    };
};