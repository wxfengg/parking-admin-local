<script setup lang="ts">
import type { RouteRecordRaw } from 'vue-router'
import { Modal } from 'ant-design-vue'
import SideBar from '@/layouts/components/SideBar.vue'
import TagsView from '@/layouts/components/TagsView.vue'
import { routes } from '@/router'
import { useTagsViewStore, useUserStore } from '@/stores'

const userStore = useUserStore()
const tagsViewStore = useTagsViewStore()
const router = useRouter()
const route = useRoute()

// 初始化固定标签：从路由配置中自动提取 affix: true 的路由
onMounted(() => {
  const affixTags = collectAffixTags(routes)
  tagsViewStore.initAffixTags(affixTags)
  // 当前路由也需要添加标签
  tagsViewStore.addView(route)
})

/** 递归收集所有 affix 路由 */
function collectAffixTags(routes: RouteRecordRaw[], parentPath = '') {
  const tags: { path: string, name: string, title: string, affix: true }[] = []
  for (const route of routes) {
    const fullPath = parentPath
      ? `${parentPath}/${route.path}`.replace(/\/+/g, '/')
      : route.path.startsWith('/') ? route.path : `/${route.path}`

    if (route.meta?.affix && route.name) {
      tags.push({
        path: fullPath,
        name: route.name as string,
        title: (route.meta.title as string) || '未命名',
        affix: true,
      })
    }
    if (route.children?.length) {
      tags.push(...collectAffixTags(route.children, fullPath))
    }
  }
  return tags
}

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
    <header class="h-[var(--header-height)] bg-white shadow-md z-1 flex-y-center justify-between px-4 shrink-0">
      <div class="w-150px h-45px bg-bluegray rd-xl flex-center">
        智慧云停车
      </div>
      <a-button type="default" @click="logout">
        退出
      </a-button>
    </header>
    <section class="grow flex min-h-0 bg-#f8f8f8">
      <nav class="w-[var(--sidebar-width)] bg-white">
        <SideBar />
      </nav>
      <div class="grow flex flex-col min-w-0">
        <TagsView />
        <main class="grow p-3 overflow-hidden">
          <router-view v-slot="{ Component, route: viewRoute }">
            <transition name="fade-slide" mode="out-in">
              <keep-alive :include="tagsViewStore.cachedViews">
                <component :is="Component" :key="viewRoute.path" />
              </keep-alive>
            </transition>
          </router-view>
        </main>
      </div>
    </section>
  </div>
</template>
