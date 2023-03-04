<template>
  <div class="person-recommend">
    <div class="title">
      <span class="nonius"></span>
      <span>个性化推荐</span>
    </div>
    <div class="book-list">
      <book-item
        v-for="(item, index) in 9"
        :key="index"
        class="item"
      ></book-item>
    </div>
  </div>
</template>

<script>
import bookItem from '@/components/book/index.vue'

export default {
  name: 'perCom',
  components: {
    bookItem
  }
}
</script>

<style scoped lang="scss">
.person-recommend {
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
    .item {
      width: 30%;      
    }
  }
}
</style>