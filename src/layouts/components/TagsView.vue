<script setup lang="ts">
import { CloseOutlined } from '@ant-design/icons-vue'
import { useTagsViewStore } from '@/stores'

const router = useRouter()
const route = useRoute()
const tagsViewStore = useTagsViewStore()

const visitedViews = computed(() => tagsViewStore.visitedViews)

/** 点击标签跳转 */
function handleTagClick(path: string) {
  if (path !== route.path) {
    router.push(path)
  }
}

/** 关闭标签 */
function handleClose(e: Event, path: string) {
  e.stopPropagation()
  const nextPath = tagsViewStore.removeView(path)
  // 如果关闭的是当前激活的标签，跳转到下一个
  if (nextPath && path === route.path) {
    router.push(nextPath)
  }
}

/** 判断是否为当前激活标签 */
function isActive(path: string) {
  return route.path === path
}
</script>

<template>
  <div class="tags-view">
    <div class="tags-view-wrapper">
      <div
        v-for="tag in visitedViews"
        :key="tag.path"
        class="tags-view-item"
        :class="{ active: isActive(tag.path) }"
        @click="handleTagClick(tag.path)"
      >
        <span class="tag-title">{{ tag.title }}</span>
        <span
          v-if="!tag.affix"
          class="tag-close"
          @click="(e: Event) => handleClose(e, tag.path)"
        >
          <CloseOutlined />
        </span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.tags-view {
  height: 36px;
  background: white;
  border-bottom: 1px solid #e8e8e8;
  display: flex;
  align-items: center;
  padding: 0 8px;
  flex-shrink: 0;
}

.tags-view-wrapper {
  display: flex;
  align-items: center;
  gap: 6px;
  overflow-x: auto;
  overflow-y: hidden;
  scrollbar-width: none; /* Firefox */
}

.tags-view-wrapper::-webkit-scrollbar {
  display: none; /* Chrome/Safari */
}

.tags-view-item {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  height: 26px;
  padding: 0 10px;
  border-radius: 4px;
  background: rgb(233, 229, 229);
  border: 1px solid #e8e8e8;
  font-size: 12px;
  color: #666;
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.2s;
  user-select: none;
  flex-shrink: 0;
}

.tags-view-item:hover {
  color: var(--ant-color-primary, #1677ff);
  border-color: var(--ant-color-primary, #1677ff);
}

.tags-view-item.active {
  color: #fff;
  background: var(--ant-color-primary, #1677ff);
  border-color: var(--ant-color-primary, #1677ff);
}

.tag-title {
  max-width: 120px;
  overflow: hidden;
  text-overflow: ellipsis;
}

.tag-close {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 14px;
  height: 14px;
  border-radius: 50%;
  font-size: 10px;
  transition: all 0.2s;
}

.tag-close:hover {
  background: rgba(0, 0, 0, 0.15);
}

.tags-view-item.active .tag-close:hover {
  background: rgba(255, 255, 255, 0.3);
}
</style>
