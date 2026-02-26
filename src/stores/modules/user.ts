import type { LoginDto, UserProfileVo } from '@/api/user/types'
import { loginApi, userProfileApi } from '@/api/user'
import { API_RESULT_CODE } from '@/utils/request'
import { usePermissionStore } from './permission'
import { useTagsViewStore } from './tagsView'

export const useUserStore = defineStore('user', () => {
  const token = ref('')
  const userInfo = ref<UserProfileVo>({})

  const isLoggedIn = computed(() => !!token.value)

  /** 初始化(清除用户、token信息) */
  function initialize() {
    userInfo.value = {}
    token.value = ''
  }

  /** 获取用户信息 */
  async function getUserInfo() {
    try {
      const { code, data } = await userProfileApi()
      if (code === API_RESULT_CODE.SUCCESS) {
        userInfo.value = data
        return data
      }
    }
    catch (error) {
      userInfo.value = {}
      return Promise.reject(error)
    }
  }

  /** 登录 */
  async function login(dto: LoginDto) {
    try {
      const { data } = await loginApi(dto)
      token.value = data
      if (!data) {
        return Promise.reject(new Error('登录失败，未获取到 token'))
      }
      return data
    }
    catch (error) {
      return Promise.reject(error)
    }
  }

  /** 退出登录 */
  function logout() {
    // 清除用户信息和 token
    initialize()
    // 同步清除路由缓存和标签页数据
    const permissionStore = usePermissionStore()
    permissionStore.resetRoutes()
    const tagsViewStore = useTagsViewStore()
    tagsViewStore.clearAll()
  }

  return {
    token,
    userInfo,
    isLoggedIn,
    login,
    logout,
    getUserInfo,
  }
}, {
  // 开启持久化，数据将被保存在 localStorage 中
  // 只存储 token 字段，因为 userInfo 会通过刷新页面重新从接口获取
  persist: {
    key: 'local-parking-user',
    pick: ['token'],
  },
})
