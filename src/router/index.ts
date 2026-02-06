import type { RouteRecordRaw } from 'vue-router'
import nProgress from 'nprogress'
import { createRouter, createWebHashHistory } from 'vue-router'
import 'nprogress/nprogress.css'

// NProgress 进度条配置
nProgress.configure({ showSpinner: false })

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/home',
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import('@/views/Home.vue'),
    meta: { title: '首页' },
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('@/views/About.vue'),
    meta: { title: '关于我们' },
  },
  {
    path: '/me',
    name: 'Me',
    component: () => import('@/views/Me.vue'),
    meta: { title: '联系我' },
  },
  // 404 路由捕获 (必须放在最后)
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('@/views/error/404.vue'),
    meta: { title: '404 - 页面不存在' },
  },
]

const router = createRouter({
  routes,
  // hash模式路由模式
  history: createWebHashHistory(),
  // 刷新或者切换路由时，滚动条自动回到顶部
  scrollBehavior: () => ({ left: 0, top: 0 }),
})

const whiteList = ['/login']
console.log('🚀 ~ whiteList:', whiteList)
// 路由前置守卫
router.beforeEach((to, from, next) => {
  // 开启进度条
  nProgress.start()

  document.title = to.meta.title as string

  next()
})

// 路由后置守卫
router.afterEach(() => nProgress.done()) // 关闭进度条

export default router
