export const TMDB_BASE = "https://api.themoviedb.org/3";
export const IMAGE_BASE = "https://image.tmdb.org/t/p/w500";

export const MEDIA_ENDPOINTS = {
  movie: {
    nowPlaying: `${TMDB_BASE}/movie/now_playing?page=1`,
    upcoming: `${TMDB_BASE}/movie/upcoming`,
    topRated: `${TMDB_BASE}/movie/top_rated`,
    bollywood: `${TMDB_BASE}/discover/movie?language=en-US&page=1&with_original_language=hi`,
    animation: `${TMDB_BASE}/discover/movie?language=en-US&page=1&with_genres=16`,
    search: `${TMDB_BASE}/search/movie`,
    videos: (movieId: number) => `${TMDB_BASE}/movie/${movieId}/videos`,
  },
  tv: {
    airToday: `${TMDB_BASE}/tv/airing_today?language=en-US&page=1`,
    popular: `${TMDB_BASE}/tv/popular?language=en-US&page=1`,
    topRated: `${TMDB_BASE}/tv/top_rated?language=en-US&page=1`,
    hindiShows: `${TMDB_BASE}/discover/tv?language=en-US&page=1&with_original_language=hi`,
    videos: (seriesId: number) => `${TMDB_BASE}/tv/${seriesId}/videos`,
  },
} as const;
