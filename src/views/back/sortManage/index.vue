<template>
  <div>
    <div class="search">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="名称">
          <el-input
            v-model="formInline.typeName"
            placeholder="请输入名称"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <div class="control-btn">
            <el-button type="primary" @click="handleSearch">查询</el-button>
            <el-button type="primary" @click="openDialog">添加</el-button>
          </div>
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
            <el-button type="text" size="small" @click="handleDeleteUser(scope.row)">删除</el-button>
            <el-button type="text" size="small" @click="handleEditUser(scope.row)">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog
      :title="type === 'add' ? '添加图书' : '修改图书'"
      :visible.sync="dialogVisible"
      width="30%"
    >
      <form-panel
        v-if="dialogVisible"
        :form-list="addList"
        @cancel="closeDialog"
        @confirm="handleAddUser"
      ></form-panel>
    </el-dialog>
  </div>
</template>

<script>
import formPanel from "@/components/formPanel/index.vue";
import { getSortList, addSort, updateSort, deleteSort } from "@/api/back/sort";

export default {
  name: "sortManage",
  components: {
    formPanel,
  },
  data() {
    return {
      sortData: [],
      dialogVisible: false, // 添加弹窗显示
      type: "add", // 用于记录对分类的何种操作 add --- 添加, edit --- 编辑
      sortId: "", // 记录当前要修改的分类id
      formInline: {
        typeName: "",
      },
      sortList: [
        {
          label: "分类名称",
          fieldName: "name",
        },
        {
          label: "创建时间",
          fieldName: "createTime",
        },
      ],
      addList: [
        {
          type: "INPUT",
          label: "分类名称",
          initValue: "",
          fieldName: "name",
        },
      ],
    };
  },
  methods: {
    // 删除分类
    handleDeleteUser(row) {
      deleteSort(row.id).then(() => {
        this.resetData();
        this.$message({
          type: "success",
          message: "删除成功",
        });
      });
    },
    // 编辑分类
    handleEditUser(row) {
      this.sortId = row.id;
      this.type = "edit";
      this.dialogVisible = true;
      this.addList = this.addList.map((val) => {
        val.initValue = row[val.fieldName];
        return val;
      });
    },
    // 根据参数查询分类
    handleSearch() {
      let params = this.formInline;
      this.nowParams = params; // 记录当前的参数, 用于翻页时
      getSortList({
        ...this.nowParams,
      }).then(({ data }) => {
        this.total = parseInt(data.data.total);
        this.sortData = data.data;
        this.$message({
          type: "success",
          message: "查询成功",
        });
      });
    },
    // 关闭弹窗
    closeDialog() {
      this.dialogVisible = false;
    },
    // 打开添加分类弹窗
    openDialog() {
      this.dialogVisible = true;
      this.type = "add";
      this.addList = this.addList.map((val) => {
        val.initValue = "";
        return val;
      });
    },
    // 根据当前请求参数和页数重新请求数据
    resetData() {
      getSortList({
        ...this.nowParams,
      }).then(({ data }) => {
        this.total = parseInt(data.data.total);
        this.sortData = data.data;
      });
    },
    // 添加或修改分类
    handleAddUser(sortInfo) {
      this.closeDialog();
      if (this.type === "add") {
        addSort(sortInfo).then((res) => {
          this.resetData();
          this.$message({
            type: "success",
            message: "添加分类成功",
          });
        });
      } else if (this.type === "edit") {
        updateSort({
          id: this.sortId,
          ...sortInfo,
        }).then((res) => {
          this.resetData();
          this.$message({
            type: "success",
            message: "修改成功",
          });
        });
      }
    },
  },
  created() {
    // 拿到初始的数据
    getSortList(this.formInline).then(({ data }) => {
      this.total = parseInt(data.data.total);
      this.sortData = data.data;
    });
  },
};
</script>

<style scoped lang="scss">
.table-page {
  text-align: right;
}
</style>