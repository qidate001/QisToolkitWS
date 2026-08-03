// vite.config.js
import { defineConfig } from 'vite';
import monkey from 'vite-plugin-monkey';

export default defineConfig({
    plugins: [
        monkey({
            entry: 'src/main.js',
            userscript: {
                name: 'QisToolkitWS',
                namespace: 'com.qistoolkit',
                version: '0.0.1',
                description: 'QisToolkitWS 工具箱',
                author: '齐',
                match: ['*://*/*'],
                grant: [
                    'GM_setValue',
                    'GM_getValue',
                ],
            },
            server: {
                open: true,
            },
        }),
    ],
    // ===== 新增 build 配置 =====
    // build: {
    //     minify: false,                 // 关闭压缩，保留可读格式
    //     rollupOptions: {
    //         output: {
    //             indent: '    ',        // 使用 4 个空格缩进
    //         },
    //     },
    // },
});