<template>
  <div class="sort-wrap">
    <div class="sort-list">
      <div
        class="sort-item"
        v-for="item in sortList"
        :key="item.id"
      >
        <el-tag class="sort-text" @click="getTypeList(item.id)">{{ item.name }}</el-tag>
      </div>
    </div>
    <div class="book-list">
      <book-item
        v-for="(item, index) in bookList"
        :key="index"
        v-bind="item"
        class="book-item"
      ></book-item>
    </div>
  </div>
</template>

<script>
import { getTypeList, getBookListByType } from '@/api/top/sort'
import bookItem from '@/components/book/index.vue'

export default {
  name: 'bookSort',
  components: {
    bookItem
  },
  data () {
    return {
      sortList: [],
      bookList: []
    }
  },
  methods: {
    getTypeList (id) {
      getBookListByType({ typeId: id }).then(({ data }) => {
        this.bookList = data.data
      })
    }
  },
  created () {
    getTypeList().then(({ data }) => {
      this.sortList = data.data
    })
  }
}
</script>

<style scoped lang="scss">
.sort-wrap {
  padding: 0px 16px;
  padding-top: 20px;
  background-color: #f1f1f1;
  height: calc(100vh - 124px);
  box-sizing: border-box;
  .sort-list {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    margin: 0px 360px;
    .sort-item {
      cursor: pointer;
    }
  }
  .book-list {
    display: flex;
    justify-content: space-between;
    .book-item {
      width: 30%;
    }
  }
}
</style>