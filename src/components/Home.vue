<template>
  <div class="home">
    <h1>Welcome to the nile shopping demo application!</h1>
    <p>You can browse stores, products and even buy them with iota devnet tokens!</p>
    <router-link to="/products">Discover Products!</router-link>
    <h2>Your connected to store: {{ shop.data.name }}</h2>
  </div>
</template>

<script>
export default {
  name: 'Home',
  computed: {
    shop() {
      return this.$store.getters.getShopDetails
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
