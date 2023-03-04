<template>
  <div id="app">
    <nav-bar></nav-bar>
    <cut-part></cut-part>
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
  }
}
</script>

<style lang="scss">
body {
  margin: 0px;
}
</style>
