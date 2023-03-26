import instance from "../front";

// 获取图书详情
export const getTypeList = () => instance.get(`/type/getTypeList`)