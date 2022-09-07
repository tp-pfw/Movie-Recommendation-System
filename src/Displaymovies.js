import React, {useEffect, useState} from 'react';
import axios from 'axios';
import MovieCard from './MovieCard';

//fetch corresponding movies based on a search value or most popular 
//By making API call to TMDB API
function Displaymovies() {

const API_URL = "https://api.themoviedb.org/3";
  const [movies, setMovies] = useState([]);
  const [searchKey, setSearchKey] = useState("");

  
  const fetchMovies = async(searchKey) => {
    const type = searchKey ? "search" : "discover" 
    const {data : {results}} = await axios.get(`${API_URL}/${type}/movie`, {
      params:
      {
        api_key: process.env.REACT_APP_MOVIE_API_KEY,
        query: searchKey
      }
    });
      setMovies(results)

  }

  useEffect ( () => {
    fetchMovies();
  }, [])

const searchMovies = (e) => {
  e.preventDefault();
  fetchMovies(searchKey);
}

  return (
        <div>
          <div className='header'>
            <div className='header-content max-center'>
              <form onSubmit={searchMovies}>
                 <div className='form-search'>
                <input type ='text' onChange={(e) => setSearchKey(e.target.value)}></input>
                <button type = 'submit'>Search</button>
                </div>
              </form>
            </div>
          </div>
          <div >
            <MovieCard movies={movies}
            />
          </div>
        </div>
      );
    }

export default Displaymovies;