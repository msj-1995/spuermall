export function debounce(func, delay) {
  let timer = null
  // 参数是args,可变长，即可以不传
  return function(...args) {
    // 如果timer有值，则清除timer的值
    if(timer) clearTimeout(timer)
    timer = setTimeout(() => {
      // 执行传入的函数：func
      func.apply(this, args)
    }, delay)
  }
}
