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

/** 收集所有含子菜单的顶级 key，用于手风琴模式判断 */
const rootSubmenuKeys = computed(() =>
  items.value
    .filter((item: any) => item?.children?.length)
    .map((item: any) => item.key as string),
)

/** 当前展开的菜单 key */
const openKeys = ref<string[]>([])

/** 提取当前路由的父级路径 */
function getParentPaths() {
  return route.matched
    .filter(r => r.path !== '/' && r.path !== route.path)
    .map(r => r.path)
}

// 初始化：根据当前路由展开对应父级菜单
onMounted(() => {
  openKeys.value = getParentPaths()
})

// 仅在父级路径变化时更新（避免同层导航覆盖用户手动操作）
watch(
  () => getParentPaths().join(','),
  () => {
    openKeys.value = getParentPaths()
  },
)

/** 手风琴：只保留最新展开的顶级菜单 */
function handleOpenChange(keys: (string | number)[]) {
  const stringKeys = keys.map(String)
  const latestKey = stringKeys.find(key => !openKeys.value.includes(key))
  if (latestKey && rootSubmenuKeys.value.includes(latestKey)) {
    // 展开了一个新的顶级菜单，收起其他
    openKeys.value = [latestKey]
  }
  else {
    openKeys.value = stringKeys
  }
}

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
  <div class="h-full overflow-y-auto">
    <a-menu
      :items="items"
      :selected-keys="selectedKeys"
      :open-keys="openKeys"
      mode="inline"
      class="py-4 min-h-full"
      @click="handleClick"
      @open-change="handleOpenChange"
    />
  </div>
</template>
