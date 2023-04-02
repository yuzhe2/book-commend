<template>
  <div class="person-recommend">
    <div class="title">
      <span class="nonius"></span>
      <span>个性化推荐</span>
    </div>
    <div class="book-list">
      <book-item
        v-for="(item, index) in bookList"
        v-bind="item"
        :key="index"
        class="item"
      ></book-item>
    </div>
    <el-pagination
      class="book-page"
      layout="prev, pager, next"
      :total="bookTotal"
      :page-size="12"
      :current-page.sync="curPage"
      @current-change="handlePageChange"
    >
    </el-pagination>
  </div>
</template>

<script>
import bookItem from '@/components/book/index.vue'
import { getPersonalBookList } from '@/api/top/book'

const pageSize = 12

export default {
  name: 'perCom',
  components: {
    bookItem
  },
  data () {
    return {
      curPage: 1,
      bookList: [],
      bookTotal: 0
    }
  },
  methods: {
    handlePageChange () {
      this.requestCurPage()
    },
    // 请求当前页的数据
    requestCurPage () {
      let params = {
        pageNum: this.curPage,
        pageSize
      }
      getPersonalBookList(params).then(({ data }) => {
        this.bookList = data.data.rows
        this.bookTotal = parseInt(data.data.total)
      })
    }
  },
  created () {
    this.requestCurPage()
  }
}
</script>

<style scoped lang="scss">
.person-recommend {
  .book-page {
    text-align: center;
    margin-top: 10px;
  }
  .title {
    display: flex;
    height: 24px;
    font-size: 20px;
    line-height: 24px;
    margin-bottom: 10px;
    .nonius {
      width: 2px;
      height: 100%;
      background-color: #ba3e2e;
      margin-right: 8px;
    }
  }

  .book-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    background-color: #fff;
    .item {
      width: 30%;      
    }
  }
}
</style>