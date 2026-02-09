import type { RouteRecordRaw } from 'vue-router'
import { routes as constantRoutes } from '@/router'
import { dynamicRoutes } from '@/router/routes'

export const usePermissionStore = defineStore('permission', () => {
  // 所有路由（静态路由 + 动态路由）
  const routes = ref<RouteRecordRaw[]>([])

  // 获取全部路由（静态路由 + 动态路由）
  function generateRoutes() {
    // todo 这里直接使用静态路由作为示例，实际项目中应该根据用户权限动态生成路由
    routes.value = [...constantRoutes, ...dynamicRoutes]
  }

  return {
    routes,
    generateRoutes,
  }
})
