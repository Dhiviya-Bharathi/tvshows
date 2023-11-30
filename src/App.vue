<script setup>
import { RouterView } from 'vue-router'

</script>

<template>
  <header>
    <div class="wrapper">
      <h1>TV SHOWS</h1>
    </div>
  </header>
  <RouterView />
  <footer>

  </footer>
</template>
<style lang="scss">
  @import "./assets/scss/global.scss";

  header {
    width: 100%;
    background-color: $white;
    color: $color-primary;

    h1 {
      text-align: center;
      letter-spacing: 1rem;
    }
  }
</style>
