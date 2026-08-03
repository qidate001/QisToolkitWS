// src/features/steamAdultContent.js

// ========== 配置 ==========
const SELECTORS = {
    STEAM_ADULT_CONTENT_1: '#main_content > div.two_column.right > div:nth-child(2) > div:nth-child(7)',
    STEAM_ADULT_CONTENT_2: '#main_content > div.two_column.right > div:nth-child(2) > div:nth-child(8)'
};

// ========== 核心操作函数 ==========

/**
 * 切换 Steam 成人内容显示
 * @param {boolean} show - true 显示，false 隐藏
 * @param {boolean} save - 是否保存到存储（默认 true）
 * @returns {boolean} 是否操作成功
 */
export function toggleSteamAdultContent(show, save = true) {
    try {
        const targetEl1 = document.querySelector(SELECTORS.STEAM_ADULT_CONTENT_1);
        const targetEl2 = document.querySelector(SELECTORS.STEAM_ADULT_CONTENT_2);

        if (!targetEl1 && !targetEl2) {
            console.warn('未找到 Steam 成人内容元素，可能不在正确的页面');
            return false;
        }

        if (show) {
            showSteamAdultContent(targetEl1, targetEl2);
        } else {
            hideSteamAdultContent(targetEl1, targetEl2);
        }

        if (save) {
            // 使用 GM_setValue 保存状态（需在 vite.config.js 中声明 @grant GM_setValue）
            GM_setValue('steamAdultContent', show);
            console.log(`Steam 成人内容设置已保存: ${show}`);
        }

        return true;
    } catch (error) {
        console.error('Steam 成人内容操作失败:', error);
        return false;
    }
}

/**
 * 显示成人内容（替换为可见的 HTML）
 */
function showSteamAdultContent(el1, el2) {
    if (el1) {
        el1.classList.remove('account_setting_not_customer_facing');
        el1.innerHTML = getSteamAdultContentHTML(1);
    }
    if (el2) {
        el2.classList.remove('account_setting_not_customer_facing');
        el2.innerHTML = getSteamAdultContentHTML(3);
    }
    console.log('✅ Steam 成人内容选项已显示');
}

/**
 * 隐藏成人内容（恢复为隐藏状态）
 */
function hideSteamAdultContent(el1, el2) {
    if (el1) {
        el1.classList.add('account_setting_not_customer_facing');
        el1.setAttribute('data-parentdescid', '1');
        el1.innerHTML = getEmptySteamContentHTML(4);
    }
    if (el2) {
        el2.classList.add('account_setting_not_customer_facing');
        el2.setAttribute('data-parentdescid', '4');
        el2.innerHTML = getEmptySteamContentHTML(3);
    }
    console.log('✅ Steam 成人内容选项已隐藏');
}

/**
 * 生成显示内容的 HTML
 */
function getSteamAdultContentHTML(descriptorId) {
    const texts = {
        1: {
            title: '频繁的裸露画面或色情内容&nbsp;',
            description: '主要展示裸露画面或色情主题的游戏或内容。勾选此复选框即表示您确认自己已至少年满18周岁。'
        },
        3: {
            title: '仅限成人的色情内容&nbsp;',
            description: '包含仅针对成人受众的性意味明显或露骨的游戏或内容。勾选此复选框即表示您确认自己已至少年满18 周岁。'
        }
    };
    const text = texts[descriptorId] || texts[1];
    return `
        <div class="store_pref_desc">
            <div class="account_manage_subtitle">${text.title}</div>
            <span class="account_setting_parenthetical">
                ${text.description}
                <br>
                <a href="javascript:ViewTitlesWithDescriptors(4);">查看示例产品</a>
            </span>
        </div>
        <div class="store_pref_col"><input type="checkbox" id="descriptor_${descriptorId}_store" class="content_descriptor_checkbox store" value="${descriptorId}"></div>
        <div class="community_pref_col"><input type="checkbox" id="descriptor_${descriptorId}_community" class="content_descriptor_checkbox community" value="${descriptorId}"></div>
    `;
}

/**
 * 生成隐藏内容的 HTML（占位）
 */
function getEmptySteamContentHTML(descriptorId) {
    return `
        <div class="store_pref_desc">
            <div class="account_manage_subtitle">&nbsp;</div>
            <span class="account_setting_parenthetical"><br></span>
        </div>
        <div class="store_pref_col"><input type="checkbox" id="descriptor_${descriptorId}_store" class="content_descriptor_checkbox store" value="${descriptorId}"></div>
        <div class="community_pref_col"><input type="checkbox" id="descriptor_${descriptorId}_community" class="content_descriptor_checkbox community" value="${descriptorId}"></div>
    `;
}

// ========== 状态查询 ==========

/**
 * 检查当前是否已显示成人内容
 */
export function checkSteamAdultContentStatus() {
    const targetEl = document.querySelector(SELECTORS.STEAM_ADULT_CONTENT_1);
    return targetEl && !targetEl.classList.contains('account_setting_not_customer_facing');
}

/**
 * 获取保存的设置值（默认 false）
 */
export function getSteamAdultContentSetting() {
    return GM_getValue('steamAdultContent', false);
}

// ========== 自动初始化 ==========

/**
 * 页面加载时自动执行（如果设置中为 true）
 * 应在 main.js 中调用
 */
export function initSteamAdultContent() {
    // 只在 Steam 偏好设置页面执行
    if (!window.location.href.includes('store.steampowered.com/account/preferences/')) {
        return;
    }

    const enabled = getSteamAdultContentSetting();
    if (enabled) {
        // 等待 DOM 加载完成
        const checkExist = setInterval(() => {
            const el = document.querySelector(SELECTORS.STEAM_ADULT_CONTENT_1);
            if (el) {
                clearInterval(checkExist);
                toggleSteamAdultContent(true, false); // 不重复保存
                console.log('⚙️ Steam 成人内容已自动启用（根据设置）');
            }
        }, 500);
        // 10秒后停止检查
        setTimeout(() => clearInterval(checkExist), 10000);
    }
}