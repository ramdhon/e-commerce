<template>
  <div id="home">
    <dd-carousel />
    <dd-list-product />
  </div>
</template>

<script>
import ddCarousel from '@/components/Carousel.vue';
import ddListProduct from '@/components/ListProduct.vue';

export default {
  name: 'Home',
  components: {
    ddCarousel,
    ddListProduct,
  },
};
</script>
