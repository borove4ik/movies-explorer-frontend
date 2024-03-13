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
                            isDataLoaded,
                            savedMovies,
                            foundMovies,
                            setSavedMovies,
                            setFoundMovies
                        }) => {
    const location = useLocation();


    if (errorMessage !== '') {
        return <h2 className="error-message">{errorMessage}</h2>;
    } else {
        return (
          <>
            {isLoading ? (
              <Preloader/>
                ) : (
                  <section className="list">
                    {
                            moviesToRender.map((movie, index) => {
                                return (
                                  <MoviesCard
                                    savedMovies={savedMovies}
                                    setSavedMovies={setSavedMovies}
                                    isDataLoaded={isDataLoaded}
                                    setFoundMovies={setFoundMovies}
                                    foundMovies={foundMovies}
                                    movie={movie}
                                    imageLink={location.pathname === '/movies' ? `${BaseUrls.imageLink}${movie.image.url}` : movie.image}
                                    title={movie.nameRU}
                                    duration={movie.duration}
                                    altText={movie.name}
                                    key={`${movie.id}_${index}`}/>)
                            })}
                  </section>
                )
                }
          </>
        )
    }

}

export default MoviesCardList