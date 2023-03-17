import axios from "axios";
import instance from "../fetch";

// 获取用户列表
export const getUserList = function () {
  return instance.post("/admin/user/pageList", {
    pageReq: {
      pageNum: 1,
      pageSize: 10,
    },
    name: "admin",
    type: 0,
    status: 0,
    sex: 0,
  });
};

// 添加用户
// export const addUser = function (user) {
//   return instance.post({
//     url: "/admin/user/add",
//     data: user,
//   });
// };

// 修改用户操作
// export const updateUser = function (user) {
//   return instance.put({
//     url: "/admin/user/update",
//     data: user,
//   });
// };
