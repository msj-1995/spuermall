import axios from "axios";

// config是网络配置，success是成功时的回调函数（也是外部传的）,failure是失败时的回调函数（也是外部传的）
export function request(config) {
  const instance = axios.create({
    baseURL: 'http://152.136.185.210:7878/api/m5',
    timeout: 5000
  })

  instance.interceptors.request.use(config => {
    return config
  }, err => {
    console.log(err);
  })

  // 响应拦截
  instance.interceptors.response.use(res => {
    return res.data
  }, err => {
    console.log(err);
  })

  // 网络请求
  return instance(config)
}

