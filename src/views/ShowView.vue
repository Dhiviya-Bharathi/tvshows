<template>
  <div class="details-container">
    <div
      class="details"
      v-if="showDetails"
      v-bind:style="{ 'background-image': 'url(' + showDetails?.image?.original + ')' }"
    >
      <div class="wrapper">
        <h1><a :href="showDetails.officialSite">{{ showDetails.name }}</a></h1>
        <div><h5>Language:</h5> {{ showDetails.language }}</div>
        <div><h5>Rating:</h5> {{ showDetails.rating?.average }}</div>
        <div><h5>Channel:</h5> {{ showDetails.network?.name }}</div>
        <div><h5>Country:</h5> {{ showDetails.network?.country?.name }}</div>
        <div><h5>Status:</h5> {{ showDetails.status }}</div>
        <div><h5>Genre:</h5> <ul><li v-for="genre in showDetails.genres" :key="genre">{{ genre }}</li></ul></div>
        <div v-html="showDetails.summary"></div>
      </div>
    </div>
    <div v-else>
      <div class="message">No details available for this show.</div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    showDetails() {
      const id = this.$route.params.id
      console.log(id)
      const details = this.$store.getters.showDetails(id)
      console.log(details)
      return details.length ? details[0] : this.$store.getters.filteredShowDetails(id)[0]
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/global.scss';
.details-container {
  width: 100%;
  margin: auto;
  height: 100vh;
  color: #222;

  .details {
    height: 100%;
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    margin: auto;
    display: flex;
    justify-content: center;
    align-items: baseline;

    .wrapper {
      background-color: $white;
      opacity: 0.8;
      width: 80%;
      padding: 2rem;
      margin-top: 2rem;

      h1 {
        font-size: 2em;
        margin-bottom: 10px;
        text-decoration: underline;
      }

      img {
        max-width: 100%;
        height: auto;
        margin-top: 10px;
      }

      div {
        margin-bottom: 10px;

        h5 {
          display: inline-block;
        }
      }
    }
  }
}
</style>
