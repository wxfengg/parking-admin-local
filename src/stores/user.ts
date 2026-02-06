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
  }

  return {
    token,
    userInfo,
    isLoggedIn,
  }
})
