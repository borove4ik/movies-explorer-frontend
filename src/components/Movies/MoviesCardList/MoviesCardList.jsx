import React from "react";
import './MoviesCardList.css'

import MoviesCard from "../MoviesCard/MoviesCard";
import Preloader from "../Preloader/Preloader";
import { useLocation } from "react-router-dom";
import baseUrls from "../../../utils/urls";


const MoviesCardList = ({ moviesToRender, isLoading, savedMovies, setSavedMovies, errorMessage, getData }) => {

  const location = useLocation();

  if (errorMessage !== '') {
    return (
      <h2 className="error-mesge">{errorMessage}</h2>
    )
  } else {
    return (
      <>
        {isLoading ? (
          <Preloader />
        ) : (
          <section className="list">
            {
              moviesToRender.map((movie) => {
                return (<MoviesCard
                  savedMovies={savedMovies}
                  setSavedMovies={setSavedMovies}
                  movie={movie}
                  getData={getData}
                  imageLink={location.pathname === '/movies' ? `${baseUrls.imageLink}${movie.image.url}` : movie.image}
                  title={movie.nameRU}
                  duration={movie.duration}
                  altText={movie.name}
                  key={movie.id} />)
              })}
          </section>

        )
        }
      </>
    )
  }

}

export default MoviesCardList