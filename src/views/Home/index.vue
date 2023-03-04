<template>
  <div class="home">
    <per-commend></per-commend>
  </div>
</template>

<script>
import perCommend from './perCom/index.vue'

export default {
  name: 'home',
  components: {
    perCommend
  }
}
</script>

<style scoped lang="scss">
.home {
  margin: 0px 100px;
}
</style>