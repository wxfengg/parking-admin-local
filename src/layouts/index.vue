<script setup lang="ts">
import { Modal } from 'ant-design-vue'
import SideBar from '@/layouts/components/SideBar.vue'
import { useUserStore } from '@/stores'

const userStore = useUserStore()
const router = useRouter()
function logout() {
  Modal.confirm({
    title: '确认退出登录吗？',
    onOk() {
      userStore.logout()
      router.push('/login')
    },
  })
}
</script>

<template>
  <div class="size-screen overflow-hidden flex flex-col">
    <header class="h-54px bg-white shadow-md z-1 flex-y-center justify-between px-4 shrink-0">
      <div class="w-150px h-45px bg-bluegray rd-xl flex-center">
        智慧云停车
      </div>
      <a-button type="default" @click="logout">
        退出
      </a-button>
    </header>
    <main class="grow flex max-h-[calc(100vh-54px)] bg-#f8f8f8">
      <nav class="w-220px bg-white">
        <SideBar />
      </nav>
      <main class="grow m-4">
        <router-view>
          <template #default="{ Component, route }">
            <transition name="fade-slide" mode="out-in">
              <component :is="Component" :key="route.path" />
            </transition>
          </template>
        </router-view>
      </main>
    </main>
  </div>
</template>

<style scoped>
/* 美化滚动条 */
::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

::-webkit-scrollbar-track {
  width: 6px;
  border-radius: 2em;
}

::-webkit-scrollbar-thumb {
  min-height: 6px;
  cursor: pointer;
  background-color: #dddee0;
  background-clip: padding-box;
  border-radius: 2em;
  transition: background-color 0.3s;
}

::-webkit-scrollbar-thumb:hover {
  background-color: #c7c9cc;
}
</style>
