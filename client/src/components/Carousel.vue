<template>
  <div id="carousel">
    <b-carousel id="carousel-1"
      v-model="slide" :interval="4000" controls indicators background="#ababab"
      style="text-shadow: 1px 1px 2px #333;" @sliding-start="onSlideStart"
      @sliding-end="onSlideEnd">
      <b-carousel-slide
        v-for="(image, index) in images"
        :key="index">
        <img slot="img"
          class="d-block img-fluid w-100 css-cover css-h css-adj" width="1024" height="480"
          :src="image.src" :alt="image.caption">
      </b-carousel-slide>
    </b-carousel>
  </div>
</template>

<script>
export default {
  name: 'Carousel',
  data() {
    return {
      slide: 0,
      currentSlide: 0,
      sliding: null,
      images: [
        {
          src: 'https://bestshoppingindia.files.wordpress.com/2013/04/new-banner.jpg',
          caption: 'Shopping',
        },
        {
          src: 'http://st2.depositphotos.com/2951317/10236/v/950/depositphotos_102362356-stock-illustration-online-shopping-concept-with-vector.jpg',
          caption: 'Cart',
        },
        {
          src: 'http://pluspng.com/img-png/sale-hd-png-big-sale-motion-tag-discount-and-special-offer-50-off-4k-black-friday-animation-online-shopping-banner-include-png-alpha-channel-1920.png',
          caption: 'Sale',
        },
      ],
    };
  },
  methods: {
    onSlideStart() {
      this.sliding = true;
    },
    onSlideEnd() {
      this.sliding = false;
    },
  },
};
</script>

<style>
  .css-cover {
    object-fit: cover;
  }
  .css-h {
    height: 91vh;
  }
  .css-top {
    object-position: 50% 0;
  }
  .css-bottom {
    object-position: 50% 100%;
  }
  .css-center {
    object-position: 50% 50%;
  }
  .css-adj {
    object-position: 50% 50%;
  }
</style>
