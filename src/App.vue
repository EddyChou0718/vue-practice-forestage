<template>
  <div id="app">
    <headerBar></headerBar>
    <router-view/>
    <footerBar></footerBar>    
  </div>
</template>

<script>
import headerBar from '@/components/header'
import footerBar from '@/components/footer'
export default {
  components: {
    headerBar,
    footerBar
  }
}
</script>

<style lang="scss">
@import './assets/scss/all.scss';
</style>
