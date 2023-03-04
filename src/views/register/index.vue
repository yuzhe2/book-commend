<template>
  <div class="wrap">
    <div class="login">
      <h3 class="title">注册</h3>
      <el-form :model="form" label-width="40px">
        <el-form-item label="账号">
          <el-input v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="form.password"></el-input>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="form.email"></el-input>
        </el-form-item>
        <el-form-item label="电话">
          <el-input v-model="form.phone"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-radio-group v-model="form.sex">
            <el-radio :label="1">男</el-radio>
            <el-radio :label="6">女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item>
          <el-button class="register" type="warning">注册</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: "register",
  data() {
    return {
      form: {
        username: "",
        password: "",
        email: "",
        phone: "",
        sex: "",
      },
    };
  },
};
</script>

<style scoped lang="scss">
.wrap {
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100vw;
  height: 100%;
  z-index: 999px;
  background-color: rgb(255, 165, 0);
}
.login {
  width: 350px;
  margin: 0px auto;
  margin-top: 150px;
  background-color: #fff;
  padding: 10px;
  box-shadow: 0px 0px 43px -2px rgb(135 130 135);
  border-radius: 8px;

  .title {
    text-align: center;
  }

  .register {
    transform: translateX(-10px);
    width: 100%;
  }
}
</style>
