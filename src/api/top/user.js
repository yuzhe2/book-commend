import instance from "../front";

// 用户登录
export const userLogin = (data) => instance.post(`/user/login`, data)

// 用户注册
export const userRegister = (data) => instance.post(`/user/register`, data)
