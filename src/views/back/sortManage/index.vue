<template>
  <div>
    <div class="search">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="名称">
          <el-input v-model="formInline.sortName" placeholder="请输入名称"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary">查询</el-button>
          <el-button type="primary">新增</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="table">
      <el-table :data="sortData">
        <el-table-column
          v-for="(item, index) in sortList"
          :key="index"
          :prop="item.fieldName"
          :label="item.label"
        >
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text" size="small">删除</el-button>
            <el-button type="text" size="small">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  name: "sortManage",
  data() {
    return {
      sortData: [],
      formInline: {
        sortName: '',
      },
      sortList: [
        {
          label: "分类名称",
          fieldName: "name",
        },
        {
          label: "创建人",
          fieldName: "createBy",
        },
        {
          label: "创建时间",
          fieldName: "create_time",
        },
      ],
    };
  },
};
</script>
