import type { RouteRecordRaw } from 'vue-router'
import type { UserMenusVo } from '@/api/menu/types'
import { getRoutesApi } from '@/api/menu'
import { routes as constantRoutes } from '@/router'

const modules = import.meta.glob('../../views/**/**.vue')
const Layout = () => import('@/layouts/index.vue')

export const usePermissionStore = defineStore('permission', () => {
  // 所有路由（静态路由 + 动态路由）
  const routes = ref<RouteRecordRaw[]>([...constantRoutes])
  const isRoutesLoaded = ref(false)
  const cacheDynamicRoutes = ref<UserMenusVo[]>([]) // 缓存动态路由，刷新页面后重新加载

  // 动态路由
  async function getDynamicRoutes() {
    if (isRoutesLoaded.value) {
      return []
    }

    try {
      let dynamicRoutes: RouteRecordRaw[] = []
      if (cacheDynamicRoutes.value.length) {
        dynamicRoutes = transformRoutes(cacheDynamicRoutes.value)
      }
      else {
        const { data } = await getRoutesApi()
        cacheDynamicRoutes.value = data // 缓存原始动态路由数据
        dynamicRoutes = transformRoutes(data)
      }

      routes.value = [...constantRoutes, ...dynamicRoutes]
      isRoutesLoaded.value = true

      return dynamicRoutes
    }
    catch (error) {
      routes.value = [...constantRoutes]
      isRoutesLoaded.value = false
      return Promise.reject(error)
    }
  }

  // 静默检测路由是否变化，如果变化则重新加载动态路由
  async function refreshDynamicRoutes() {
    try {
      const { data } = await getRoutesApi()
      const newCache = JSON.stringify(data)
      const oldCache = JSON.stringify(cacheDynamicRoutes.value)
      if (newCache !== oldCache) {
        cacheDynamicRoutes.value = data
        const dynamicRoutes = transformRoutes(data)
        routes.value = [...constantRoutes, ...dynamicRoutes]
        return dynamicRoutes // 通知调用方重新 addRoute
      }

      return null
    }
    catch (error) {
      return null
    }
  }

  /** 重置路由，清除动态路由和缓存 */
  function resetRoutes() {
    routes.value = [...constantRoutes]
    cacheDynamicRoutes.value = []
    isRoutesLoaded.value = false
  }

  return {
    routes,
    cacheDynamicRoutes,
    isRoutesLoaded,
    getDynamicRoutes,
    refreshDynamicRoutes,
    resetRoutes,
  }
}, {
  persist: {
    key: 'local-parking-permission',
    pick: ['cacheDynamicRoutes'], // 只持久化缓存的动态路由数据
  },
})

/**
 * 转换后端路由数据为Vue Router配置
 * 处理组件路径映射和Layout层级嵌套
 */
function transformRoutes(routes: UserMenusVo[], isTopLevel: boolean = true): RouteRecordRaw[] {
  return routes.map((route) => {
    const { component, children, path, ...args } = route

    // 处理组件：顶层或非Layout保留组件，中间层Layout设为undefined
    const processedComponent = isTopLevel || component !== 'Layout' ? component : undefined

    const normalizedRoute = {
      path: normalizeRoutePath(path, isTopLevel),
      ...(args as unknown as Record<string, unknown>),
    } as RouteRecordRaw

    if (!processedComponent) {
      // 多级菜单的父级菜单，不需要组件
      normalizedRoute.component = undefined
    }
    else {
      // 动态导入组件，Layout特殊处理，找不到组件时返回404
      normalizedRoute.component
        = processedComponent === 'Layout' ? Layout : resolveViewComponent(processedComponent)
    }

    // 递归处理子路由
    if (children && children.length > 0) {
      normalizedRoute.children = transformRoutes(children, false)
    }

    return normalizedRoute
  })
}

/** 规范化路由路径，顶层路由确保以"/"开头，子路由去除多余的"/" */
function normalizeRoutePath(path: string, isTopLevel: boolean) {
  const trimmed = (path ?? '').trim()
  if (!trimmed) {
    return trimmed
  }

  if (isTopLevel) {
    return trimmed.startsWith('/') ? trimmed : `/${trimmed}`
  }

  return trimmed.replace(/^\/+/, '')
}

function resolveViewComponent(componentPath: string) {
  const normalized = componentPath
    .trim()
    .replace(/^\/+/, '')
    .replace(/\.vue$/i, '')
  return (
    modules[`../../views/${normalized}.vue`]
    || modules[`../../views/${normalized}/index.vue`]
    || modules[`../../views/error/404.vue`]
  )
}
