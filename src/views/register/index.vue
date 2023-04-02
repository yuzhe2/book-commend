<template>
  <div class="wrap">
    <div class="login">
      <h3 class="title">注册</h3>
      <el-form :model="form" label-width="40px">
        <el-form-item label="账号">
          <el-input v-model="form.username" class="no-radius"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="form.password" class="no-radius"></el-input>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="form.email" class="no-radius"></el-input>
        </el-form-item>
        <el-form-item label="电话">
          <el-input v-model="form.phonenumber" class="no-radius"></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <el-radio-group v-model="form.sex">
            <el-radio :label="0">男</el-radio>
            <el-radio :label="1">女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item>
          <el-button class="register" @click="handleClickRegister">注册</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { userRegister } from '@/api/top/user'

export default {
  name: "register",
  data() {
    return {
      form: {
        username: "",
        password: "",
        email: "",
        phonenumber: "",
        sex: "",
      },
    };
  },
  methods: {
    handleClickRegister () {
      userRegister((this.form)).then((res) => {
        this.$message.success('注册成功')
        this.$router.push('/login')
      }) 
    }
  }
};
</script>

<style scoped lang="scss">
.wrap {
  z-index: -1;
  background-image: url('@/assets/bg.jpg');
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  padding-top: 60px;
  height: calc(100vh - 82px);
  box-sizing: border-box;
}
.no-radius {
  ::v-deep .el-input__inner {
    border-radius: 0px;
  }
}
.login {
  width: 350px;
  margin: 0px auto;
  background-color: #f1f1f1;
  padding: 10px;
  padding-left: 20px;
  padding-right: 20px;
  box-shadow: 0px 0px 43px -2px rgb(135 130 135);

  .title {
    text-align: center;
  }

  .register {
    transform: translateX(-10px);
    width: 100%;
    border-radius: 0px;
  }
}
</style>
