// src/main.js
import { createPanel } from './ui/panel';
import { 
  toggleSteamAdultContent, 
  checkSteamAdultContentStatus, 
  getSteamAdultContentSetting,
  initSteamAdultContent 
} from './features/steamAdultContent';

(function() {
    'use strict';

    const panel = createPanel();

    // 监听 Ins 键
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Insert') {
            e.preventDefault();
            panel.toggle();
        }
    });

    // ===== 自动执行 Steam 功能 =====
    initSteamAdultContent();

    // ===== 向面板添加功能按钮 =====
    const addFeatureButtons = () => {
        const body = document.getElementById('qis-panel-body');
        if (!body) return;

        body.innerHTML = '';

        const container = document.createElement('div');
        container.style.cssText = `
            padding: 24px 20px;
            display: flex;
            flex-direction: column;
            gap: 12px;
        `;

        // ---- Steam 成人内容开关 ----
        const steamBtn = document.createElement('button');
        steamBtn.id = 'qis-btn-steam';
        steamBtn.style.cssText = `
            padding: 14px 20px;
            background: #2a2a3e;
            border: 1px solid #45475a;
            border-radius: 10px;
            color: #cdd6f4;
            font-size: 15px;
            font-family: 'Segoe UI', system-ui, sans-serif;
            cursor: pointer;
            transition: all 0.25s ease;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
            font-weight: 500;
        `;

        const updateSteamButtonStyle = () => {
            const isActive = checkSteamAdultContentStatus();
            if (isActive) {
                steamBtn.textContent = '🔞 Steam 成人内容：已显示';
                steamBtn.style.background = '#4a2a2a';
                steamBtn.style.borderColor = '#ff6b6b';
                steamBtn.style.color = '#ff8a8a';
            } else {
                steamBtn.textContent = '🔞 Steam 成人内容：已隐藏';
                steamBtn.style.background = '#2a2a3e';
                steamBtn.style.borderColor = '#45475a';
                steamBtn.style.color = '#cdd6f4';
            }
        };

        steamBtn.addEventListener('click', () => {
            const currentStatus = checkSteamAdultContentStatus();
            // 切换状态（反转）
            const newStatus = !currentStatus;
            const success = toggleSteamAdultContent(newStatus);
            if (success) {
                updateSteamButtonStyle();
                console.log(`Steam 成人内容切换至: ${newStatus ? '显示' : '隐藏'}`);
            } else {
                alert('操作失败，请确保你在 Steam 偏好设置页面');
            }
        });

        steamBtn.addEventListener('mouseenter', () => {
            steamBtn.style.background = '#313244';
        });
        steamBtn.addEventListener('mouseleave', () => {
            updateSteamButtonStyle(); // 恢复正确样式
        });

        // 初始化按钮样式
        updateSteamButtonStyle();

        // ---- 其他功能占位 ----
        const futureBtn = document.createElement('button');
        futureBtn.textContent = '🧩 更多功能开发中...';
        futureBtn.style.cssText = `
            padding: 14px 20px;
            background: #1a1a2e;
            border: 1px dashed #45475a;
            border-radius: 10px;
            color: #585b70;
            font-size: 14px;
            font-family: 'Segoe UI', system-ui, sans-serif;
            cursor: not-allowed;
            opacity: 0.6;
        `;

        container.appendChild(steamBtn);
        container.appendChild(futureBtn);
        body.appendChild(container);
    };

    // 等待面板 DOM 创建
    const waitForPanel = () => {
        const checkInterval = setInterval(() => {
            const body = document.getElementById('qis-panel-body');
            if (body) {
                clearInterval(checkInterval);
                addFeatureButtons();
            }
        }, 100);
    };

    const existingBody = document.getElementById('qis-panel-body');
    if (existingBody) {
        addFeatureButtons();
    } else {
        waitForPanel();
    }

    console.log('✅ QisToolkitWS 已加载，按 Ins 键打开面板');
})();