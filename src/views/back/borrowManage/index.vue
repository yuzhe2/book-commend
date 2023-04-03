<template>
  <div>
    <div class="search">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="用户名">
          <el-input v-model="formInline.userName" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item label="年份">
          <el-input v-model="formInline.year" placeholder="请输入年份"></el-input>
        </el-form-item>
        <el-form-item label="图书名">
          <el-input v-model="formInline.bookName" placeholder="请输入图书名"></el-input>
        </el-form-item>
        <el-form-item label="审核状态">
          <el-select v-model="formInline.status" placeholder="请输入审核状态" clearable>
            <el-option label="待归还" value="0"></el-option>
            <el-option label="待审核" value="1"></el-option>
            <el-option label="已归还" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSearch">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="table">
      <el-table :data="sortData">
        <template v-for="(item, index) in sortList">
          <el-table-column
            :prop="item.fieldName"
            :label="item.label"
            v-if="item.fieldName === 'status'"
          >
            <template slot-scope="scope">
              <el-tag :type="getColor(scope.row.status)">{{ statusDict(scope.row.status) }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column v-else :prop="item.fieldName" :label="item.label"></el-table-column>
        </template>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="handleReturnBook(scope.row)">归还</el-button>
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
  </div>
</template>

<script>
import { getBorrowsList, returnBook } from "@/api/back/borrow";
const pageSize = 10;

export default {
  name: "sortManage",
  data() {
    return {
      sortData: [],
      total: 10, // 数据总数
      currentPage: 1, // 当前页数
      sortId: "", // 记录当前要修改的分类id
      formInline: {
        userName: '',
        year: '',
        bookName: '',
        status: ''
      },
      sortList: [
        {
          label: "用户名",
          fieldName: "userName",
        },
        {
          label: "图书名",
          fieldName: "bookName",
        },
        {
          label: '审核状态',
          fieldName: 'status'
        },
        {
          label: '创建时间',
          fieldName: 'createTime'
        }
      ]
    };
  },
  methods: {
    // 
    getColor (id) {
      if (id == 1) {
        return ''
      } else if (id == 0) {
        return 'danger'
      } else {
        return 'success'
      }
    },
    statusDict (id) {
      if (id == 1) {
        return '待审核'
      } else if (id == 0) {
        return '待归还'
      } else {
        return '已归还'
      }
    },
    // 归还图书
    handleReturnBook (row) {
      returnBook({
        id: row.id
      }).then(() => {
        this.$message({
          type: 'success',
          message: '归还成功'
        })
        this.resetData()
      })
    },
    // 根据参数查询借阅记录
    handleSearch() {
      let params = this.formInline;
      this.nowParams = params; // 记录当前的参数, 用于翻页时
      let pageReq = {
        pageNum: 1,
        pageSize,
      };
      getBorrowsList({
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
    // 当前页改变时
    handleChangePage() {
      let pageReq = {
        pageNum: this.currentPage,
        pageSize,
      };
      getBorrowsList({
        pageReq,
        ...this.nowParams,
      }).then(({ data }) => {
        this.sortData = data.data.rows;
      });
    },
    // 根据当前请求参数和页数重新请求数据
    resetData() {
      let pageReq = {
        pageNum: this.currentPage,
        pageSize,
      };
      getBorrowsList({
        pageReq,
        ...this.nowParams,
      }).then(({ data }) => {
        this.total = parseInt(data.data.total);
        this.sortData = data.data.rows;
      });
    },
  },
  created() {
    // 拿到初始的数据
    let pageReq = {
      pageNum: this.currentPage,
      pageSize,
    };
    getBorrowsList({
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