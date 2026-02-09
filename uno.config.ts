import { defineConfig, presetAttributify, presetWind3, transformerDirectives } from 'unocss'

export default defineConfig({
  presets: [
    // 默认预设：包含 Tailwind CSS / Windi CSS 的全套特性
    presetWind3(),
    // 属性化模式支持：允许写 <div mt-2> 而不是 <div class="mt-2">
    presetAttributify(),
  ],
  // 可以在这里定义缩写，预设配置
  shortcuts: {
    'flex-center': 'flex justify-center items-center',
    'border': 'border-solid border-black border-1',
  },
  // 配置全局变量
  theme: {
    width: {
      sidebar: 'var(--sidebar-width)',
    },
    height: {
      header: 'var(--header-height)',
    },
    spacing: {
      sidebar: 'var(--sidebar-width)',
      header: 'var(--header-height)',
    },
    colors: {
      primary: 'rgb(var(--color-primary))',
    },
  },

  transformers: [
    // 允许在 class 中使用 @apply 指令
    transformerDirectives(),
  ],
})
