const path = require('path');

function resolve(dir) {
  return path.join(__dirname, dir)
}
module.exports = {
  // 配置别名
  configureWebpack: {
    // resolve可以解决路径相关的问题
    resolve: {
      // extensions: ['.js', 'vue'] 配置识别后缀名，cli3已经默认配置过了，这里就不配置了
      alias: {
        // 已经有一个默认的别名@了，它指向当前项目的路径的src目录，并且在脚手架3中可以直接使用@,router只有在main.js中引入一次，所以我也不配置它的别名了,store也是
        'assets': '@/assets',
        'common': '@/common',
        'components': '@/components',
        'network': '@/network',
        'views': '@/views',
      }
    }
  }
}
