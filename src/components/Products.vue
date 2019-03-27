<template>
	<div>
		<h1 class="title">All Products</h1>
		<p>{{length}} products</p>
		<el-row :gutter="12" >
			<el-col :span="8" v-for="product in products" v-bind:key="product.data.id">
				<el-card shadow="hover">
					<h3>Title: {{product.data.title}}</h3>
					<p>{{product.data.desc}}</p>
					<p>Price: {{product.data.price}}</p>
					<el-button @click='addToCart(product)' type="primary" round>Add to cart</el-button>
				</el-card>
			</el-col>
		</el-row>
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