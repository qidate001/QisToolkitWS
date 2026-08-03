// src/main.js
import { createPanel } from './ui/panel';
import { toggleEditMode, getEditModeStatus, initEditMode } from './features/editMode';
import { 
  toggleSteamAdultContent, 
  checkSteamAdultContentStatus, 
  initSteamAdultContent 
} from './features/steamAdultContent';

// ===== 全局防重复标志 =====
if (typeof window.__QisToolkitWS_initialized === 'undefined') {
    window.__QisToolkitWS_initialized = false;
}

// ===== 主函数 =====
function main() {
    // 防止重复初始化（例如页面多次加载脚本）
    if (window.__QisToolkitWS_initialized) {
        console.warn('⚠️ QisToolkitWS 已初始化，跳过重复执行');
        return;
    }
    window.__QisToolkitWS_initialized = true;

    const panel = createPanel();

    // 快捷键
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Insert') {
            e.preventDefault();
            panel.toggle();
        }
    });

    // 自动恢复功能状态
    initEditMode();
    initSteamAdultContent();

    // ---- 构建面板按钮 ----
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

        // 1. 编辑模式（全局）
        const editBtn = document.createElement('button');
        editBtn.id = 'qis-btn-edit';
        editBtn.style.cssText = `
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
            letter-spacing: 0.3px;
        `;
        const updateEdit = () => {
            const active = getEditModeStatus();
            editBtn.textContent = active ? '🔴 关闭网页编辑' : '✏️ 启用网页编辑';
            editBtn.style.background = active ? '#4a2a2a' : '#2a2a3e';
            editBtn.style.borderColor = active ? '#ff6b6b' : '#45475a';
            editBtn.style.color = active ? '#ff8a8a' : '#cdd6f4';
        };
        editBtn.addEventListener('click', () => { toggleEditMode(); updateEdit(); });
        editBtn.addEventListener('mouseenter', () => { editBtn.style.background = '#313244'; });
        editBtn.addEventListener('mouseleave', updateEdit);
        updateEdit();
        container.appendChild(editBtn);

        // 2. Steam 成人内容（仅特定页面）
        const isSteamPage = window.location.href.includes('store.steampowered.com/account/preferences/');
        if (isSteamPage) {
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
                letter-spacing: 0.3px;
            `;
            const updateSteam = () => {
                const active = checkSteamAdultContentStatus();
                steamBtn.textContent = active ? '🔞 成人内容：已显示' : '🔞 成人内容：已隐藏';
                steamBtn.style.background = active ? '#4a2a2a' : '#2a2a3e';
                steamBtn.style.borderColor = active ? '#ff6b6b' : '#45475a';
                steamBtn.style.color = active ? '#ff8a8a' : '#cdd6f4';
            };
            steamBtn.addEventListener('click', () => {
                const current = checkSteamAdultContentStatus();
                toggleSteamAdultContent(!current);
                updateSteam();
            });
            steamBtn.addEventListener('mouseenter', () => { steamBtn.style.background = '#313244'; });
            steamBtn.addEventListener('mouseleave', updateSteam);
            updateSteam();
            container.appendChild(steamBtn);
        }

        // 占位
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
        container.appendChild(futureBtn);
        body.appendChild(container);
    };

    // 等待面板加载
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
    existingBody ? addFeatureButtons() : waitForPanel();

    console.log('✅ QisToolkitWS 已加载，按 Ins 键打开面板');
}

// ===== 仅在顶层窗口执行（跳过 iframe） =====
if (window.top === window.self) {
    main();
} else {
    console.log('⏭️ 在 iframe 中，跳过执行');
}