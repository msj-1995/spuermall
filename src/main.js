import Vue from 'vue'
import App from './App.vue'
import store from "./store/index";
import router from "@/router";

Vue.config.productionTip = false
// 添加事件总线,并且把该事件总线设置为Vue实例，应为vue实例可以发射事件并且可以作为事件总线
Vue.prototype.$bus = new Vue

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
