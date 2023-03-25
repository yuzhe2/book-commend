<template>
  <el-form :model="ruleForm" class="login">
    <el-form-item label="用户名">
      <el-input v-model="ruleForm.username"></el-input>
    </el-form-item>
    <el-form-item label="密码">
      <el-input v-model="ruleForm.password"></el-input>
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
        username: ''
      }
    }
  },
  methods: {
    handleClickLogin () {
      backLogin({
        userName: this.ruleForm.username,
        password: this.ruleForm.password
      }).then(({ data }) => {
        let token = data.data.token
        localStorage.setItem('backToken', token)
        localStorage.setItem('backType', data.data.type)
        if (data.data.type === '1') {
          this.$router.push('/manage/book')
        } else if (data.data.type === '2') {
          this.$router.push('/manage/user')
        }
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