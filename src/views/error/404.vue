<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

function goHome() {
  router.push('/') // 或者 router.replace('/')
}
</script>

<template>
  <div class="h-[80vh] flex flex-col items-center justify-center gap-4">
    <div class="i-mdi-alert-circle-outline text-6xl text-gray-400" />
    <h1 class="text-3xl text-gray-800 font-bold">
      404
    </h1>
    <p class="text-gray-500">
      哎呀，你访问的页面飞走了...
    </p>

    <button class="rounded bg-blue-500 px-6 py-2 text-white transition hover:bg-blue-600" @click="goHome">
      回到首页
    </button>
  </div>
</template>
