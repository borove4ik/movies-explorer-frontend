import React from "react";
import './MoviesCardList.css'

import MoviesCard from "../MoviesCard/MoviesCard";
import Preloader from "../Preloader/Preloader";
import { useLocation } from "react-router-dom";
import BaseUrls from "../../../utils/urls";


const MoviesCardList = ({ moviesToRender, isLoading, savedMovies, setSavedMovies, errorMessage }) => {

  const location = useLocation();

  if (errorMessage !== '') {
    return (
      <h2 className="error-message">{errorMessage}</h2>
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
                return (
                  <MoviesCard
                    savedMovies={savedMovies}
                    setSavedMovies={setSavedMovies}
                    movie={movie}
                    imageLink={location.pathname === '/movies' ? `${BaseUrls.imageLink}${movie.image.url}` : movie.image}
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