import {
  ADD_COUNTER,
  ADD_TO_CART
}from "./mutations-types";

export default {
  [ADD_COUNTER](state, payload) {
  payload.count++
 },
  [ADD_TO_CART](state, payload) {
    // 新添加的商品默认选中
    payload.checked = true
    state.cartList.push(payload)
  }
}
