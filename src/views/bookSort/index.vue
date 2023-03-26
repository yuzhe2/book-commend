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
  </div>
</template>

<script>
import { getTypeList } from '@/api/top/sort'

export default {
  name: 'bookSort',
  data () {
    return {
      sortList: []
    }
  },
  methods: {
    getTypeList (id) {

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
  margin-top: 20px;
  .sort-list {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    margin: 0px 360px;
  }
}
</style>