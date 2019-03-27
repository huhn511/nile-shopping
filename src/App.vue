<template>
  <div id="app" class='container'>
    <nav-bar></nav-bar>
    <router-view></router-view>
  </div>
</template>

<script>
import NavBar from './components/NavBar.vue'
  export default {
    name: 'app',
    components: {
      NavBar
    },
    data () {
      return {}
    },
    created() {
      let root = "9SSFOA9EPGVZIYATPCITVUNBMWAZL9LUQQFUKYAPKBBENEXPJRLUUTQXPYXKFMUGTTP9UGJGEHUGKDPRJ"
      this.$store.dispatch("fetchShopDetails", root).then(() => {
        console.log("This would be printed after dispatch!!")
      })
    }
  }
</script>
<style>
@import url('https://fonts.googleapis.com/css?family=Nunito');

body {
 margin: 0;
} 

#app {
  font-family: 'Nunito', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
