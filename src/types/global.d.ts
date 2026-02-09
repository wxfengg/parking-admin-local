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
 * 分页数据后端的响应结构
 */
export interface PageResult<T> {
  list: T[]
  total: number
  pageNum: number
  pageSize: number
}

/**
 * 后端的响应结构
 */
export interface ApiResult<T> {
  code: number
  message: string
  data: T
}
