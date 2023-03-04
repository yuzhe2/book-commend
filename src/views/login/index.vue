<template>
  <div class="wrap">
    <div class="login">
      <h3 class="title">登录</h3>
      <el-form :model="form" label-width="40px">
        <el-form-item label="账号">
          <el-input v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="form.password"></el-input>
        </el-form-item>
        <el-form-item class="btns">
          <el-button type="primary">登录</el-button>
          <el-button @click="$router.push('/register')">注册</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: "login",
  data() {
    return {
      form: {
        username: "",
        password: "",
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
  width: 300px;
  margin: 0px auto;
  margin-top: 200px;
  background-color: #fff;
  padding: 10px;
  box-shadow: 0px 0px 43px -2px rgb(135 130 135);
  border-radius: 8px;

  .title {
    text-align: center;
  }

  .btns {
    text-align: center;
  }
}
</style>
