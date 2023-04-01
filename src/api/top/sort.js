import instance from "../front";

// 根据分类获取数据
export const getBookListByType = (data) => instance.post(`/book/getBookListByType`, data)

// 获取分类列表
export const getTypeList = () => instance.get(`/type/getTypeList`)

