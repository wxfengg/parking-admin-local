import { resolve } from 'node:path'
import process from 'node:process'
import vue from '@vitejs/plugin-vue'
import UnoCSS from 'unocss/vite'
import AutoImport from 'unplugin-auto-import/vite'
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'
import AutoComponents from 'unplugin-vue-components/vite'
import { defineConfig, loadEnv } from 'vite'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd())

  return {
    server: {
      host: '0.0.0.0',
      port: 6606,
      open: true,
      proxy: {
        [env.VITE_APP_BASE_API_ADMIN]: {
          secure: false,
          changeOrigin: true,
          target: env.VITE_APP_API_URL,
        },
        [env.VITE_APP_BASE_API_BICYCLE]: {
          secure: false,
          changeOrigin: true,
          target: env.VITE_APP_API_URL,
        },
      },
    },
    plugins: [
      vue(),
      UnoCSS(),
      AutoImport({
      // 自动导入 Vue 相关函数，如 ref, reactive, computed 等
        imports: ['vue', '@vueuse/core', 'vue-router', 'pinia'],
        vueTemplate: true, // 允许在 Vue 模板中使用自动导入的函数
        dts: 'src/types/auto-imports.d.ts',
      }),
      AutoComponents({
        resolvers: [AntDesignVueResolver({
          importStyle: false, // css in js，不自动引入样式，使用全局引入的方式
        })],
        dts: 'src/types/auto-components.d.ts',
      }),
    ],
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src'),
      },
    },
  }
})
