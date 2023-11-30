<template>
  <h2 v-if="list">{{ title }}</h2>
  <div class="container" v-if="list">
    <div v-for="item in list" :key="item.id">
      <router-link :to="'/show/'+item.id"><Card :show="item"/></router-link>
    </div>
  </div>
</template>

<script>
import Card from './ShowCard.vue';

export default {
  props: {
    title: null,
    list: null
  },
  components: {
    Card,
  },
};
</script>
<style lang="scss" scoped>
  @import "../assets/scss/global.scss";

  h2 {
    padding-top: 2rem;
    padding-left: 2rem;
  }

  .container {
    display: flex;
    width: 100%;
    overflow-x: auto;
    padding-left: 2rem;
  }
</style>
