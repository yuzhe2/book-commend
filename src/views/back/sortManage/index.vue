<template>
  <div>
    <div class="search">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="名称">
          <el-input
            v-model="formInline.sortName"
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
            <el-button type="text" size="small">删除</el-button>
            <el-button type="text" size="small">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-pagination
      class="table-page"
      layout="prev, pager, next"
      :total="total"
      :currentPage.sync="currentPage"
      @current-change="handleChangePage"
    >
    </el-pagination>
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
const pageSize = 10;

export default {
  name: "sortManage",
  components: {
    formPanel,
  },
  data() {
    return {
      sortData: [],
      dialogVisible: false, // 添加弹窗显示
      total: 10, // 数据总数
      currentPage: 1, // 当前页数
      type: "add", // 用于记录对分类的何种操作 add --- 添加, edit --- 编辑
      sortId: "", // 记录当前要修改的分类id
      formInline: {
        sortName: "",
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
      addList: [
        {
          type: "INPUT",
          label: "分类名称",
          initValue: "",
          fieldName: "bookName",
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
      let pageReq = {
        pageNum: 1,
        pageSize,
      };
      getSortList({
        pageReq,
        ...this.nowParams,
      }).then(({ data }) => {
        this.total = parseInt(data.data.total);
        this.sortData = data.data.rows;
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
    // 当前页改变时
    handleChangePage() {
      let pageReq = {
        pageNum: this.currentPage,
        pageSize,
      };
      getSortList({
        pageReq,
        ...this.nowParams,
      }).then(({ data }) => {
        this.sortData = data.data.rows;
      });
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
      let pageReq = {
        pageNum: this.currentPage,
        pageSize,
      };
      getSortList({
        pageReq,
        ...this.nowParams,
      }).then(({ data }) => {
        this.total = parseInt(data.data.total);
        this.sortData = data.data.rows;
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
    let pageReq = {
      pageNum: this.currentPage,
      pageSize,
    };
    getSortList({
      pageReq,
    }).then(({ data }) => {
      this.total = parseInt(data.data.total);
      this.sortData = data.data.rows;
    });
  },
};
</script>

<style scoped lang="scss">
.table-page {
  text-align: right;
}
</style>