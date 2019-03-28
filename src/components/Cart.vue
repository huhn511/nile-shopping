<template>
  <div class="cart">
    <h1 class="title">Your Shopping Cart</h1>
    <p>For shop: {{shop.data.name}}</p>
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
import { provider } from '@/config.json';
import { composeAPI } from '@iota/core'
import { generateSeed } from '../utlls/MAM'
const Converter = require('@iota/converter')

const iota = composeAPI({
    provider: provider
})
export default {
  computed: {
    ...mapGetters({
      products: "cartProducts"
    }),
    total() {
      return this.products.reduce((total, p) => {
        return total + p.price * p.quantity;
      }, 0);
    },
    shop () {
      return this.$store.state.shop
    }
  },
  methods: {
    checkout() {
      this.$confirm('If you press OK, a request will be sent to create an order which costs ' + this.total + '€. Continue?', 'Order request!', {
          confirmButtonText: 'OK',
          cancelButtonText: 'Cancel',
          type: 'success'
        }).then(() => {
          this.request_order()
          this.$message({
            type: 'success',
            message: 'Order request completed'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: 'Order request canceled'
          });          
        });
    },
    request_order: function() {

      console.log("request_order")
      console.log("this.shop", this.shop)
      // Must be truly random & 81-trytes long.
      const seed = generateSeed();

      console.log("products", this.products)

      let request_object = {
        name: 'nile shopping application',
        products: this.products
      }

      const message = Converter.asciiToTrytes(JSON.stringify(request_object))


      // Array of transfers which defines transfer recipients and value transferred in IOTAs.
      const transfers = [{
          address: this.shop.order_request_address,
          value: 0, // 1Ki
          tag: '', // optional tag of `0-27` trytes
          message: message // optional message in trytes
      }]
      console.log("transfers", transfers)

      // Depth or how far to go for tip selection entry point.
      const depth = 3 

      // Difficulty of Proof-of-Work required to attach transaction to tangle.
      // Minimum value on mainnet is `14`, `7` on spamnet and `9` on devnet and other testnets.
      const minWeightMagnitude = 14

      // Prepare a bundle and signs it.
      iota.prepareTransfers(seed, transfers)
          .then(trytes => {
              // Persist trytes locally before sending to network.
              // This allows for reattachments and prevents key reuse if trytes can't
              // be recovered by querying the network after broadcasting.

              // Does tip selection, attaches to tangle by doing PoW and broadcasts.
              return iota.sendTrytes(trytes, depth, minWeightMagnitude)
          })
          .then(bundle => {
              console.log(`Published transaction with tail hash: ${bundle[0].hash}`)
              console.log(`Bundle: ${bundle}`)
          })
          .catch(err => {
              // handle errors here
          })
    }
  }
};
</script>