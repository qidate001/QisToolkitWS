// vite.config.js
import { defineConfig } from 'vite';
import monkey from 'vite-plugin-monkey';

export default defineConfig({
    plugins: [
        monkey({
            // 入口文件
            entry: 'src/main.js',
            
            // 油猴脚本头部信息
            userscript: {
                name: 'QisToolkitWS',
                namespace: 'com.qistoolkit',
                version: '0.0.1',
                description: '我的 QisToolkitWS 工具箱',
                author: '齐',
                
                // ⚠️ 重要！改成你要运行脚本的网站
                match: ['https://*/*'],
                // 或者用 'https://*/*' 匹配所有网站（谨慎使用）
                
                // 如果需要操作 GM_* API，在这里声明
                // grant: ['GM_setValue', 'GM_getValue'],
            },
            
            // 开发时的额外配置
            server: {
                // 自动打开安装页（默认就是 true）
                open: true,
            },
        }),
    ],
});