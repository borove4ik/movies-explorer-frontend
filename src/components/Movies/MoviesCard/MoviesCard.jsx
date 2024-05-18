import React, {useEffect, useState} from "react";
import './MoviesCard.css';
import {useLocation} from "react-router-dom";
import deleteButton from "../../../images/delete_movie.svg"
import likedIcon from "../../../images/like-active.svg"
import likeButton from "../../../images/like.svg"
import getMovieTime from "../../../utils/getMovieTime";
import mainApi from "../../../utils/MainApi";
import BaseUrls from "../../../utils/urls";
import { useFiltersContext } from "../../App/App";



const MoviesCard = ({
                        movie,
                        isLiked,
                        savedMovies
                    }) => {
   const location = useLocation()
   const { addMovieToSaved, removeMovieFromSaved } = useFiltersContext()

   const getIcon = () => {
    if (isLiked && location.pathname === '/movies') {
        return (likedIcon)
    } else if (location.pathname.includes('/saved-movies')) {
        return (deleteButton)
    } else {
        return (likeButton)
    }
   }

   const saveMovie = async (e) => {
    e.preventDefault();

    try {
        if (!isLiked) {
            const createdMovie = await mainApi.createMovie(
                movie.country,
                movie.director,
                movie.duration,
                movie.year,
                movie.description,
                `${BaseUrls.imageLink}${movie.image.url}`,
                movie.trailerLink,
                movie.nameRU,
                movie.nameEN,
                `${BaseUrls.imageLink}${movie.image.formats.thumbnail.url}`,
                movie.id
            );

            addMovieToSaved(createdMovie)
        }
    } catch (err) {
        console.log(`Ошибка сохранения фильма: ${err}`);
    }
}

    const deleteMovie = async (e) => {
        e.preventDefault()

        const savedMovie = savedMovies.find(savedMovie => {
            const id = location.pathname.includes('/saved-movies') ? movie.movieId : movie.id;
            return savedMovie.movieId === id
        });

        try {
            if (savedMovie && savedMovie._id) {
                await mainApi.deleteMovie(savedMovie._id);
                removeMovieFromSaved(savedMovie.movieId)
            }
        } catch (err) {
            console.log(`Ошибка удаления фильма: ${err}`);
        }
    }

    const linkClickHandler = (e) => {
        if (e.target.classList.contains('card__button') || e.target.classList.contains('card__button-icon')) {
            e.preventDefault();
        }
    }

    return (
      <div className="card">
        <a className="card__link" href={movie.trailerLink} onClick={linkClickHandler} target="_blank" rel="noreferrer">
          <img src={location.pathname === '/movies' ? `${BaseUrls.imageLink}${movie.image.url}` : movie.image} alt={movie.name} className="card__image"/>
          <div className="card__info">
            <h2 className="card__title">{movie.nameRU}</h2>
            <button className="card__button" onClick={(e) => {
                        if (isLiked || location.pathname.includes('/saved-movies')) {
                            deleteMovie(e);
                        } else {
                            saveMovie(e)
                        }
                    }}
                    >
              <img src={getIcon()} alt="лайк" className="card__button-icon"/>
            </button>
            <p className="card__duration">{getMovieTime(movie.duration)}</p>
          </div>
        </a>

      </div>
    )
}

export default MoviesCard
