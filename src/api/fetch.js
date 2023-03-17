import axios from "axios";

const instance = axios.create({
  baseURL: 'http://localhost:8000/'
})

instance.interceptors.request.use(function (config) {
  let token = localStorage.getItem('token')
  if (token) config.headers.Authorization = token
  return config
})

return instance