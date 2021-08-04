import Vue from 'vue'
import App from './App.vue'
import store from "./store/index";
import router from "@/router";

import toast from 'components/common/toast'
import fastclick from 'fastclick'
import VueLazyLoad from "vue-lazyload";


Vue.config.productionTip = false
// 添加事件总线,并且把该事件总线设置为Vue实例，应为vue实例可以发射事件并且可以作为事件总线
Vue.prototype.$bus = new Vue

// 解决移动端的300ms延迟问题
fastclick.attach(document.body)

// 使用vue-lazyload插件
Vue.use(VueLazyLoad, {
  // 服务器图片还没加载时，使用的本地图片占位
  loading: require('./assets/img/common/placeholder.png')
})

// 安装toast插件:本质是执行toast中对象.install函数
// 安装插件：执行了Vue.use()后，该插件就准备好了，之后可以随时使用
Vue.use(toast)

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
