// 防抖函数  主要是防止再某个时间内被重复调用这个函数   可以写在登录操作

// 滚动初始化完了，图片再初始化的时候，实际的高度就变高了，滚动不完整
// 他这个主要是有图片加载完成，然后就发送itemImgLoad到bus上，然后这里就调用itemImgListener这个方法
// itemImgListener这个方法里面又调用newRefresh方法
// 这样就可以刷新下滚动的高度
export function debounce(func, delay) {
  // 第一次调用 timer为null，然后新建个timeout，超时后才会调用func.apply
  let timer = null

  // 这个函数的返回值就是this.debounce(this.$refs.scroll.refresh)
  // func = this.$refs.scroll.refresh
  return function (...args) {
    // 如果第二次调用太快，然后timer不为null，就清空旧的timer，
    // 这时候旧的timer还没到超时时间，所以还没调用func.apply。
    // 清空完再新建个timeout，也是超时后才调用func.apply
    if(timer) clearTimeout(timer)
    timer = setTimeout(() => {
      func.apply(this, args)
    }, delay)
  }
}

//时间戳的工具函数(正则表达式)
// 以Unix时间元年为起点，返回对应的时间戳
// 如何将时间戳转成时间格式化字符串
// 时间戳：1535694719
// 1.将时间戳转成Date对象
// const date = new Date（1535694719 * 1000）
// 2.将date进行格式化，转成对应的字符串
// *date.getYear(）+ date.getMonth()+1
// date -> FormatString （太常用）
// fmt.format(date, 'yyyy-MM-dd hh:mm:ss')
// y：year 年
// M：Month 月
// d：day 日
// h：hours 小时 （h(12小时) / H(24小时)）
// m：minutes 分钟
// s：seconds 秒钟
export function formatDate(date, fmt) {
  // 1.获取年份
  // y+ -> 一个或者多个y
  // y* -> 0个或者多个y
  // y？ -> 0个或者1个y

  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
                                          // 截取0位
    //   fmt = fmt.replace('yyyy', (2019).substr(0));
  }
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  }
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + '';
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
    }
  }
  return fmt;
}

function padLeftZero (str) {
  // 04:04:04
  return ('00' + str).substr(str.length);
}

