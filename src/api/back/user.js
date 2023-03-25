import instance from "../fetch";

// 获取用户列表
export const getUserList = function (params) {
  return instance.post("/admin/user/pageList", params);
};

// 添加用户
export const addUser = function (user) {
  return instance.post("/admin/user/add", user);
};

// 修改用户
export const updateUser = function (user) {
  return instance.put("/admin/user/update", user);
};

// 删除用户
export const deleteUser = function (id) {
  return instance.delete(`/admin/user/delete/${id}`)
}

// 更改用户状态
export const changeStatus = function (params) {
  return instance.post("/admin/user/changeStatus", params);
}