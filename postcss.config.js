module.exports = {
  plugins: {
    autoprefixer: {},
    'postcss-px-to-viewport': {
      viewportWidth: 375, // 视窗的宽度，对应的是我们设计稿的宽度
      viewportHeight: 667, // 视窗高度，（也可以不配置）
      unitPrecision: 5, // 指定'px'转换为视窗单位的值的小数位数（很多时候无法整除）
      viewportUnit: 'vw', // 指定需要转换为的视窗单位，建议使用vw
      selectorBlackList: ['ignore', 'tab-bar', 'tab-bar-item'], // 指定不需要转换的类，即template中的class， 或者是css中的.后的东西都转换
      minPixelValue: 1, // 小于或等于'1px'不转换为视窗单位
      mediaQuery: false,  // 允许在媒体查询中转换'px'
      exclude: [/TabBar/]
    }
  }
}
