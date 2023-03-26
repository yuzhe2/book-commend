import instance from "../front";

// 获取图书详情
export const getBookById = (id) => instance.get(`/book/getById/${id}`)

// 新书上架列表推荐
export const getNewBookList = (params) => instance.get(`/book/getNewBookList`, { params })

// 人性化图书推荐
export const getPersonalBookList = (params) => instance.get(`/book/getPersonalBookList`, { params })

// 热门图书推荐
export const getHotBookList = (params) => instance.get(`/book/getHotBookList`, { params })

// 借阅图书
export const borrowBook = (params) => instance.post("/user/borrow", params);


