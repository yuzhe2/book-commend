<template>
  <div>
    <div class="header">
      <span class="title">后台管理系统</span>
      <el-button @click="outLogin" class="btn">退出登录</el-button>
    </div>
    <el-container class="container">
    <el-aside class="aside">
      <el-menu router :default-active="currentName">
        <el-menu-item
          v-for="(item, index) in getCurPage()"
          :key="index"
          :index="item.path"
        >
          <span slot="title">{{ item.title }}</span>
        </el-menu-item>
      </el-menu>
    </el-aside>
    <el-main class="main">
      <router-view></router-view>
    </el-main>
  </el-container>
  </div>
</template>

<script>
export default {
  name: 'manageWrap',
  data () {
    return {
      currentName: '',
      pageRoute: [
        {
          path: '/manage/user',
          title: '用户管理'
        },
        {
          path: '/manage/book',
          title: '图书管理'
        },
        {
          path: '/manage/sort',
          title: '分类管理'
        },
        {
          path: '/manage/borrow',
          title: '借阅管理'
        }
      ]
    }
  },
  methods: {
    // 退出登录
    outLogin () {
      this.$router.push('/home')
      localStorage.removeItem('backToken')
    },
    getCurPage () {
      const type = localStorage.getItem('backType')
      if (type === '1') {
        return this.pageRoute.slice(1)
      }
      return this.pageRoute
    }
  },
  created () {
    this.currentName = this.$route.path
  }
}
</script>

<style scoped lang="scss">
.header {
  height: 44px;
  background-color: #fff;
  padding: 8px 10px 8px 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
  .title {
    display: inline-block;
    height: 100%;
    font-size: 22px;
    font-weight: bold;
    line-height: 44px;
  }
  .btn {
    float: right;
  }
}
.container {
  height: calc(100vh - 44px);
  .aside {
    width: 200px !important;
    border-right: solid 1px #e6e6e6;
  }
  .main {
    background-color: #f1f1f1;
    // border: 1px;
  }
}
</style>