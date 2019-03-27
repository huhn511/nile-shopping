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
    }
  }
</script>
<style>
@import url('https://fonts.googleapis.com/css?family=Nunito');

#app {
  font-family: 'Nunito', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
