<template>
  <div class="detail">
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
      <el-button @click="borrowBook">借阅图书</el-button>
    </div>
  </div>
</template>

<script>
import { getBookById, borrowBook } from '@/api/top/book'

export default {
  name: 'bookDetail',
  data () {
    return {
      bookId: '',
      image: '',
      bookName: '',
      author: '',
      publish: '',
      type: '科幻'
    }
  },
  methods: {
    borrowBook () {
      borrowBook(this.bookId).then(() => {
        this.$message.success('借阅成功')
      })
    }
  },
  created () {
    let id = this.$route.params.id
    getBookById(id).then(({ data }) => {
      let book = data.data
      this.bookId = book.id
      this.author = book.author
      this.image = book.image
      this.publish = book.publish
      this.bookName = book.bookName
    })
  }
}
</script>

<style lang="scss" scoped>
.detail {
  margin: 0px 100px;
  margin-top: 40px;
  display: flex;

  .left {
    font-size: 0px;
    .img {
      width: 300px;
    }
  }

  .right {
    margin-left: 20px;
    .title {
      color: #22126e;
      font-weight: bold;
      font-size: 22px;
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
      margin-bottom: 10px;
    }
  }
}
</style>