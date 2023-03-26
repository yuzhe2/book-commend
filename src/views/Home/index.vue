<template>
  <div class="home">
    <per-commend></per-commend>
    <hot-commend></hot-commend>
    <new-commend></new-commend>
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
  margin: 0px 100px;
}
</style>