<script setup lang="ts">
import zhCN from 'ant-design-vue/es/locale/zh_CN'
import dayjs from 'dayjs'
import defaultSettings from '@/settings'
import 'dayjs/locale/zh-cn'

// 设置 dayjs 全局语言 (Antd 底层用 dayjs，解决时间类组件的国际化问题)
dayjs.locale('zh-cn')

const { colorPrimary } = defaultSettings
</script>

<template>
  <a-config-provider :locale="zhCN" :theme="{ token: { colorPrimary } }">
    <router-view />
  </a-config-provider>
</template>
