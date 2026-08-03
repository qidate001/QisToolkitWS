// src/utils/helper.js
export function showHello() {
    // 在页面上显示一个提示
    const div = document.createElement('div');
    div.textContent = '👋 来自 QisToolkitWS 的问候！';
    div.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #4CAF50;
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        font-size: 16px;
        z-index: 999999;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        font-family: Arial, sans-serif;
    `;
    document.body.appendChild(div);
}