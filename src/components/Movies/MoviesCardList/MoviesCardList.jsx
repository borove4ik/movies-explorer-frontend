import React from "react";
import './MoviesCardList.css'

import MoviesCard from "../MoviesCard/MoviesCard";
import Preloader from "../Preloader/Preloader";

const MoviesCardList = ({moviesToRender, isLoading}) => {
    return (
      <>
        {isLoading ? (
          <Preloader />
        ) : (
          <section className="list">
            {
             moviesToRender.map((movie) => {
              return (<MoviesCard isCardliked={true} isCardSaved={false} imageLink={movie.imageLink} title={movie.title} duration={movie.duration} altText={movie.name} key= {movie.id}/>)
          })}
          </section>      
        )
      } 
      </>
    )
}

export default MoviesCardList