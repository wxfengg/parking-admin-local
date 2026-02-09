import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate' // 引入 Pinia 持久化插件
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
// 引入 Ant Design Vue 的全量样式，在 vite.config.ts 里 importStyle 设为了 false，这行是必须的
import 'ant-design-vue/dist/reset.css'
// 引入 UnoCSS 核心样式 (这是虚拟文件，构建时自动生成)
import 'virtual:uno.css'
import '@/styles/index.css'

const app = createApp(App)
const pinia = createPinia()

pinia.use(piniaPluginPersistedstate) // 注册持久化插件
app.use(pinia).use(router).mount('#app')
