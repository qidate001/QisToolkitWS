// src/main.js
import { createPanel } from './ui/panel';

(function() {
    'use strict';

    // 1. 初始化面板
    const panel = createPanel();

    // 2. 监听键盘事件
    document.addEventListener('keydown', (e) => {
        // 按下 Insert 键（注意：部分键盘标记为 'Insert'，代码里是 'Insert'）
        if (e.key === 'Insert') {
            e.preventDefault();  // 防止触发浏览器自带的覆盖模式切换
            panel.toggle();
        }
    });

    console.log('✅ QisToolkitWS 已加载，按 Ins 键打开面板');
})();