import antfu from '@antfu/eslint-config'

export default antfu({
  // 自定义规则覆盖
  rules: {
    // 比如：允许 console.log (生产环境会被 vite 自动去除，开发时允许写)
    'no-console': 'off',
    // 关闭Vue组件名必须多单词
    'vue/multi-word-component-names': 'off',
  },
})
