<template>
  <div class="nav">
    <span>个性化图书推荐网</span>
    <el-input
      placeholder="搜索图书名"
      v-model="searchName"
      class="input-with-select"
    >
      <el-button slot="append">搜索</el-button>
    </el-input>
    <el-button>图书分类</el-button>
    <div class="is-login">
      <template v-if="isLogin"></template>
      <template>
        <span>
          欢迎, 请先
          <a href="javascript:;" class="login">登录</a>
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