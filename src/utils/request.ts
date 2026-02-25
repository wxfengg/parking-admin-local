import type { AxiosError, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios'
import type { ApiResult } from '@/types/global'
import { message, Modal } from 'ant-design-vue'
import axios from 'axios'
import nProgress from 'nprogress'
import { useUserStore } from './../stores/modules/user'

// 后端 API 返回的状态码常量
export const API_RESULT_CODE = {
  SUCCESS: 200,
  TOKEN_INVALID: 11012,
} as const

// 创建 axios 示例
const instance = axios.create({
  timeout: 10000, // 请求超时时间 10s
  headers: { 'Content-Type': 'application/json;charset=utf-8' },
})

// 请求拦截器
instance.interceptors.request.use(
  // 成功的请求
  (config: InternalAxiosRequestConfig) => {
    nProgress.start() // 开启进度条
    const userStore = useUserStore()
    if (userStore.token) {
      // 如果用户已登录，添加 Authorization 头
      config.headers.Authorization = userStore.token
    }
    return config
  },
  // 失败的请求
  (error: AxiosError) => {
    nProgress.done() // 关闭进度条
    return Promise.reject(error)
  },
)

// 响应拦截器
instance.interceptors.response.use((response: AxiosResponse) => {
  nProgress.done() // 关闭进度条

  // 检查配置的响应类型是否为二进制类型（'blob' 或 'arraybuffer'）, 如果是，直接返回数据流
  const { responseType } = response.config
  if (responseType === 'blob' || responseType === 'arraybuffer') {
    return response
  }

  const { code, msg } = response.data

  if (code !== API_RESULT_CODE.SUCCESS) {
    message.error(msg || '请求出错')
    return Promise.reject(new Error(msg || '请求出错'))
  }

  return response.data
}, (error: AxiosError) => {
  nProgress.done() // 关闭进度条

  const errorData = error.response?.data
  if (errorData) {
    const { code, msg } = errorData as { code: number, msg: string }
    if (code === API_RESULT_CODE.TOKEN_INVALID) {
      Modal.warning({
        title: '提示',
        content: '您的登录信息已过期，请重新登录。',
        okText: '重新登录',
        keyboard: false,
        onOk() {
          const userStore = useUserStore()
          userStore.clearToken() // 清除 token 和用户信息
          location.reload() // 刷新页面，重置应用状态
        },
      })
    }
    else {
      message.error(msg || '请求出错')
    }
  }

  return Promise.reject(error.message)
})

// 导出一个包装了 axios 实例的函数，允许调用时指定响应数据的类型
export default function request<T>(config: AxiosRequestConfig) {
  return instance(config) as Promise<T>
}
