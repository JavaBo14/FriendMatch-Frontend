import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import styleImport, {VantResolve} from 'vite-plugin-style-import';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue(), styleImport({
        resolves: [VantResolve()],
    }),],
    server: {
        proxy: {
            // 在此处编写代理规则
            '/api': {
                target: 'http://localhost:8080',
                changeOrigin: true,
                rewrite: (path) => {
                    return path.replace(/\/api/, '')
                }
            }
        }
    }
})