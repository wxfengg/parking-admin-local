import antfu from '@antfu/eslint-config'

export default antfu({
  // 自定义规则覆盖
  rules: {
    'no-console': 'off', // 允许 console.log (生产环境会被 vite 自动去除，开发时允许写)
    'vue/multi-word-component-names': 'off', // 关闭Vue组件名必须多单词的检查
    'unused-imports/no-unused-vars': 'off', // 关闭未使用变量检查
    'ts/no-unused-expressions': 'off', // 关闭未使用表达式检查
  },
})
