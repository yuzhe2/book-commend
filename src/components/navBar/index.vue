<template>
  <div class="nav">
    <span>个性化图书推荐网</span>
    <el-input
      placeholder="搜索图书名"
      v-model="searchName"
      class="input-with-select"
    >
      <el-button slot="append" @click="handleSearchName">搜索</el-button>
    </el-input>
    <el-button @click="handleJumpSort">图书分类</el-button>
    <el-button @click="handleJumpEnd">后台登录</el-button>
    <div class="is-login">
      <template v-if="isLogin">
        <span>
          <el-button @click="outerLogin">退出登录</el-button>
        </span>
      </template>
      <template v-else>
        <span>
          欢迎, 请先
          <el-button class="login" @click="jumpLoginPage">登录</el-button>
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
    handleSearchName () {
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
  align-items: center;
  justify-content: space-between;
  padding: 20px 100px;
}

.input-with-select {
  width: 250px;
}
</style>