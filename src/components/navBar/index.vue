<template>
  <div class="nav">
    <a @click="jumpHome" class="home">个性化图书推荐网</a>
    <el-input
      placeholder="搜索图书名"
      v-model="searchName"
      class="input-with-select"
    >
      <el-button slot="append" @click="handleSearchName">搜索</el-button>
    </el-input>
    <a @click="handleJumpEnd" class="blue">后台登录</a>
    <div class="is-login">
      <template v-if="isLogin">
        <span>
          <a @click="jumpPerson" class="person blue">个人中心</a>
          <a @click="outerLogin" class="blue">退出登录</a>
        </span>
      </template>
      <template v-else>
        <span>
          欢迎, 请先
          <a class="login blue" @click="jumpLoginPage">登录</a>
        </span>
      </template>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'navBar',
  data () {
    return {
      searchName: ''
    }
  },
  computed: {
    ...mapState({
      isLogin: state => state.isLogin
    })
  },
  methods: {
    jumpHome () {
      this.$router.push('/home')
    },
    jumpPerson () {
      this.$router.push('/me')
    },
    handleSearchName () {
      if (!this.searchName) {
        return this.$message.warning('输入不能为空')
      }
      this.$router.push(`/search?name=${this.searchName}`)
    },
    handleJumpSort () {
      this.$router.push('/sort')
    },
    // 后台登录
    handleJumpEnd () {
      this.$router.push(`/manage/login`)
    },
    jumpLoginPage () {
      this.$router.push(`/login`)
    },
    outerLogin () {
      this.$store.commit('changeLoginStatus', false)
      localStorage.removeItem('frontToken')
      localStorage.removeItem('userId')
      this.$message.success('退出登录成功')
    }
  },
  created () {
    if (localStorage.getItem('frontToken')) {
      this.$store.commit('changeLoginStatus', true)
    }
  }
}
</script>

<style lang="scss" scoped>
.nav {
  display: flex;
  position: fixed;
  top: 0px;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  padding: 20px 100px;
  background-color: #fff;
  z-index: 99;
  box-sizing: border-box;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)
}

a {
  cursor: pointer;
}

.blue {
  color: #409EFF;
}

.person {
  margin-right: 20px;
}

.input-with-select {
  width: 250px;
}
</style>