import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate' // 引入 Pinia 持久化插件
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
// 引入样式重置 (推荐使用 tailwind compat 版本，兼容第三方组件库的样式)
import '@unocss/reset/tailwind-compat.css'
// 引入 UnoCSS 核心样式 (这是虚拟文件，构建时自动生成)
import 'virtual:uno.css'
import '@/styles/index.css'

const app = createApp(App)
const pinia = createPinia()

pinia.use(piniaPluginPersistedstate) // 注册持久化插件
app.use(pinia).use(router).mount('#app')
