import type { LoginDto } from '@/api/user/types'
import request from '@/utils/request'

const adminBaseUrl = import.meta.env.VITE_APP_BASE_API_ADMIN

/** 获取验证码 */
export function getCaptchaApi(timestamp: string) {
  return request({
    url: `${adminBaseUrl}/code/image?randomStr=${timestamp}`,
    method: 'get',
    responseType: 'blob',
  })
}

/** 登录 */
export function loginApi(data: LoginDto) {
  return request({
    url: `${adminBaseUrl}/user/login`,
    method: 'post',
    data,
  })
}

/** 登录后获取用户信息和菜单权限 */
export function userInfoApi() {
  return request({
    url: `${adminBaseUrl}/user/profile`,
    method: 'get',
  })
}
