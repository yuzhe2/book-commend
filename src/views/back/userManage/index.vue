<template>
  <div>
    <div class="search">
      <el-form :inline="true" :model="formInline" class="form">
        <el-form-item label="用户名" class="item">
          <el-input v-model="formInline.name" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item label="用户状态" class="item">
          <el-select v-model="formInline.status" clearable>
            <el-option label="正常" value="0"></el-option>
            <el-option label="停用" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="性别" class="item">
          <el-select v-model="formInline.sex" clearable>
            <el-option label="男" value="0"></el-option>
            <el-option label="女" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="用户类型" class="item">
          <el-select v-model="formInline.type" clearable>
            <el-option label="学生" value="0"></el-option>
            <el-option label="教师" value="1"></el-option>
            <el-option label="管理员" value="2"></el-option>
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
      <el-table :data="userData">
        <template v-for="(item, index) in userList">
          <el-table-column
            :prop="item.fieldName"
            :label="item.label"
            v-if="item.fieldName === 'sex'"
          >
            <template slot-scope="scope">
              {{ scope.row.sex == '0' ? '男' : '女' }}
            </template>
          </el-table-column>
          <el-table-column
            :prop="item.fieldName"
            :label="item.label"
            v-else-if="item.fieldName === 'type'"
          >
            <template slot-scope="scope">
              <el-tag type="success">{{ userTypeList[scope.row.type] }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column
            :prop="item.fieldName"
            :label="item.label"
            v-else-if="item.fieldName === 'status'"
          >
            <template slot-scope="scope">
              <el-tag type="success">{{ scope.row.status === 0 ? '启用' : '停用' }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column v-else :prop="item.fieldName" :label="item.label"></el-table-column>
        </template>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="handleDeleteUser(scope.row)">删除</el-button>
            <el-button type="text" size="small" @click="handleEditUser(scope.row)">编辑</el-button>
            <el-button type="text" size="small" @click="handleChangeStatus(scope.row)">
              {{ scope.row.status == '0' ? '停用' : '启用' }}
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-pagination
      class="table-page"
      layout="prev, pager, next"
      :total="total"
      :page-size="5"
      :currentPage.sync="currentPage"
      @current-change="handleChangePage"
    >
    </el-pagination>
    <el-dialog :title=" type === 'add' ? '添加用户' : '修改用户'" :visible.sync="dialogVisible" width="30%">
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

import { getUserList, addUser, updateUser, deleteUser, changeStatus } from "@/api/back/user";

const pageSize = 5

export default {
  name: "userManage",
  components: {
    formPanel,
  },
  data() {
    return {
      dialogVisible: false, // 添加弹窗显示
      manType: '1', // 操作类型
      total: 10, // 数据总数
      currentPage: 1, // 当前页数
      userTypeList: ['普通用户', '教授', '管理员'],
      userData: [], // 用户数据
      nowParams: {}, // 当前查询的参数
      userId: '', // 记录当前要修改的用户id
      type: 'add', // 用于记录对用户的何种操作 add --- 添加, edit --- 编辑
      formInline: {
        name: "",
        status: '',
        sex: '',
        type: ''
      },
      addList: [
        {
          type: 'INPUT',
          label: "用户名",
          initValue: '',
          fieldName: "username",
        },
        {
          type: 'INPUT',
          label: "密码",
          initValue: '',
          fieldName: "password",
        },
        {
          type: 'SELECT',
          label: "性别",
          fieldName: "sex",
          initValue: '',
          itemList: [
            { value: '0', text: '男' },
            { value: '1', text: '女' }
          ]
        },
        {
          type: 'INPUT',
          label: "邮箱",
          initValue: '',
          fieldName: "email",
        },
        {
          type: 'INPUT',
          label: "电话号码",
          initValue: '',
          fieldName: "phonenumber",
        },
        {
          type: 'SELECT',
          label: "用户类型",
          fieldName: "type",
          initValue: '',
          itemList: [
            { value: '0', text: '普通用户' },
            { value: '1', text: '教授' },
            { value: '2', text: '管理员' }
          ]
        }
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
          fieldName: "createTime",
        },
        {
          label: '用户类型',
          fieldName: 'type'
        },
        {
          label: '用户状态',
          fieldName: 'status'
        }
      ],
    };
  },
  methods: {
    // 根据用户的操作执行不同的方法
    handleManChange (value) {
      if (value === '1') {
        this.handleSearch()
      } else if (value === '2') {
        this.openDialog()
      }
    },
    // 更改用户状态 --- 停用或启用
    handleChangeStatus (row) {
      let status = row.status === 0 ? 1 : 0
      changeStatus({
        id: row.id,
        status: status
      }).then(res => {
        this.$message.success('更改用户状态成功')
        this.resetData()
      })
    },
    // 删除用户
    handleDeleteUser (row) {
      deleteUser(row.id).then(() => {
        this.resetData()
        this.$message({
          type: 'success',
          message: '删除成功'
        })
      })
    },
    // 编辑用户
    handleEditUser (row) {
      this.userId = row.id
      this.type = 'edit'
      this.dialogVisible = true
      this.addList = this.addList.map(val => {
        val.initValue = row[val.fieldName]
        return val
      })
    },
    // 根据参数查询用户
    handleSearch () {
      let params = this.formInline
      this.nowParams = params // 记录当前的参数, 用于翻页时
      let pageReq = {
        pageNum: 1,
        pageSize
      }
      getUserList({
        pageReq,
        ...this.nowParams
      }).then(({ data }) => {
        this.total = parseInt(data.data.total)
        this.userData = data.data.rows
        this.$message({
          type: 'success',
          message: '查询成功'
        })
      })
    },
    // 关闭弹窗
    closeDialog () {
      this.dialogVisible = false
    },
    // 当前页改变时
    handleChangePage () {
      let pageReq = {
        pageNum: this.currentPage,
        pageSize
      }
      getUserList({
        pageReq,
        ...this.nowParams
      }).then(({ data }) => {
        this.userData = data.data.rows
      })
    },
    // 打开添加用户弹窗
    openDialog () {
      this.dialogVisible = true
      this.type = 'add'
      this.addList = this.addList.map(val => {
        val.initValue = ''
        return val
      })
    },
    // 根据当前请求参数和页数重新请求数据
    resetData () {
      let pageReq = {
        pageNum: this.currentPage,
        pageSize
      }
      getUserList({
        pageReq,
        ...this.nowParams
      }).then(({ data }) => {
        this.total = parseInt(data.data.total)
        this.userData = data.data.rows
      })
    },
    // 添加或修改用户
    handleAddUser (userInfo) {
      this.closeDialog()
      if (this.type === 'add') {
        addUser(userInfo).then(res => {
          this.resetData()
          this.$message({
            type: 'success',
            message: '添加用户成功'
          })
        })
      } else if (this.type === 'edit') {
        updateUser({
          id: this.userId,
          ...userInfo
        }).then(res => {
          this.resetData()
          this.$message({
            type: 'success',
            message: '修改成功'
          })
        })
      }
    }
  },
  created () {
    // 拿到初始的数据
    let pageReq = {
      pageNum: this.currentPage,
      pageSize
    }
    getUserList({
      pageReq
    }).then(({ data }) => {
      this.total = parseInt(data.data.total)
      this.userData = data.data.rows
    })
  }
};
</script>

<style scoped lang="scss">
.table-page {
  text-align: right;
}
.form {
  display: flex;
  align-items: center;
}
.item {
  width: 20%;
}
.control-btn {
  transform: translateY(18px);
}
</style>