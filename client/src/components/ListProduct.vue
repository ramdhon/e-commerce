<template>
  <div id="listProduct">
    <h1>Hot Products</h1>
    <div style="overflow:auto;white-space:nowrap">
      <b-card
        v-for="(product, index) in products"
        :key="index"
        :title="product.name"
        :img-src="product.image ? product.image : require('../assets/noPhoto.png')"
        img-alt="product"
        img-top
        tag="article"
        style="max-width: 20rem;display:inline-block;white-space:normal"
        class="mb-2"
      >
        <b-card-text>
          <p>Price: {{ priceFormat(product.price) }}</p>
          <p class="text-muted">Stock: {{ product.stock }}</p>
        </b-card-text>

        <b-button @click="addToCart(product._id)" variant="primary">Add To Cart</b-button>
      </b-card>
    </div>
  </div>
</template>

<style>
  h1 {
    margin-top: 1%;
    margin-left: 4%;
  }
  .card {
    margin: 2%;
  }
  .card:first-child {
    margin-left: 4%;
  }
  .card:last-child {
    margin-right: 4%;
  }
</style>

<script>
import axios from 'axios';

const serverUrl = 'http://localhost:3000';

export default {
  name: 'ListProduct',
  data() {
    return {
      products: [],
      cart: [],
    };
  },
  methods: {
    priceFormat(val) {
      let format = 'Rp ';
      format += val.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');

      return format;
    },
    addToCart(id) {
      // console.log(localStorage.token);
      this.cart.push(id);
      axios
        .post(`${serverUrl}/user/carts`, {
          products: [id],
        }, {
          headers: {
            'Content-Type': 'application/json',
            token: localStorage.token,
          },
        })
        .then(({ data }) => {
          console.log(data);
        })
        .catch((err) => {
          console.log(err);
        });
      // this.cart.push(id);
      // this.$emit('addToCart', this.cart);
    },
  },
  mounted() {
    axios
      .get(`${serverUrl}/products`)
      .then(({ data }) => {
        this.products = data.products;
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
</script>
