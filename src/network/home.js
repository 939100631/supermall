import {request} from "./request";

export function getHomeMultidata() {
  return request({
    url: '/home/multidata'
  })
}

export function getHomeGoods(type, page) {
  return request({
    url: '/home/data',
    params: {
      type,
      page
    }
  })
}


// let totalNums = []
//
// const num1 = [10,20,30]
// const num2 = [111,222,333]
//
// // for(let n of num1){
// //   totalNums.push(n)
// // }
//
// totalNums.push(...num1)
