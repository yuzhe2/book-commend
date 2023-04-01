<template>
  <div class="search-wrap">
    <div class="search-list">
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
import bookItem from '@/components/book/index.vue'
import { getBookListByName } from '@/api/top/book'

export default {
  name: 'bookSearch',
  components: {
    bookItem
  },
  data () {
    return {
      bookList: []
    }
  },
  created () {
    let bookName = this.$route.query.name
    getBookListByName({bookName}).then(({data}) => {
      this.bookList = data.data
    })
  }
}
</script>

<style scoped lang="scss">
.search-wrap {
  padding: 0px 16px;
  .search-list {
    display: flex;
    justify-content: space-between;
    .book-item {
      width: 30%;
    }
  }
}

</style>