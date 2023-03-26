<template>
  <div class="book-item" @click="goBookDetail">
    <div class="left">
      <img :src="image" class="img">
    </div>
    <div class="right">
      <div class="title">[{{ type }}]{{bookName}}</div>
      <div class="author">
        <span class="prefix">作者: </span>
        {{ author }}
      </div>
      <div class="publish">
        <span class="prefix">出版社: </span>
        {{ publish }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'bookItem',
  props: {
    image: String,
    bookName: String,
    id: String,
    author: String,
    publish: String
  },
  data () {
    return {
      type: '科幻'
    }
  },
  methods: {
    goBookDetail () {
      this.$router.push(`/detail/${this.id}`)
    }
  }
}
</script>

<style lang="scss" scoped>
.book-item {
  display: flex;
  border: 1px solid #dedddd;
  box-sizing: border-box;
  margin-left: 10px;
  margin-top: 20px;
  border-radius: 4px;
  cursor: pointer;
  user-select: none;

  .left {
    font-size: 0px;
    .img {
      height: 150px;
    }
  }

  .right {
    margin-left: 20px;
    .title {
      color: #D24c3e;
      font-weight: bold;
      margin-top: 20px;
      margin-bottom: 10px;
    }

    .author {
      margin-bottom: 10px;
    }

    .author,
    .publish {
      color: #393392;
      font-size: 12px;

      .prefix {
        color: #22126e;
        font-size: 13px;
        font-weight: bold;
      }
    }
  }
}
</style>