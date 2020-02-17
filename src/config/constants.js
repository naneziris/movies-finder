export const API_KEY = 'bc50218d91157b1ba4f142ef7baaa6a0';
export const MOVIES_IN_THEATER_URL = `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1`;
export const MOVIES_SEARCH_URL = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&page=1&include_adult=false`;
export const MOVIES_GENRES_URL = `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=en-US&page=1`;
export const IMAGE_PATH_BASE = 'https://image.tmdb.org/t/p/w500';