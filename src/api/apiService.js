import api from './api';

export const fetchShows = () => {
  return api.get('/shows');
};
export const searchShows = (searchQuery) => {
  return api.get('/search/shows?q='+searchQuery);
};
