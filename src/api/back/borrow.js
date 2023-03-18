import instance from "../fetch";

// 获取借阅列表
export const getBorrowsList = function (params) {
  return instance.post("/admin/borrow/pageList", params);
};

// 归还图书
export const returnBook = function (params) {
  return instance.post("/admin/borrow/returnBook", params);
};
