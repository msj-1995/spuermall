import Toast from "components/common/toast/Toast";

const obj = {}

obj.install = function(Vue) {
  // 在install函数把要预备的东西全部预备好：install函数在执行的时候会默认传入一个参数：Vue,于是我们在install函数中就可以拿到Vue
  // 也就可以使用Vue.prototype给Vue中加入一些全局参数
  const toastConstructor = Vue.extend(Toast)
  const toast = new toastConstructor()
  toast.$mount(document.createElement('div'))
  document.body.appendChild(toast.$el)
  Vue.prototype.$toast = toast
}

export default obj
