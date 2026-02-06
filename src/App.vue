<script setup lang="ts">
</script>

<template>
  <div>
    <a href="https://vite.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo">
    </a>
  </div>

  <nav class="flex gap-4 border-b p-4">
    <router-link to="/" class="text-blue-500 hover:underline">
      首页
    </router-link>
    <router-link to="/about" class="text-blue-500 hover:underline">
      关于
    </router-link>
    <router-link to="/me" class="text-blue-500 hover:underline">
      我
    </router-link>
  </nav>

  <router-view v-slot="{ Component }">
    <transition name="fade-slide" mode="out-in">
      <component :is="Component" />
    </transition>
  </router-view>
</template>
