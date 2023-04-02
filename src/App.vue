<template>
  <div id="app" :style="isShow ? { 'padding-top': '80px' } : {}">
    <div v-if="isShow">
      <nav-bar></nav-bar>
    </div>
    <router-view/>
  </div>
</template>

<script>
import navBar from '@/components/navBar/index.vue'

export default {
  name: 'app',
  components: {
    navBar,
  },
  computed: {
    isShow() {
      let path = this.$route.path
      return !path.includes('manage')
    }
  }
}
</script>

<style lang="scss">
body {
  margin: 0px;
}
</style>
