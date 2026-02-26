import type { RouteLocationNormalized } from 'vue-router'

/** 标签页数据结构 */
export interface TagView {
  path: string
  name: string
  title: string
  keepAlive?: boolean
  affix?: boolean
}

export const useTagsViewStore = defineStore('tagsView', () => {
  /** 已访问的标签列表（驱动 UI 渲染） */
  const visitedViews = ref<TagView[]>([])

  /** 需要缓存的组件名列表（驱动 KeepAlive 的 include） */
  const cachedViews = ref<string[]>([])

  /** 初始化固定标签（如首页），应在 layout 挂载时调用 */
  function initAffixTags(affixTags: TagView[]) {
    affixTags.forEach((tag) => {
      if (tag.name && !visitedViews.value.some(v => v.path === tag.path)) {
        visitedViews.value.unshift({ ...tag, affix: true })
      }
    })
  }

  /** 路由导航时添加标签（自动去重 + 自动收集缓存） */
  function addView(route: RouteLocationNormalized) {
    const { path, name, meta } = route
    if (!name || meta.hidden) {
      return
    }

    // 添加到已访问列表（去重）
    if (!visitedViews.value.some(v => v.path === path)) {
      visitedViews.value.push({
        path,
        name: name as string,
        title: (meta.title as string) || '未命名',
        keepAlive: meta.keepAlive as boolean,
        affix: meta.affix as boolean,
      })
    }

    // 需要缓存的页面加入缓存列表
    if (meta.keepAlive && name && !cachedViews.value.includes(name as string)) {
      cachedViews.value.push(name as string)
    }
  }

  /** 关闭指定标签，返回下一个应激活的路径 */
  function removeView(path: string): string | null {
    const index = visitedViews.value.findIndex(v => v.path === path)
    if (index === -1) {
      return null
    }

    const view = visitedViews.value[index]!
    // 固定标签不允许关闭
    if (view.affix) {
      return null
    }

    // 移除缓存
    removeCachedView(view.name)
    // 移除标签
    visitedViews.value.splice(index, 1)

    // 返回下一个应激活的路径（优先右侧，其次左侧）
    if (visitedViews.value.length === 0) {
      return '/'
    }
    const nextIndex = Math.min(index, visitedViews.value.length - 1)
    return visitedViews.value[nextIndex]!.path
  }

  /** 关闭其他标签（保留固定标签和当前标签） */
  function closeOtherViews(currentPath: string) {
    visitedViews.value = visitedViews.value.filter(
      v => v.affix || v.path === currentPath,
    )
    // 重建缓存列表
    rebuildCachedViews()
  }

  /** 关闭所有标签（保留固定标签），返回应跳转的路径 */
  function closeAllViews(): string {
    visitedViews.value = visitedViews.value.filter(v => v.affix)
    cachedViews.value = []
    // 固定标签中取最后一个
    const last = visitedViews.value[visitedViews.value.length - 1]
    return last?.path ?? '/'
  }

  /** 退出登录时彻底清空所有数据 */
  function clearAll() {
    visitedViews.value = []
    cachedViews.value = []
  }

  // ---- 内部辅助 ----

  function removeCachedView(name: string) {
    const index = cachedViews.value.indexOf(name)
    if (index > -1) {
      cachedViews.value.splice(index, 1)
    }
  }

  function rebuildCachedViews() {
    cachedViews.value = visitedViews.value
      .filter(v => v.keepAlive && v.name)
      .map(v => v.name)
  }

  return {
    visitedViews,
    cachedViews,
    initAffixTags,
    addView,
    removeView,
    closeOtherViews,
    closeAllViews,
    clearAll,
  }
})
