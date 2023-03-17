<template>
  <div>
    <div class="search">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="书名">
          <el-input v-model="formInline.bookName" placeholder="请输入书名"></el-input>
        </el-form-item>
        <el-form-item label="作者">
          <el-input v-model="formInline.author" placeholder="请输入作者"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary">查询</el-button>
          <el-button type="primary">新增</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="table">
      <el-table :data="bookData">
        <el-table-column
          v-for="(item, index) in bookList"
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
  name: "bookManage",
  data() {
    return {
      bookData: [],
      formInline: {
        bookName: '',
        author: ''
      },
      bookList: [
        {
          label: "名称",
          fieldName: "book_name",
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
          fieldName: "create_time",
        },
      ],
    };
  },
};
</script>
