<template>
  <div>
    <h1>This is an about page {{ $route.params.id }}</h1>
    {{ getShowDetails($route.params.id) }}
  </div>
</template>
<script>
export default {
  methods: {
    getShowDetails(id) {
      return this.$store.getters.showDetails(id).length ? this.$store.getters.showDetails(id) : this.$store.getters.filteredShowDetails(id);
    },
  },
};
</script>
<style>

</style>
