# QisToolkitWS

> **Qis Toolkit Web Script** —— 一个面向网页的高效工具箱，通过 `Ins` 键快速唤起黑色主题面板，集成多种实用工具。

[![GitHub License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](LICENSE)
[![GitHub stars](https://img.shields.io/github/stars/qidate001/QisToolkitWS)](https://github.com/qidate001/QisToolkitWS/stargazers)
[![TamperMonkey](https://img.shields.io/badge/TamperMonkey-支持-green)](https://www.tampermonkey.net/)

---

## ✨ 功能特性

- 🚀 **一键唤起**：按 `Ins` 键打开优雅的黑色主题面板，按 `Esc` 或点击遮罩快速关闭。
- ✏️ **网页编辑模式**：一键开启/关闭页面内容的直接编辑，支持修改文字、删除元素（按 `Delete` 键）。
- 🔞 **Steam 成人内容修正**（仅 Steam 偏好设置页面显示）：恢复 Steam 默认隐藏的两个成人内容筛选选项，让你的偏好设置完整可见。
- 💾 **状态持久化**：使用 `GM_setValue` / `GM_getValue` 保存功能开关状态，刷新页面自动恢复。
- 🧩 **模块化架构**：基于 ES Module 拆分功能，易于扩展和维护。

> 更多功能持续开发中（B 站净化、页面截图、数据导出等）。

---

## 📦 安装与使用

### 前提条件

- 浏览器已安装 **Tampermonkey** 或 **Violentmonkey** 等油猴扩展。
- （开发模式）Node.js 环境（≥ v16）。

### 安装预编译版（直接从 Release 下载）

1. 前往 [Releases](https://github.com/qidate001/QisToolkitWS/releases) 下载最新的 `qistoolkitws.user.js`。
2. 打开 Tampermonkey 面板，选择“实用工具” → “导入”，或直接将文件拖入扩展管理界面进行安装。
3. 访问任意支持页面，按 `Ins` 键呼出面板。

### 从源码构建（开发者）

```bash
# 克隆仓库
git clone https://github.com/qidate001/QisToolkitWS.git
cd QisToolkitWS

# 安装依赖
npm install

# 开发模式（热更新 + 自动安装脚本）
npm run dev

# 构建最终脚本（输出到 dist/）
npm run build
```