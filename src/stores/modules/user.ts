export const useUserStore = defineStore('user', () => {
  // State
  const token = ref('')
  const userInfo = ref({})

  // Getters
  const isLoggedIn = computed(() => !!token.value)

  // Actions
  function initialize() {
    userInfo.value = {}
  }

  function clearToken() {
    token.value = ''
    initialize()
  }

  return {
    token,
    userInfo,
    isLoggedIn,
    clearToken,
  }
}, {
  // 开启持久化，数据将被保存在 localStorage 中
  // 只存储 token 字段，因为 userInfo 会通过刷新页面重新从接口获取
  persist: {
    pick: ['token'],
  },
})
