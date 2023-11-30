<template>
  <div class="card">
    <img :src="show.image?.medium" alt="Card Image" />
    <div class="card-body">
      <h2 class="card-title">{{ show.name }}</h2>
      <p class="card-description" v-html="this.$options.filters.limitText(show.summary)"></p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    show: null
  },
  filters: {
    limitText: (val) => {
      if (val && val.length > 90) {
        return val.substr(0, 90) + ' ...'
      }
      return val
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/global.scss';
.card {
  border-radius: 8px;
  overflow: hidden;
  margin: 16px;
  width: 300px;
  box-shadow: 0 4px 8px $platinum;
  background-color: $white;
  transition: margin 500ms;

  &:hover {
    margin-top: -5px;
    z-index: 99;
  }

  img {
    width: 100%;
    height: 200px;
    object-fit: cover;
  }

  .card-body {
    padding: 16px;
  }

  .card-title {
    font-size: 1.5em;
    margin-bottom: 8px;
  }

  .card-description {
    color: $color-tertiary;
  }
}
</style>
