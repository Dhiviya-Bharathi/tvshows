import { createStore } from 'vuex';
import { fetchShows, searchShows } from '../api/apiService';

export default createStore({
  state: {
    shows: null,            // Holds all shows fetched from the API
    genres: null,           // Holds unique genres extracted from shows
    filteredShows: null,    // Holds shows filtered based on search query
    loading: false          // Indicates whether data is being loaded
  },
  mutations: {
    // Set the shows state with the fetched data
    setShows(state, data) {
      state.shows = data;
    },
    // Set the filteredShows state with the data based on search query
    setFilteredShows(state, data) {
      state.filteredShows = data;
    },
    // Set the genres state with unique genres extracted from shows
    setGenres(state, data) {
      state.genres = data;
    },
    // Set the loading state
    setLoading(state, data) {
      state.loading = data;
    }
  },
  actions: {
    async fetchAllShows({ commit }) {
      try {
        // Log: Fetch shows from the API
        console.log('Fetching all shows...');

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

        // Log: Shows fetched successfully
        console.log('Shows fetched successfully.');
      } catch (error) {
        // Log and rethrow any API errors
        console.error('API Error:', error);
        throw error;
      }
    },
    async getShowsByQuery({ commit }, { searchQuery }) {
      try {
        // Log: Search shows from the API
        console.log(`Searching shows for query: ${searchQuery}`);

        // Search shows from the API
        const response = await searchShows(searchQuery);

        // Set filteredShows state with the data based on search query
        commit('setFilteredShows', response.data.map((show) => show.show));

        // Log: Shows searched successfully
        console.log('Shows searched successfully.');
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

    // Get filtered shows
    filteredShows: (state) => state.filteredShows,
    // Get details for a specific filtered show by ID
    filteredShowDetails: (state) => (id) => state.filteredShows.filter(show => show.id == id),
    // Get loading state
    loading: (state) => state.loading
  },
});
