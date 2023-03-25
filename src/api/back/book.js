import instance from "../fetch";

// 获取图书列表
export const getBookList = function (params) {
  return instance.post("/admin/book/pageList", params);
};

// 添加图书
export const addBook = function (Book) {
  return instance.post("/admin/book/add", Book);
};

// 修改图书
export const updateBook = function (Book) {
  return instance.put("/admin/book/update", Book);
};

// 删除图书
export const deleteBook = function (id) {
  return instance.delete(`/admin/book/${id}`)
}