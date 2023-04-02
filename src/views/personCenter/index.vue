<template>
  <div class="person-center">
    <el-container>
      <el-aside class="person-aside">
        <el-menu :default-active="activeIndex" @select="handleSelect">
          <el-menu-item index="person">个人信息</el-menu-item>
          <el-menu-item index="borrow">借阅书籍</el-menu-item>
        </el-menu>
      </el-aside>
      <el-main>
        <template v-if="person">
          <div class="person-info">
            <el-form :model="form" label-width="40px">
              <el-form-item label="账号">
                <el-input v-model="form.username" class="no-radius"></el-input>
              </el-form-item>
              <el-form-item label="密码">
                <el-input v-model="form.password" class="no-radius"></el-input>
              </el-form-item>
              <el-form-item label="邮箱">
                <el-input v-model="form.email" class="no-radius"></el-input>
              </el-form-item>
              <el-form-item label="电话">
                <el-input
                  v-model="form.phonenumber"
                  class="no-radius"
                ></el-input>
              </el-form-item>
              <el-form-item label="性别">
                <el-radio-group v-model="form.sex">
                  <el-radio :label="0">男</el-radio>
                  <el-radio :label="1">女</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item>
                <el-button class="register" @click="handleChangePerson"
                  >修改</el-button
                >
              </el-form-item>
            </el-form>
          </div>
        </template>
        <template v-else>
          <el-table :data="bookList" stripe style="width: 100%">
            <el-table-column prop="bookName" label="书籍名称" width="180">
            </el-table-column>
            <el-table-column prop="createTime" label="借阅时间" width="180">
            </el-table-column>
          </el-table>
        </template>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import { updateUser, pageBorrow } from "@/api/top/user";

import bookItem from "@/components/book/index.vue";

export default {
  name: "personCenter",
  components: {
    bookItem,
  },
  data() {
    return {
      bookList: [],
      form: {},
      activeName: "first",
      activeIndex: "person",
      person: true,
    };
  },
  methods: {
    handleSelect (val) {
      this.person = val === 'person'
    },
    handleChangePerson() {
      updateUser({
        ...this.form,
        type: "0",
      }).then(() => {
        this.$message.success("用户信息修改成功");
      });
    },
  },
  created() {
    pageBorrow().then((res) => {
      this.bookList = res.data.data.borrowList;
      this.form = res.data.data.user;
    });
  },
};
</script>

<style scoped lang="scss">
.person-aside {
  .el-menu {
    height: 100%;
  }
}
.person-center {
  display: flex;
  justify-content: center;
  height: calc(100vh - 80px);
  .person-info {
    border: 1px solid #ccc;
    padding: 10px 20px;
  }
}
.borrow-wrap {
  margin-right: 200px;
  .title {
    text-align: center;
  }
}
.borrow-list {
  list-style: none;

  .borrow-item {
    display: flex;
    padding: 10px;
    margin-bottom: 20px;
    width: 200px;
    flex-wrap: wrap;
    border: 1px solid #ccc;
    .name {
      flex: 0 0 auto;
      widows: 100%;
    }
  }
}
</style>
