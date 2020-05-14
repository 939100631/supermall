// 防抖函数
export function debounce(func, delay) {
  let timer = null

  // 这个函数的返回值就是this.debounce(this.$refs.scroll.refresh)
  // func = this.$refs.scroll.refresh
  return function (...args) {
    if(timer) clearTimeout(timer)
    timer = setTimeout(() => {
      func.apply(this, args)
    }, delay)
  }
}
