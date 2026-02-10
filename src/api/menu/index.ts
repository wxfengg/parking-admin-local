import type { UserMenusVo } from '@/api/menu/types'
import type { ApiResult } from '@/types/global'
import request from '@/utils/request'

const adminBaseUrl = import.meta.env.VITE_APP_BASE_API_ADMIN

/** 获取路由菜单 */
export function getRoutesApi() {
  return request<ApiResult<UserMenusVo[]>>({
    url: `${adminBaseUrl}/menu/routes`,
    method: 'get',
  })
}
