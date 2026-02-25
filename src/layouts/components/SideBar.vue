<script lang="ts" setup>
import type { ItemType, MenuProps } from 'ant-design-vue'
import type { VueElement } from 'vue'
import type { RouteRecordRaw } from 'vue-router'
import { SettingOutlined } from '@ant-design/icons-vue'
import { usePermissionStore } from '@/stores'

const router = useRouter()
const route = useRoute()
const permissionStore = usePermissionStore()

function getItem(
  label: VueElement | string,
  key: string,
  icon?: any,
  children?: ItemType[],
  hidden?: boolean,
  type?: 'group',
): ItemType {
  return {
    key,
    icon: icon ?? h(SettingOutlined),
    children,
    label,
    hidden,
    type,
  } as ItemType
}
const items = computed<ItemType[]>(() => buildMenuItems(permissionStore.routes))
const selectedKeys = computed(() => [route.path ?? '/home'])

const handleClick: MenuProps['onClick'] = (e) => {
  const key = e.key as string
  router.push(key)
}

function buildMenuItems(routes: RouteRecordRaw[], parentPath: string = ''): ItemType[] {
  return routes.flatMap((route) => {
    if (route.meta?.hidden || route.path === '/login') {
      return []
    }

    if (route.path === '/' && route.children?.length) {
      return buildMenuItems(route.children, '')
    }

    const fullPath = resolveFullPath(parentPath, route.path)
    const children = route.children?.filter((child: RouteRecordRaw) => !child.meta?.hidden)?.length
      ? buildMenuItems(route.children, fullPath)
      : undefined

    return [
      getItem(
        route.meta?.title as string,
        fullPath,
        null,
        children,
        route.meta?.hidden as boolean,
      ),
    ]
  })
}

function resolveFullPath(parentPath: string, routePath: string) {
  if (!parentPath) {
    return routePath.startsWith('/') ? routePath : `/${routePath}`
  }

  if (routePath.startsWith('/')) {
    return routePath
  }

  const base = parentPath.endsWith('/') ? parentPath.slice(0, -1) : parentPath
  return `${base}/${routePath}`
}
</script>

<template>
  <div class="h-[calc(100vh-54px)] overflow-y-auto">
    <a-menu :selected-keys="selectedKeys" class="py-4 min-h-full" mode="inline" :items="items" @click="handleClick" />
  </div>
</template>
