import { resolve } from 'node:path'
import vue from '@vitejs/plugin-vue'
import UnoCSS from 'unocss/vite'
import AutoImport from 'unplugin-auto-import/vite'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [
    vue(),
    UnoCSS(),
    AutoImport({
      // 自动导入 Vue 相关函数，如 ref, reactive, computed 等
      imports: ['vue', '@vueuse/core', 'vue-router', 'pinia'],
      vueTemplate: true, // 允许在 Vue 模板中使用自动导入的函数
      dts: 'src/types/auto-imports.d.ts',
    }),
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
})
