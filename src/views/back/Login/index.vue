<template>
  <div>
    
    <el-form :model="ruleForm" class="login">
      <h3 style="text-align: center;">后台登录系统</h3>
      <el-form-item label="用户名">
        <el-input v-model="ruleForm.username" class="username"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="ruleForm.password" class="password"></el-input>
      </el-form-item>
      <el-form-item style="text-align: center;">
        <el-button @click="handleClickLogin">登录</el-button>
      </el-form-item>
    </el-form>
    <div class="bg"></div>
  </div>
</template>

<script>
import { backLogin } from "@/api/back/login";

export default {
  name: "backLogin",
  data() {
    return {
      ruleForm: {
        password: "",
        username: "",
      },
    };
  },
  methods: {
    handleClickLogin() {
      backLogin({
        userName: this.ruleForm.username,
        password: this.ruleForm.password,
      }).then(({ data }) => {
        let token = data.data.token;
        localStorage.setItem("backToken", token);
        localStorage.setItem("backType", data.data.type);
        if (data.data.type === "1") {
          this.$router.push("/manage/book");
        } else if (data.data.type === "2") {
          this.$router.push("/manage/user");
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.login {
  width: 300px;
  margin: 100px auto;
  border: 1px solid #409EFF;
  padding: 16px;
  background-color: #f1f1f1;

  .username,
  .password {
    ::v-deep .el-input__inner {
      border-radius: 0px;
    }
  }
}

.bg {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: -1;
  background-image: url('@/assets/bg.jpg');
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}
</style>
