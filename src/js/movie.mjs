const API_KEY = 'c3dfaa65435af1c4162ba879f28a4552';
const BASE_URL = 'https://api.themoviedb.org/3';

// Fetch popular movies
export async function fetchPopularMovies(page = 1) {
  try {
    const response = await fetch(`${BASE_URL}/discover/movie?include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=popularity.desc&api_key=${API_KEY}`);
    if (!response.ok) {
      throw new Error(`Error fetching movies: ${response.status}`);
    }
    const movieData = await response.json();
    return movieData;
  } catch (error) {
    console.error("API fetch error:", error);
    return null;
  }
}

// Fetch genres dynamically
export async function fetchGenres() {
  try {
    const response = await fetch(`${BASE_URL}/genre/movie/list?api_key=${API_KEY}&language=en-US`);
    if (!response.ok) {
      throw new Error(`Error fetching genres: ${response.status}`);
    }
    const genreData = await response.json();
    return genreData.genres; // Returns an array of genres
  } catch (error) {
    console.error("API fetch error:", error);
    return null;
  }
}
