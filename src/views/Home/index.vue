<template>
  <div class="home">
    <el-carousel trigger="click" height="356px" class="carousel">
      <el-carousel-item v-for="item in imgList" :key="item">
        <img :src="item" class="img" />
      </el-carousel-item>
    </el-carousel>
    <div class="sort-wrap">
      <el-breadcrumb separator="|" class="sort-list">
        <el-breadcrumb-item
          v-for="(item, index) in sortList"
          :key="index"
        >
          <span class="sort-item" :style="curId === item.id ? { color: '#409EFF' } : {}" @click="getTypeList(item.id)">{{ item.name }}</span>
        </el-breadcrumb-item>
      </el-breadcrumb>
      <div class="book-list">
        <book-item
          v-for="(item, index) in bookList"
          :key="index"
          v-bind="item"
          class="book-item"
        ></book-item>
      </div>
    </div>
    <per-commend id="per-commend"></per-commend>
    <hot-commend id="hot-commend"></hot-commend>
    <new-commend id="new-commend"></new-commend>
    <div class="man-btn">
      <a href="#per-commend" class="item">人性化</a>
      <a href="#hot-commend" class="item">热门图书</a>
      <a href="#new-commend" class="item">新书上架</a>
    </div>
  </div>
</template>

<script>
import perCommend from './perCom/index.vue'
import hotCommend from './hotCom/index.vue'
import newCommend from './newCom/index.vue'

import bookItem from '@/components/book/index.vue'

import { getTypeList, getBookListByType } from '@/api/top/sort'

export default {
  name: 'home',
  components: {
    perCommend,
    hotCommend,
    newCommend,
    bookItem
  },
  data () {
    return {
      imgList: [
        'http://www.kaoyan365.cn/uploadfile/2022/1109/20221109021645628.jpg',
        'http://www.kaoyan365.cn/uploadfile/2023/0321/20230321100750781.jpg',
        'http://www.kaoyan365.cn/uploadfile/2023/0330/20230330110831898.jpg',
        'http://www.kaoyan365.cn/uploadfile/2022/1110/20221110020330619.jpg'
      ],
      sortList: [],
      bookList: [],
      curId: ''
    }
  },
  methods: {
    getTypeList (id) {
      this.curId = id
      getBookListByType({ typeId: id }).then(({ data }) => {
        this.bookList = data.data
      })
    }
  },
  created () {
    getTypeList().then(({ data }) => {
      this.sortList = data.data
      this.getTypeList(data.data[0].id)
    })
  }
}
</script>

<style scoped lang="scss">
.home {
  position: relative;
  padding: 0px 120px;
  padding-top: 356px;
  background-color: #f1f1f1;

  .img {
    width: 100%;
  }

  .book-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    background-color: #fff;
    padding-bottom: 20px;
    padding-left: 18px;    

    .book-item {
      width: 30%;
      margin-right: 32px;
    }
  }

  .sort-wrap {
    margin-top: 10px;
    margin-bottom: 30px;
  }

  .sort-list {
    padding: 16px;
    background-color: #fff;
    margin-bottom: 20px;
    .sort-item {
      display: inline-block;
      padding: 0px 8px;
      cursor: pointer;
    }
  }

  .man-btn {
    position: fixed;
    display: flex;
    flex-wrap: wrap;
    top: 300px;
    left: 20px;
    width: 72px;
    z-index: 9999;
    .item {
      flex: 0 0 auto;
      width: 100%;
      margin-bottom: 10px;
      text-decoration: none;
      text-align: center;
      color: #fff;
      padding: 8px;
      background-color: #409EFF;
    }
  }
  .carousel {
    position: absolute;
    top: 0px;
    left: 0px;
    right: 0px;
  }
}
</style>