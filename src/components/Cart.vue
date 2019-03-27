<template>
  <div class="cart">
    <h1 class="title">Your Shopping Cart</h1>
    <p v-show="!products.length">
      <i>Your cart is empty!</i>
      <router-link to="/products">Go shopping</router-link>
    </p>
    <el-table :data="products" v-show="products.length" style="width: 100%">
      <el-table-column prop="title" label="Title" width="180"></el-table-column>
      <el-table-column prop="price" label="Price (in EUR)" width="180"></el-table-column>
      <el-table-column prop="quantity" label="Quantity"></el-table-column>
    </el-table>
    <el-card shadow="always">
      <b>Total:</b>
      {{ total }} €
    </el-card>
		<br>
    <el-button @click="checkout" v-show="products.length" type="primary" round>Checkout</el-button>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters({
      products: "cartProducts"
    }),
    total() {
      return this.products.reduce((total, p) => {
        return total + p.price * p.quantity;
      }, 0);
    }
  },
  methods: {
    checkout() {
      alert("Pay us " + this.total + " €");
    }
  }
};
</script>