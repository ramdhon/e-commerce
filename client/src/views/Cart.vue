<template>
  <div id="cart">
    <ul>
      <li v-for="(product, index) in cartProducts" :key="index">{{ product.name }}</li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios';

const serverUrl = 'http://localhost:3000';

export default {
  name: 'Cart',
  components: {
  },
  data() {
    return {
      cart: [],
      cartProducts: [],
    };
  },
  mounted() {
    axios
      .get(`${serverUrl}/user/carts`, {
        headers: {
          'Content-Type': 'application/json',
          token: localStorage.token,
        },
      })
      .then(({ data }) => {
        this.cartProducts = data.cart.products;
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
</script>
