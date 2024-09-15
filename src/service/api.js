import axios from "axios";

axios.defaults.baseURL = "https://api.themoviedb.org/3/";

const options = {
  headers: {
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiOTNjZjY3ZmFhMmRlZjFjMDdiOWE5ZWE1MGQyNDcxMiIsIm5iZiI6MTcyNTg3MTg5Ni40NTYwNjgsInN1YiI6IjY2ZGQ1Yjc4MmU2NTIwNTAzZWZlMzkwMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.3gtnDZFcBiNc6rr3pxRfJzhWj0ZfKJ-t9gB1grhCT38",
  },
};

export const getMovies = async () => {
  const response = await axios.get(
    "/trending/movie/week?language=en-US",
    options
  );
  return response.data.results;
};

export const getMovieById = async (movieId) => {
  const response = await axios.get(`/movie/${movieId}`, options);
  return response.data;
};

export const getMovieCast = async (movieId) => {
  const response = await axios.get(`/movie/${movieId}/credits`, options);
  return response.data.cast;
};

export const getMovieReviews = async (movieId) => {
  const response = await axios.get(`/movie/${movieId}/reviews`, options);
  return response.data.results;
};

export const getMoviesByQuery = async (query) => {
  const response = await axios.get(`/search/movie?query=${query}`, options);
  return response.data;
};
