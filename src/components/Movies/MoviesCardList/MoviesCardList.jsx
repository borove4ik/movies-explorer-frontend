import React from "react";
import './MoviesCardList.css'
import {useLocation} from "react-router-dom";
import BaseUrls from "../../../utils/urls";

import MoviesCard from "../MoviesCard/MoviesCard";
import Preloader from "../Preloader/Preloader";


const MoviesCardList = ({
                            moviesToRender,
                            isLoading,
                            errorMessage,
                            savedMovies,
                        }) => {
    const location = useLocation();

    if (errorMessage !== '') {
      return <h2 className="error-message">{errorMessage}</h2>;
    } 

    return (
      <>
        {isLoading ? (
          <Preloader/>
            ) : (
              <section className="list">
                {
                        moviesToRender.map((movie, index) => {
                          const isLiked = savedMovies.some(saved => saved.movieId === movie.id)
                         
                            return (
                              <MoviesCard
                                savedMovies={savedMovies}
                                movie={movie}
                                isLiked={isLiked}
                                key={`${movie.id}_${index}`}
                              />)
                        })}
              </section>
            )
            }
      </>
    )

}

export default MoviesCardList