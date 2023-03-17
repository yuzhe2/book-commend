import axios from "axios";
import instance from "../fetch";

// 获取用户列表
export const getUserList = function (params) {
  return instance.post("/admin/user/pageList", params);
};

// 添加用户
export const addUser = function (user) {
  return instance.post({
    url: "/admin/user/add",
    data: user,
  });
};

// 修改用户
export const updateUser = function (user) {
  return instance.put({
    url: "/admin/user/update",
    data: user,
  });
};

// 删除用户
export const deleteUser = function (id) {
  return instance.delete({
    url: `/admin/user/delete/${id}`
  })
}
