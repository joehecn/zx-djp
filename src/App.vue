<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  'use strict'

  // import { Message } from 'element-ui'

  export default {
    name: 'app'
    // beforeCreate () {
    //   this.$store.dispatch('setErr').catch(() => {
    //     Message.error({
    //       showClose: true,
    //       message: '服务器错误'
    //     })
    //   })
    // }
  }
</script>

<style scoped>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /*text-align: center;*/
  /*color: #2c3e50;*/
  /*margin-top: 60px;*/
}
</style>
