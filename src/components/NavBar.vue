<template>
  <el-menu
		:router="true"
    :default-active="$route.path"
    class="el-menu-demo"
    mode="horizontal"
    @select="handleSelect"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b">
      <el-menu-item index="/">Home</el-menu-item>
      <el-menu-item index="products">Discover Products</el-menu-item>
      <el-menu-item index="cart">
        <span class="icon">
          <i class="fa fa-shopping-cart"></i>
        </span>
        <span>Checkout ({{itemsInCart}})</span>
      </el-menu-item>
  </el-menu>
</template>

<style lang="scss">
</style>

<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    itemsInCart() {
      let cart = this.$store.getters.cartProducts;
      return cart.reduce((accum, item) => accum + item.quantity, 0);
    }
  }
};
</script>