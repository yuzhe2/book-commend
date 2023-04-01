<template>
  <div class="home">
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

export default {
  name: 'home',
  components: {
    perCommend,
    hotCommend,
    newCommend
  }
}
</script>

<style scoped lang="scss">
.home {
  padding: 0px 120px;
  padding-top: 20px;
  background-color: #f1f1f1;

  .man-btn {
    position: fixed;
    display: flex;
    flex-wrap: wrap;
    top: 300px;
    right: 34px;
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
}
</style>