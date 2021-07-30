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

//时间转换函数
export function formatDate(date, fmt) {
  // 1、获取年份
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  };
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + '';
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
    }
  }
  return fmt;
}
function padLeftZero(str) {
  return ('00' + str).substr(str.length);  //用0补齐位数
}
