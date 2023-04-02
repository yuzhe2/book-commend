<template>
  <div>
    <div class="search">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="书名">
          <el-input
            v-model="formInline.bookName"
            placeholder="请输入书名"
          ></el-input>
        </el-form-item>
        <el-form-item label="作者">
          <el-input
            v-model="formInline.author"
            placeholder="请输入作者 "
          ></el-input>
        </el-form-item>
        <el-form-item label="分类">
          <el-select
            v-model="formInline.typeId"
            placeholder="请输入分类"
            clearable
          >
            <el-option
              v-for="item in sortOps"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <div class="control-btn">
            <el-select v-model="manType" @change="handleManChange">
              <el-option value="1" label="查询"></el-option>
              <el-option value="2" label="添加"></el-option>
            </el-select>
          </div>
        </el-form-item>
      </el-form>
    </div>
    <div class="table">
      <el-table :data="bookData">
        <template v-for="(item, index) in bookList">
          <el-table-column
            v-if="item.fieldName === 'typeid'"
            :prop="item.fieldName"
            :label="item.label"
          >
            <template slot-scope="scope">
              <el-tag type="success">{{ getSort(scope.row.typeid) }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column
            v-else-if="item.fieldName === 'bookName'"
            :prop="item.fieldName"
            :label="item.label"
            width="200px"
          >
            <template slot-scope="scope">
              <div class="book">
                <img :src="scope.row.image" style="width: 50px; margin-right: 8px;" />
                <span span>{{ scope.row.bookName }}</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            v-else-if="item.fieldName === 'createTime'"
            :prop="item.fieldName"
            :label="item.label"
            width="160px"
          >
            <template slot-scope="scope">
              <span>{{ scope.row.createTime }}</span>
            </template>
          </el-table-column>
          <el-table-column
            v-else
            :prop="item.fieldName"
            :label="item.label"
          >
          </el-table-column>
        </template>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="handleDeleteUser(scope.row)">删除</el-button>
            <el-button type="text" size="small" @click="handleEditUser(scope.row)">编辑</el-button>
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
import { getBookList, addBook, updateBook, deleteBook } from "@/api/back/book";
import { getSortList } from "@/api/back/sort";

const pageSize = 10;

export default {
  name: "bookManage",
  components: {
    formPanel,
  },
  data() {
    return {
      dialogVisible: false, // 添加弹窗显示
      bookData: [],
      manType: '1',
      total: 10, // 数据总数
      currentPage: 1, // 当前页数
      type: 'add', // 用于记录对图书的何种操作 add --- 添加, edit --- 编辑
      bookId: '', // 记录当前要修改的图书id
      sortOps: [], // 分类的字典数据
      formInline: {
        bookName: "",
        typeId: "",
        author: "",
      },
      bookList: [
        {
          label: "名称",
          fieldName: "bookName",
        },
        {
          label: "评分",
          fieldName: "score",
        },
        {
          label: "作者",
          fieldName: "author",
        },
        {
          label: "库存",
          fieldName: "inventory",
        },
        {
          label: "创建时间",
          fieldName: "createTime",
        },
        {
          label: '分类',
          fieldName: 'typeid'
        }
      ],
      addList: [
        {
          type: "INPUT",
          label: "图书名称",
          initValue: "",
          fieldName: "bookName",
        },
        {
          type: "INPUT",
          label: "库存",
          initValue: "",
          fieldName: "inventory",
        },
        {
          type: "INPUT",
          label: "出版社",
          initValue: "",
          fieldName: "publish",
        },
        {
          type: "SELECT",
          label: "分类",
          initValue: "",
          fieldName: "typeid",
          itemList: []
        },
        {
          type: "INPUT",
          label: "作者",
          fieldName: "author",
          initValue: "",
        },
        {
          type: "INPUT",
          label: "图片",
          initValue: "",
          fieldName: "image",
        },
        {
          type: "INPUT",
          label: "评分",
          initValue: "",
          fieldName: "score",
        },
      ],
    };
  },
  methods: {
    handleManChange (value) {
      if (value === '1') {
        this.handleSearch()
      } else if (value === '2') {
        this.openDialog()
      }
    },
    // 根据id获取分类名称
    getSort (id) {
      return this.sortOps.find(val => val.value === id).label
    },
    // 删除图书
    handleDeleteUser(row) {
      deleteBook(row.id).then(() => {
        this.resetData();
        this.$message({
          type: "success",
          message: "删除成功",
        });
      });
    },
    // 编辑图书
    handleEditUser(row) {
      this.bookId = row.id;
      this.type = "edit";
      this.dialogVisible = true;
      this.addList = this.addList.map((val) => {
        val.initValue = row[val.fieldName];
        return val;
      });
      console.log(this.addList)
    },
    // 根据参数查询图书
    handleSearch() {
      let params = this.formInline;
      this.nowParams = params; // 记录当前的参数, 用于翻页时
      let pageReq = {
        pageNum: 1,
        pageSize,
      };
      getBookList({
        pageReq,
        ...this.nowParams,
      }).then(({ data }) => {
        this.total = parseInt(data.data.total);
        this.bookData = data.data.rows;
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
      getBookList({
        pageReq,
        ...this.nowParams,
      }).then(({ data }) => {
        this.bookData = data.data.rows;
      });
    },
    // 打开添加图书弹窗
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
      getBookList({
        pageReq,
        ...this.nowParams,
      }).then(({ data }) => {
        this.total = parseInt(data.data.total);
        this.bookData = data.data.rows;
      });
    },
    // 添加或修改图书
    handleAddUser(bookInfo) {
      this.closeDialog();
      if (this.type === "add") {
        addBook(bookInfo).then((res) => {
          this.resetData();
          this.$message({
            type: "success",
            message: "添加图书成功",
          });
        });
      } else if (this.type === "edit") {
        updateBook({
          id: this.bookId,
          ...bookInfo,
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
    getBookList({
      pageReq,
    }).then(({ data }) => {
      this.total = parseInt(data.data.total);
      this.bookData = data.data.rows;
    });
    getSortList({ typeName: '' }).then(({data}) => {
      let sortOps = []
      for (let i = 0; i < data.data.length; i++) {
        let obj = {}
        obj.label = data.data[i].name
        obj.value = data.data[i].id
        sortOps.push(obj)
      }
      let itemList = []
      for (let i = 0; i < data.data.length; i++) {
        let obj = {}
        obj.text = data.data[i].name
        obj.value = data.data[i].id
        itemList.push(obj)
      }
      this.addList[3].itemList = itemList
      this.sortOps = sortOps
    })
  },
};
</script>

<style scoped lang="scss">
.table-page {
  text-align: right;
}
.book {
  display: flex;
  align-items: center;
}
.table {
  ::v-deep .el-table {
    box-sizing: unset !important;
    padding-left: 10px;
  }
}
</style>