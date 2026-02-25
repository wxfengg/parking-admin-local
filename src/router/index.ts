import type { RouteRecordRaw } from 'vue-router'
import nProgress from 'nprogress'
import { createRouter, createWebHashHistory } from 'vue-router'
import { usePermissionStore, useUserStore } from '@/stores'
import 'nprogress/nprogress.css'

// NProgress 进度条配置
nProgress.configure({ showSpinner: false })

const Layout = () => import('@/layouts/index.vue')
export const routes: Array<RouteRecordRaw> = [
  {
    path: '/login',
    component: () => import('@/views/login/index.vue'),
    meta: { hidden: true },
  },
  {
    path: '/',
    name: '/',
    redirect: '/home',
    component: Layout,
    meta: { title: '首页' },
    children: [
      {
        path: 'home',
        name: 'Home',
        component: () => import('@/views/Home.vue'),
        meta: { title: '首页' },
      },
      // 404 路由捕获 (必须放在最后)
      {
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        component: () => import('@/views/error/404.vue'),
        meta: { title: '404 - 页面不存在', hidden: true },
      },
    ],
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
// 路由前置守卫
router.beforeEach(async (to, _from, next) => {
  // 开启进度条
  nProgress.start()

  document.title = to.meta.title as string

  const userStore = useUserStore()
  const { isLoggedIn } = storeToRefs(userStore)

  if (!isLoggedIn.value) {
    if (whiteList.includes(to.path)) {
      // 在免登录的白名单中，直接进入
      next()
    }
    else {
      // 其他没有访问权限的页面被重定向到登录页面
      next('/login')
    }
    nProgress.done()
    return
  }

  // 已登录用户访问登录页，重定向到主页
  if (to.path === '/login') {
    next('/')
    nProgress.done()
    return
  }

  const permissionStore = usePermissionStore()
  // 刷新页面后，重新获取用户信息和动态路由
  if (!permissionStore.isRoutesLoaded) {
    await userStore.getUserInfo()
    const dynamicRoutes = await permissionStore.getDynamicRoutes()
    dynamicRoutes.forEach((route: RouteRecordRaw) => router.addRoute(route))
  }
  next()
})

// 路由后置守卫
router.afterEach(() => nProgress.done()) // 关闭进度条

export default router
