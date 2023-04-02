<template>
  <div>
    
    <el-form :model="ruleForm" class="login">
      <h3 style="text-align: center;">后台登录系统</h3>
      <el-form-item label="用户名">
        <el-input v-model="ruleForm.username" class="username"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="ruleForm.password" class="password" show-password></el-input>
      </el-form-item>
      <el-form-item>
        <el-radio v-model="type" label="1">教师</el-radio>
        <el-radio v-model="type" label="2">管理员</el-radio>
      </el-form-item>
      <el-form-item style="text-align: center;">
        <el-button @click="handleClickLogin" type="primary" class="btn">登录</el-button>
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
      type: '1'
    };
  },
  methods: {
    handleClickLogin() {
      backLogin({
        userName: this.ruleForm.username,
        password: this.ruleForm.password,
        type: this.type
      }).then(({ data }) => {
        if (data.code === 200) {
          let token = data.data.token;
          if (data.data.type === "1") {
            this.$router.push("/manage/book");
            localStorage.setItem("backToken", token);
            localStorage.setItem("backType", data.data.type);
          } else if (data.data.type === "2") {
            this.$router.push("/manage/user");
            localStorage.setItem("backToken", token);
            localStorage.setItem("backType", data.data.type);
          }
        } else {
          this.$message.error(data.msg)
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

.btn {
  width: 100%;
  border-radius: 0px;
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
