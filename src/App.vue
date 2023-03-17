<template>
  <div id="app">
    <div v-if="isShow">
      <nav-bar></nav-bar>
      <cut-part></cut-part>
    </div>
    <router-view/>
  </div>
</template>

<script>
import navBar from '@/components/navBar/index.vue'
import cutPart from '@/components/cutPart/index.vue'

export default {
  name: 'app',
  components: {
    navBar,
    cutPart
  },
  created () {
    console.log(this.$route)
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
