import { createStore } from 'vuex';
import { fetchShows, searchShows } from '../api/apiService';

export default createStore({
  state: {
    shows: null,
    genres: null,
    filteredShows: null,
    loading: false
  },
  mutations: {
    setShows(state, data) {
      state.shows = data;
    },
    setFilteredShows(state, data) {
      state.filteredShows = data;
    },
    setGenres(state, data) {
      state.genres = data;
    },
    setLoading(state, data) {
      state.loading = data;
    }
  },
  actions: {
    async fetchAllShows({ commit }) {
      try {
        // Fetch shows from the API
        const response = await fetchShows();

        // Sort shows by rating.average in descending order
        const sortedShows = response.data.sort((a, b) => b.rating.average - a.rating.average);

        // Extract unique genres from sorted shows
        const uniqueGenres = [...new Set(sortedShows.reduce((accumulator, currentObject) => {
          return accumulator.concat(currentObject.genres);
        }, []))].sort();

        // Commit sorted shows and unique genres to the state
        commit('setShows', sortedShows);
        commit('setGenres', uniqueGenres);
      } catch (error) {
        // Log and rethrow any API errors
        console.error('API Error:', error);
        throw error;
      }
    },
    async getShowsByQuery({ commit }, { searchQuery }) {
      try {
        // Search shows from the API
        const response = await searchShows(searchQuery);

        commit('setFilteredShows', response.data.map((show) => show.show));
      } catch (error) {
        // Log and rethrow any API errors
        console.error('API Error:', error);
        throw error;
      }
    },
  },
  getters: {
    // Get all shows
    shows: (state) => state.shows,
    // Get all genres
    genres: (state) => state.genres,
    // Get shows filtered by genre
    showsByGenre: (state) => (genre) => state.shows.filter(show => show.genres.includes(genre)),
    // Get details for a specific show by ID
    showDetails: (state) => (id) => state.shows.filter(show => show.id == id),

    filteredShows: (state) => state.filteredShows,
    filteredShowDetails: (state) => (id) => state.filteredShows.filter(show => show.id == id),
    loading: (state) => state.loading
  },
});
