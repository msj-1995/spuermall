import Vue from 'vue'
import Vuex from "vuex";
import mutations from "./mutations";
import actions from "./actions";

// 1.安装vuex插件
Vue.use(Vuex)

// 2.创建store对象
const state = {
  cartList: []
}
const store = new Vuex.Store({
  state,
  mutations,
  actions
})

// 3.导出
export default  store

