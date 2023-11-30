<template>
  <div>
    <div v-if="loading">Loading...</div>
    <div v-else>
      <div v-if="genres">
        <div v-for="genre in genres" :key="genre">
          <ShowList :title="genre" :list="showsByGenre(genre)"/>
        </div>
      </div>
      <div v-else>No data available</div>
    </div>
  </div>
</template>

<script>
import ShowList from './ShowList.vue';

export default {
  components: {
    ShowList,
  },
  computed: {
    loading() {
      return this.$store.getters.loading;
    },
    genres() {
      return this.$store.getters.genres?.slice(0,5);
    },
  },
  methods: {
    showsByGenre(genre) {
      return this.$store.getters.showsByGenre(genre)?.slice(0,5);
    },
  },
  mounted() {
    this.$store.dispatch('fetchAllShows');
  },
};
</script>
