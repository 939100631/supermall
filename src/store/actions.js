import {
  ADD_COUNTER,
  ADD_TO_CART
}from './mutation-types'

export default {
  addCart(context, payload) {
    // 方法一
    // payload 新添加的商品
    // let oldPayload = null
    // for(let item of state.cartList){
    //   if(item.iid === payload.iid){
    //     oldPayload = item
    //   }
    // }

    // let product = state.cartList.find(function (item) { return item.iid === payload.iid})
    // 查找之前的数组中是否有改商品
    let oldPayload = context.state.cartList.find(item => item.iid === payload.iid)

    //判断oldPayload
    if (oldPayload) {
      // oldPayload.count += 1
      context.commit(ADD_COUNTER, oldPayload)
    } else {
      payload.count = 1
      // context.state.cartList.push(payload)
      context.commit(ADD_TO_CART, payload)
    }
  }
}
