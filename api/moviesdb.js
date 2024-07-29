import axios from "axios";
import { apikey } from "../src/constants";

const base = "https://api.themoviedb.org/3";
const topRated = `${base}/movie/top_rated?api_key=${apikey}`;
const upComing = `${base}/movie/upcoming?api_key=${apikey}`;
const Trending = `${base}/trending/movie/day?api_key=${apikey}`;
const searchMovies  = `${base}/search/movie?api_key=${apikey}`;

const movieDetails = (id) => `${base}/movie/${id}?api_key=${apikey}`;
const creditsDetails = (id) => `${base}/movie/${id}/credits?api_key=${apikey}`; //single line function
const similarMovies = (id) => `${base}/movie/${id}/similar?api_key=${apikey}`;
const personDetail = (id) => `${base}/person/${id}?api_key=${apikey}`;
const personMovies = (id) => `${base}/person/${id}/movie_credits?api_key=${apikey}`;
//    https://api.themoviedb.org/3/movie/movie_id
// 'https://api.themoviedb.org/3/search/movie?query=iron&include_adult=false&language=en-US&page=1' 
export const fallBackPersonImage =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnVzD4rGq42PnjKHt9BkhRdJdAa9ojZ1kByw&s";
const apicall = async (apiUrl, params) => {
  const options = {
    method: "GET",
    url: apiUrl,
    params: params ? params : {},
  };
  try {
    const response = await axios.request(options);
    // console.log(response.data.results);
    return response;
  } catch (error) {
    console.log("error", error);
    return {};
  }
};

export const fetchTrendingMovies = async () => {
  return await apicall(Trending);
};

export const fetchTopRatedMovies = async () => {
  return await apicall(topRated);
};

export const fetchUpComingMovies = async () => {
  return await apicall(upComing);
};

export const fetchMovieDetails = async (id) => {
  return await apicall(movieDetails(id));
};

export const fetchCreditsDetails = async (id) => {
  return await apicall(creditsDetails(id));
};

export const fetchSimilarMovies = async (id) => {
  return await apicall(similarMovies(id));
};

export const fetchPersonDetails = async (id) => {
  return await apicall(personDetail(id));
};

export const fetchPersonSimilarMovies = async (id) => {
  return await apicall(personMovies(id));
};

export const fetchSearhMovies= async(params) =>{

return  apicall(searchMovies,params)

}