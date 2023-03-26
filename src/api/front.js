import axios from "axios";

const instance = axios.create({
  baseURL: 'http://120.25.254.157:9100/front'
})

instance.interceptors.request.use(function (config) {
  let token = localStorage.getItem('frontToken')
  if (token) config.headers.token = token
  return config
})

export default instance