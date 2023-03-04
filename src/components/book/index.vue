<template>
  <div class="book-item">
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
    </div>
  </div>
</template>

<script>
export default {
  name: 'bookItem',
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
.book-item {
  display: flex;
  border: 1px solid #dedddd;
  box-sizing: border-box;
  margin-left: 10px;
  margin-top: 20px;
  border-radius: 4px;
  cursor: pointer;

  .left {
    font-size: 0px;
    .img {
      height: 150px;
    }
  }

  .right {
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