import type { AxiosPromise } from 'axios'
import type { LoginDto, UserProfileVo } from '@/api/user/types'
import type { ApiResult } from '@/types/global'
import request from '@/utils/request'

const adminBaseUrl = import.meta.env.VITE_APP_BASE_API_ADMIN

/** 获取验证码 */
export function getCaptchaApi(timestamp: string) {
  return request<AxiosPromise<BlobPart>>({
    url: `${adminBaseUrl}/code/image?randomStr=${timestamp}`,
    method: 'get',
    responseType: 'blob',
  })
}

/** 登录 */
export function loginApi(data: LoginDto) {
  return request<ApiResult<string>>({
    url: `${adminBaseUrl}/user/login`,
    method: 'post',
    data,
  })
}

/** 登录后获取用户信息(包括角色、权限) */
export function userProfileApi() {
  return request<ApiResult<UserProfileVo>>({
    url: `${adminBaseUrl}/user/profile`,
    method: 'get',
  })
}
