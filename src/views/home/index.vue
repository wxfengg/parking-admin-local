<script setup lang="ts"></script>

<template>
  <div class="size-full overflow-y-auto">
    <!-- <h1>首页</h1> -->
    <div class="w-full flex-y-center flex-col gap-3 overflow-y-auto">
      <div v-for="item in 9" :key="item" class="w-full h-250px flex-center border">
        {{ item }}
      </div>
    </div>
  </div>
</template>
