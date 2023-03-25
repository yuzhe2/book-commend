import axios from "axios";

const instance = axios.create({
  baseURL: 'http://120.25.254.157:9101/'
})

instance.interceptors.request.use(function (config) {
  let token = localStorage.getItem('backToken')
  if (token) config.headers.token = token
  return config
})

export default instance