<script setup lang="ts">
import { Modal } from 'ant-design-vue'
import SideBar from '@/layouts/components/SideBar.vue'
import TagsView from '@/layouts/components/TagsView.vue'
import { useTagsViewStore, useUserStore } from '@/stores'

const userStore = useUserStore()
const tagsViewStore = useTagsViewStore()
const router = useRouter()
const route = useRoute()

const cachedViews = computed(() => tagsViewStore.cachedViews)

// 初始化固定标签（首页）
onMounted(() => {
  tagsViewStore.initAffixTags([{
    path: '/home',
    name: 'Home',
    title: '首页',
    affix: true,
  }])
  // 当前路由也需要添加标签
  tagsViewStore.addView(route)
})

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
    <section class="grow flex h-[calc(100vh-54px)] bg-#f8f8f8">
      <nav class="w-220px bg-white">
        <SideBar />
      </nav>
      <div class="grow flex flex-col overflow-hidden">
        <TagsView />
        <main class="grow p-3 overflow-hidden">
          <router-view v-slot="{ Component, route: viewRoute }">
            <transition name="fade-slide" mode="out-in">
              <keep-alive :include="cachedViews">
                <component :is="Component" :key="viewRoute.path" />
              </keep-alive>
            </transition>
          </router-view>
        </main>
      </div>
    </section>
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
