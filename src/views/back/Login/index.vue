<template>
  <el-form :model="ruleForm" class="login">
    <el-form-item label="用户名">
      <el-input v-model="ruleForm.username"></el-input>
    </el-form-item>
    <el-form-item label="密码">
      <el-input v-model="ruleForm.password"></el-input>
    </el-form-item>
    <el-form-item label="选择角色">
      <el-select v-model="ruleForm.roleType" placeholder="请选择角色">
        <el-option label="老师" value="1"></el-option>
        <el-option label="管理员" value="2"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item>
      <el-button @click="handleClickLogin">登录</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { backLogin } from '@/api/back/login'

export default {
  name: 'backLogin',
  data () {
    return {
      ruleForm: {
        password: '',
        username: '',
        roleType: ''
      }
    }
  },
  methods: {
    handleClickLogin () {
      backLogin({
        username: this.ruleForm.username,
        password: this.ruleForm.password
      }).then(({ data }) => {
        let token = data.token
        localStorage.setItem('token', token)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.login {
  margin: 0px 400px;
  margin-top: 100px;
}
</style>