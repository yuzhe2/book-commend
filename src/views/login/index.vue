<template>
  <div class="wrap">
    <div class="login">
      <h3 class="title">登录</h3>
      <el-form :model="form" label-width="40px">
        <el-form-item label="账号">
          <el-input v-model="form.userName" class="username"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="form.password" class="password" show-password></el-input>
        </el-form-item>
        <el-form-item>
          <el-radio v-model="type" label="0">学生</el-radio>
          <el-radio v-model="type" label="1">教师</el-radio>
        </el-form-item>
        <el-form-item class="btns">
          <el-button type="primary" @click="handleClickLogin" class="jump">登录</el-button>
          <el-button @click="$router.push('/register')" class="register">注册</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { userLogin } from '@/api/top/user'

export default {
  name: "login",
  data() {
    return {
      form: {
        userName: "",
        password: "",
      },
      type: '0'
    };
  },
  methods: {
    handleClickLogin () {
      userLogin({
        ...this.form,
        type: this.type
      }).then(({ data }) => {
        if (data.code == 200) {
          let userInfo = data.data
          localStorage.setItem('frontToken', userInfo.token)
          localStorage.setItem('userId', userInfo.user.id)
          this.$store.commit('changeLoginStatus', true)
          this.$router.push('/home')
          this.$message.success('登录成功')
        } else {
          this.$message.error(data.msg)
        }
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
  padding-top: 130px;
  height: calc(100vh - 82px);
  box-sizing: border-box;
}

.username,
.password {
  ::v-deep .el-input__inner {
    border-radius: 0px;
  }
}
.login {
  width: 300px;
  margin: 0px auto;
  background-color: #f1f1f1;
  padding: 10px;
  padding-left: 16px;
  padding-right: 16px;
  box-shadow: 0px 0px 43px -2px rgb(135 130 135);

  .title {
    text-align: center;
  }

  .btns {
    text-align: center;

    ::v-deep .el-form-item__content {
      margin-left: 0px !important;
    }
    .register,
    .jump {
      border-radius: 0px;
    }
    .register {
      margin-left: 40px;
    }
  }
}
</style>
