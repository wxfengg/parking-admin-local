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
