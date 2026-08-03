// src/main.js
import { createPanel } from './ui/panel';
import { toggleEditMode, getEditModeStatus, initEditMode } from './features/editMode';

(function() {
    'use strict';

    // 1. 初始化面板
    const panel = createPanel();

    // 2. 监听 Ins 键
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Insert') {
            e.preventDefault();
            panel.toggle();
        }
    });

    // 3. 初始化编辑模式状态（同步页面的 designMode）
    initEditMode();

    // 4. 往面板内容区添加功能按钮
    const addFeatureButtons = () => {
        const body = document.getElementById('qis-panel-body');
        if (!body) return;

        // 清空占位内容
        body.innerHTML = '';

        // 创建功能按钮容器
        const container = document.createElement('div');
        container.style.cssText = `
            padding: 24px 20px;
            display: flex;
            flex-direction: column;
            gap: 12px;
        `;

        // ---- 编辑模式按钮 ----
        const editBtn = document.createElement('button');
        editBtn.id = 'qis-btn-edit';
        editBtn.textContent = '✏️ 启用网页编辑';
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
        editBtn.addEventListener('mouseenter', () => {
            editBtn.style.background = '#313244';
        });
        editBtn.addEventListener('mouseleave', () => {
            // 根据编辑状态恢复背景色
            updateEditButtonStyle();
        });

        // 更新按钮样式（根据当前状态）
        const updateEditButtonStyle = () => {
            const isActive = getEditModeStatus();
            if (isActive) {
                editBtn.textContent = '🔴 关闭网页编辑';
                editBtn.style.background = '#4a2a2a';
                editBtn.style.borderColor = '#ff6b6b';
                editBtn.style.color = '#ff8a8a';
            } else {
                editBtn.textContent = '✏️ 启用网页编辑';
                editBtn.style.background = '#2a2a3e';
                editBtn.style.borderColor = '#45475a';
                editBtn.style.color = '#cdd6f4';
            }
        };

        // 点击事件：切换编辑模式
        editBtn.addEventListener('click', () => {
            const newStatus = toggleEditMode();
            updateEditButtonStyle();
            // 提示用户当前状态（可选）
            console.log(`📝 编辑模式: ${newStatus ? '已开启' : '已关闭'}`);
        });

        // 初始化按钮样式
        updateEditButtonStyle();

        // ---- 其他功能按钮占位（后续可继续添加） ----
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

        container.appendChild(editBtn);
        container.appendChild(futureBtn);
        body.appendChild(container);
    };

    // 由于面板内容是动态创建的，需要等面板 DOM 出现后才能添加按钮
    // 用一个 MutationObserver 或者直接延迟执行
    const waitForPanel = () => {
        const checkInterval = setInterval(() => {
            const body = document.getElementById('qis-panel-body');
            if (body) {
                clearInterval(checkInterval);
                addFeatureButtons();
            }
        }, 100);
    };

    // 如果面板还未创建，等待它出现；如果已存在则直接添加
    const existingBody = document.getElementById('qis-panel-body');
    if (existingBody) {
        addFeatureButtons();
    } else {
        waitForPanel();
    }

    console.log('✅ QisToolkitWS 已加载，按 Ins 键打开面板');
})();