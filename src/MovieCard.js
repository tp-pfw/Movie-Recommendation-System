import React, {useEffect, useState, useRef} from 'react';
import axios from 'axios';
import {Recommendations} from './Recommendations';
import AddFavourites from './AddFavourites';

// Fetch Movie details from the TMDB API and display on the screen, 
//if user clicks view Recommendations,
// send recommendations list to Recommendations.js to display recommended movies

const MovieCard = (props) => {
const IMAGE_PATH= " https://image.tmdb.org/t/p/w500"
const API_URL = "https://api.themoviedb.org/3/movie";
const [recommendations, setRecommendations] = useState([]);
const [showRecommendations, setShowRecommendations] = useState(false);
const [showMovies, setShowMovies] = useState(true);
const [showButton, setShowButton] = useState(false);
const modalRef = useRef();

const closeModal = (e) => {
  if (e.target === modalRef.current) {
    setShowMovies(true);
    setShowButton(false);
  }
}

const handleRecommendationsClick=async(id) =>
{
  console.log(id);
    const {data : {results}} = await axios.get(`${API_URL}/${id}/recommendations`, {
      params:
      {
        api_key: process.env.REACT_APP_MOVIE_API_KEY
      }
      });
      console.log(results);
      setRecommendations(results);
      console.log(showRecommendations);
      console.log(showMovies);
    }
   
    console.log(recommendations)
    const openModal = () => {
      setShowRecommendations(true);
      setShowMovies(false);
      setShowButton(true);
    };

    useEffect ( () => {
        handleRecommendationsClick();
      })

      

  return (
     <>
     <div className=''>
       {showRecommendations ? <Recommendations  recommender= {recommendations} setShowRecommendations={setShowRecommendations} /> : null}
    </div>
  <div div className='' >
  { showButton ?  
  <button className = 'display-button max-center' ref={modalRef} onClick={closeModal}> Display Movies </button> : null}
  {showMovies ?
  <div className='container max-center'>  
          {props.movies.map((movie,index) => (
          <div className={'moviecard'}>
            <div className ='image-container d-flex align-items-center m-3'>
           <img className ={'movie-cover'} 
           src = {`${IMAGE_PATH}${movie.poster_path}`} alt= '' 
            /> 
             <div classname ="recommend-button" onClick= {()=> {openModal(); handleRecommendationsClick(movie.id);}} >
                <div className='overlay align-items-center justify-content-center '>
                  <AddFavourites/>
                  </div>
                 </div> 
              </div>
              
              <h5 className='movie-title'>{movie.title}</h5>
                  </div>
                   ))}
          </div> : null}
          </div>    
       </>
        
        )}


export default MovieCard;