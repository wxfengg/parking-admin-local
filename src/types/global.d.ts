/**
 * 扩展 vue-router 路由元信息
 */
declare module 'vue-router' {
  interface RouteMeta {
    title?: string
    icon?: string
    hidden?: boolean
    /** 是否缓存该页面（白名单模式，默认不缓存） */
    keepAlive?: boolean
    /** 是否固定在标签栏（不可关闭） */
    affix?: boolean
  }
}

/**
 * 分页请求参数
 */
export interface PageRequest<T> {
  current: number
  size: number
  model?: T
  order?: string
}

/**
 * 后端Api的响应结构
 */
export interface ApiResult<T = any> {
  code: number
  msg: string
  data: T
  success: boolean
}

/**
 * 分页数据后端的响应结构
 */
export interface PageResult<T> {
  code: number
  msg: string
  data: {
    list: T[]
    total: number
    pageNum: number
    pageSize: number
  }
  success: boolean
}
