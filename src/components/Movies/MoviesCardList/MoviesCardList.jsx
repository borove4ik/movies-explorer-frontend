import React from "react";
import './MoviesCardList.css'

import MoviesCard from "../MoviesCard/MoviesCard";

const MoviesCardList = ({moviesToRender}) => {
    return (
      <section className="list">
        {moviesToRender.map((movie)=>{
            return (<MoviesCard isCardliked={true} isCardSaved={false} imageLink={movie.imageLink} title={movie.title} duration={movie.duration} altText={movie.name} key= {movie.id}/>)
        })}
      </section>
    )
}

export default MoviesCardList