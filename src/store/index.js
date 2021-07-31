import Vue from 'vue'
import Vuex from "vuex";

// 1.安装vuex插件
Vue.use(Vuex)

// 2.创建store对象
const store = new Vuex.Store({
  state: {
    cartList: []
  },
  mutations: {
    addCart(state, payload) {
      // 判断当前加入的商品是否在cartList中,如果在，则数量加一
      let oldProduct = state.cartList.find(item => item.iid === payload.iid)
      if(oldProduct) {
        oldProduct.count += 1
      }else {
        payload.count = 1
        state.cartList.push(payload)
      }
    }
  }
})

// 3.导出
export default  store

