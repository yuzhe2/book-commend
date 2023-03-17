<template>
  <div>
    <div class="search">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="用户名">
          <el-input v-model="formInline.username" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item label="手机号">
          <el-input v-model="formInline.phonenumber" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="table">
      <el-table :data="userData">
        <el-table-column
          v-for="(item, index) in userList"
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
    <el-dialog title="添加用户" :visible.sync="dialogVisible" width="30%">
      <form-panel ref="formPanel" :form-list="addList"></form-panel>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import formPanel from '@/components/formPanel/index.vue'

export default {
  name: "userManage",
  components: {
    formPanel
  },
  data() {
    return {
      dialogVisible: true,
      userData: [],
      formInline: {
        username: '',
        phonenumber: ''
      },
      addList: [
        {
          label: "用户名",
          fieldName: "username",
        },
        {
          label: "性别",
          fieldName: "sex",
        },
        {
          label: "邮箱",
          fieldName: "email",
        },
        {
          label: "电话号码",
          fieldName: "phonenumber",
        },
      ],
      userList: [
        {
          label: "用户名",
          fieldName: "username",
        },
        {
          label: "性别",
          fieldName: "sex",
        },
        {
          label: "邮箱",
          fieldName: "email",
        },
        {
          label: "电话号码",
          fieldName: "phonenumber",
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
