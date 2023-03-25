import instance from "../fetch";

// 获取分类列表
export const getSortList = function (params) {
  return instance.post("/admin/type/pageList", params);
};

// 添加分类
export const addSort = function (Sort) {
  return instance.post("/admin/type/add", Sort);
};

// 修改分类
export const updateSort = function (Sort) {
  return instance.put("/admin/type/update", Sort);
};

// 删除分类
export const deleteSort = function (id) {
  return instance.delete(`/admin/type/${id}`)
}