<script setup lang="ts">
import SideBar from '@/layouts/components/SideBar.vue'
</script>

<template>
  <div class="size-screen overflow-hidden flex flex-col">
    <header class="h-54px bg-white shadow-md z-1">
      头部
    </header>
    <main class="grow flex">
      <nav class="w-220px bg-white pt-4" style="border-right: 1px solid #ddd;">
        <SideBar />
      </nav>
      <main class="grow bg-#f8f8f8 p-4">
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
#components-layout-demo-top-side-2 .logo {
  float: left;
  width: 120px;
  height: 31px;
  margin: 16px 24px 16px 0;
  background: rgba(255, 255, 255, 0.3);
}

.ant-row-rtl #components-layout-demo-top-side-2 .logo {
  float: right;
  margin: 16px 0 16px 24px;
}

.site-layout-background {
  background: #fff;
}
</style>
