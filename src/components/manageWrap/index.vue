<template>
  <el-container class="container">
    <el-aside class="aside">
      <el-menu router :default-active="currentName">
        <el-menu-item
          v-for="(item, index) in pageRoute"
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
      ]
    }
  }
}
</script>

<style scoped lang="scss">
.container {
  height: 100vh;
  .aside {
    border-right: solid 1px #e6e6e6;
  }
  .main {
    // border: 1px;
  }
}
</style>