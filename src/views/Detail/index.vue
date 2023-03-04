<template>
  <div class="detail">
    <div class="left">
      <img :src="image" class="img">
    </div>
    <div class="right">
      <div class="title">[{{ type }}]{{book_name}}</div>
      <div class="author">
        <span class="prefix">作者: </span>
        {{ author }}
      </div>
      <div class="publish">
        <span class="prefix">出版社: </span>
        {{ publish }}
      </div>
      <el-button>借阅图书</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'bookDetail',
  data () {
    return {
      bookId: '11111',
      image: 'https://www.xyyuedu.com/uploads/140811/156-140Q1213105202.jpg',
      'book_name': '月海电台',
      author: '夏桑',
      publish: '重庆出版集团',
      type: '科幻'
    }
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