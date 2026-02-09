<script lang="ts" setup>
import type { ItemType, MenuProps } from 'ant-design-vue'
import type { VueElement } from 'vue'
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons-vue'

const router = useRouter()
const route = useRoute()

function getItem(
  label: VueElement | string,
  key: string,
  icon?: any,
  children?: ItemType[],
  type?: 'group',
): ItemType {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as ItemType
}
// 获取routes
const routes = useRouter().getRoutes()
const menuItems = routes.filter(route => route.meta && route.meta.title && !route.meta.hidden).map(route =>
  getItem(route.meta.title as string, route.path, h(AppstoreOutlined),
  ))
console.log('🚀 ~ menuItems:', menuItems)

const selectedKeys = ref([route.path ?? '/home'])

const handleClick: MenuProps['onClick'] = (e) => {
  router.push(e.key as string)
}
</script>

<template>
  <div class="size-full">
    <a-menu
      id="dddddd"
      v-model:selected-keys="selectedKeys"
      mode="inline"
      :items="menuItems"
      @click="handleClick"
    />
  </div>
</template>
