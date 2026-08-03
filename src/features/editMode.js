// src/features/editMode.js

let isEditMode = false;

/**
 * 切换网页编辑模式
 */
const toggleEditMode = () => {
  isEditMode = !isEditMode;
  document.designMode = isEditMode ? 'on' : 'off';
  
  // 给页面加个视觉提示（在左上角显示状态）
  updateStatusIndicator();
  
  return isEditMode;
};

/**
 * 显示/隐藏状态指示器
 */
const updateStatusIndicator = () => {
  let indicator = document.getElementById('qis-edit-indicator');
  
  if (!indicator) {
    // 创建指示器
    indicator = document.createElement('div');
    indicator.id = 'qis-edit-indicator';
    indicator.style.cssText = `
      position: fixed;
      top: 12px;
      left: 50%;
      transform: translateX(-50%);
      z-index: 999998;
      padding: 6px 18px;
      border-radius: 20px;
      font-size: 13px;
      font-family: 'Segoe UI', system-ui, sans-serif;
      font-weight: 500;
      letter-spacing: 0.5px;
      box-shadow: 0 4px 16px rgba(0,0,0,0.3);
      transition: all 0.3s ease;
      pointer-events: none;
      user-select: none;
    `;
    document.body.appendChild(indicator);
  }
  
  if (isEditMode) {
    indicator.textContent = '✏️ 编辑模式已启用 — 点击任意文字修改，按 Delete 删除元素';
    indicator.style.background = 'rgba(76, 175, 80, 0.92)';
    indicator.style.color = '#fff';
    indicator.style.border = '1px solid rgba(255,255,255,0.2)';
    indicator.style.opacity = '1';
    indicator.style.transform = 'translateX(-50%) translateY(0)';
  } else {
    indicator.style.opacity = '0';
    indicator.style.transform = 'translateX(-50%) translateY(-20px)';
    // 动画结束后移除 DOM（可选）
    setTimeout(() => {
      if (!isEditMode && document.getElementById('qis-edit-indicator')) {
        // 不删除，留着下次复用，只是隐藏了
      }
    }, 300);
  }
};

/**
 * 获取当前编辑状态
 */
const getEditModeStatus = () => isEditMode;

/**
 * 初始化（如果页面已有 designMode 开启，同步状态）
 */
const initEditMode = () => {
  if (document.designMode === 'on') {
    isEditMode = true;
    updateStatusIndicator();
  }
};

export {
  toggleEditMode,
  getEditModeStatus,
  initEditMode,
};