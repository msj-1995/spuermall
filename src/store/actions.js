import {
  ADD_COUNTER,
  ADD_TO_CART
}from "./mutations-types";

export default {
  addCart(context, payload) {
    return new Promise((resolve, reject) => {
      // 判断当前加入的商品是否在cartList中,如果在，则数量加一
      let oldProduct = context.state.cartList.find(item => item.iid === payload.iid)
      if(oldProduct) {
        context.commit(ADD_COUNTER, oldProduct)
        resolve('当前的商品数量加1')
      }else {
        payload.count = 1
        context.commit(ADD_TO_CART, payload)
        resolve('添加新的商品')
      }
    })
  }
}
