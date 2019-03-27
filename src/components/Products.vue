<template>
	<div>
		<h1 class="title">All Products</h1>
    	<p>{{length}} products</p>
    	<table class="table is-striped">
		    <thead>
		      <tr>
		        <th>Title</th>
		        <th>Description</th>
		        <th>Price</th>
		        <th></th>
		      </tr>
		    </thead>
		    <tbody>
		      <tr v-for="product in products" v-bind:key="product.data.id" track-by="id">
		        <td>{{product.data.title}}</td>
		        <td>{{product.data.desc}}</td>
		        <td>${{product.data.price}}</td>
		        <td><button @click='addToCart(product)' class='button is-info'>Add to cart</button></td>
		      </tr>
		    </tbody>
		</table>
	</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'app',
  computed: mapGetters({
    products: 'allProducts',
    length: 'getNumberOfProducts'
  }),
  methods: mapActions([
    'addToCart'
	])
}
</script>

<style lang="scss">

</style>