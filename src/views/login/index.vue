<script setup lang="ts">
import type { LoginDto } from '@/api/user/types'
import { LockOutlined, UserOutlined } from '@ant-design/icons-vue'
import { message } from 'ant-design-vue'
import { getCaptchaApi, loginApi } from '@/api/user'
import { useUserStore } from '@/stores'
import { encryptPassword } from '@/utils'

const router = useRouter()
const userStore = useUserStore()

const loginForm = reactive<LoginDto>({
  account: 'admin',
  password: 'hrc@2025!@',
  code: '',
})

const loading = ref(false)
const captchaImage = ref('')

// 定义一个时间戳
const timestamp = ref<string>('')
/** 获取验证码 */
async function getCodeImage() {
  // 定义一个时间戳
  const res = await getCaptchaApi(timestamp.value)
  timestamp.value = res.headers['x-captcha-key']
  // 直接创建对象URL
  const blob = new Blob([res.data], { type: 'image/jpeg' })
  captchaImage.value = URL.createObjectURL(blob)
}

async function handleLogin() {
  if (!loginForm.account || !loginForm.password || !loginForm.code) {
    message.warning('请填写完整的登录信息')
    return
  }

  loading.value = true
  try {
    const data = {
      account: loginForm.account,
      password: encryptPassword(loginForm.password) as string,
      code: loginForm.code,
      randomStr: timestamp.value,
    }
    await userStore.login(data)
    router.push('/')
    message.success('登录成功')
  }
  catch (error) {
    const errorMessage = String(error)
    errorMessage.includes('角色') ? message.error(errorMessage) : ''
    getCodeImage() // 登录失败后重新获取验证码
  }
  finally {
    loading.value = false
  }
}

// 页面加载时生成验证码
onMounted(() => {
  getCodeImage()
})
// 在组件卸载或不需要图片时清理
onUnmounted(() => {
  if (captchaImage.value) {
    URL.revokeObjectURL(captchaImage.value)
  }
})
</script>

<template>
  <div class="login-container">
    <div class="login-card">
      <div class="login-header">
        <h1 class="login-title">
          停车场管理系统
        </h1>
        <p class="login-subtitle">
          Parking Management System
        </p>
      </div>

      <a-form :model="loginForm" class="login-form" @submit.prevent="handleLogin">
        <a-form-item>
          <a-input v-model:value="loginForm.account" size="large" placeholder="请输入账号">
            <template #prefix>
              <UserOutlined class="text-gray-400" />
            </template>
          </a-input>
        </a-form-item>

        <a-form-item>
          <a-input-password v-model:value="loginForm.password" size="large" placeholder="请输入密码">
            <template #prefix>
              <LockOutlined class="text-gray-400" />
            </template>
          </a-input-password>
        </a-form-item>

        <a-form-item>
          <div class="captcha-wrapper">
            <a-input v-model:value="loginForm.code" size="large" placeholder="请输入验证码" style="flex: 1;" />
            <img v-if="captchaImage" :src="captchaImage" class="captcha-image" alt="验证码" @click="getCodeImage">
          </div>
        </a-form-item>

        <a-form-item>
          <a-button type="primary" size="large" html-type="submit" :loading="loading" class="login-button">
            登录
          </a-button>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.login-container {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 20px;
}

.login-card {
  width: 100%;
  max-width: 420px;
  padding: 48px 40px;
  background: white;
  border-radius: 16px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
}

.login-header {
  text-align: center;
  margin-bottom: 40px;
}

.login-title {
  font-size: 28px;
  font-weight: 600;
  color: #1a1a1a;
  margin: 0 0 8px 0;
}

.login-subtitle {
  font-size: 14px;
  color: #999;
  margin: 0;
}

.login-form {
  :deep(.ant-form-item) {
    margin-bottom: 24px;
  }

  :deep(.ant-input-affix-wrapper),
  :deep(.ant-input) {
    border-radius: 8px;
  }

  :deep(.ant-input-affix-wrapper-focused),
  :deep(.ant-input-affix-wrapper:focus) {
    box-shadow: 0 0 0 2px rgba(102, 126, 234, 0.1);
  }
}

.captcha-wrapper {
  display: flex;
  gap: 12px;
  align-items: center;
}

.captcha-image {
  width: 120px;
  height: 40px;
  border-radius: 8px;
  cursor: pointer;
  border: 1px solid #d9d9d9;
  transition: all 0.3s;

  &:hover {
    opacity: 0.8;
    border-color: #667eea;
  }
}

.login-button {
  width: 100%;
  height: 44px;
  font-size: 16px;
  border-radius: 8px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border: none;
  transition: all 0.3s;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(102, 126, 234, 0.3);
  }
}
</style>
