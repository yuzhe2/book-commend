import axios from "axios";

const instance = axios.create({
  baseURL: 'http://120.25.254.157:9101/'
})

instance.interceptors.request.use(function (config) {
  let token = localStorage.getItem('token')
  if (token) config.headers.Authorization = token
  return config
})

export default instance