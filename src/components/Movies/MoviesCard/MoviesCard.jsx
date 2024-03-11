import React, {useEffect, useState} from "react";
import './MoviesCard.css';
import {useLocation} from "react-router-dom";
import deleteButton from "../../../images/delete_movie.svg"
import likedIcon from "../../../images/like-active.svg"
import likeButton from "../../../images/like.svg"
import getMovieTime from "../../../utils/getMovieTime";
import mainApi from "../../../utils/MainApi";
import BaseUrls from "../../../utils/urls";


const MoviesCard = ({
                        movie,
                        imageLink,
                        title,
                        savedMovies,
                        setSavedMovies,
                        setFoundMovies,
                        foundMovies,
                        altText,
                        isDataLoaded = false
                    }) => {
    const [isCardSaved, setIsCardSaved] = useState((savedMovies.some(item => item.movieId === movie.id)) || movie.owner)
    const location = useLocation();
    const isMoviesView = location.pathname === '/movies';
    const [buttonIcon, setButtonIcon] = useState(likeButton);

    useEffect(() => {
        if (!isDataLoaded
            && isMoviesView
            && savedMovies && savedMovies.length > 0
            && savedMovies.some(savedMovie => savedMovie.movieId === movie.id)) {
            setIsCardSaved(true);
        }
    }, [isDataLoaded, savedMovies]);

    useEffect(() => {
        if (isCardSaved && location.pathname === '/movies') {
            setButtonIcon(likedIcon)
        } else if (location.pathname.includes('/saved-movies')) {
            setButtonIcon(deleteButton)
        } else {
            setButtonIcon(likeButton)
        }
    }, [isCardSaved])

    const saveMovie = async (e) => {
        e.preventDefault();

        try {
            const isSaved = savedMovies.some((savedMovie) => savedMovie.movieId === movie.id);

            if (!isSaved) {
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

                const foundMovies = [...savedMovies, createdMovie];

                setSavedMovies(foundMovies);
                localStorage.setItem('savedMovies', JSON.stringify(foundMovies));
                setIsCardSaved(true);
            }
        } catch (err) {
            console.log(`Ошибка сохранения фильма: ${err}`);
        }
    }


    const deleteMovie = async (e) => {
        e.preventDefault()

        const localSaved = localStorage.getItem('savedMovies') ? JSON.parse(localStorage.getItem('savedMovies')) : [];
        const saved = savedMovies.length > 0 ? savedMovies : localSaved;

        const savedMovie = saved.find(savedMovie => {
            const id = location.pathname.includes('/saved-movies') ? movie.movieId : movie.id;
            return savedMovie.movieId === id
        });

        try {
            if (savedMovie && savedMovie._id) {
                await mainApi.deleteMovie(savedMovie._id);
                const filteredMovies = saved.filter(item => item._id !== savedMovie._id);
                const filteredFoundMovies = foundMovies.filter(item => item._id !== savedMovie._id);

                setFoundMovies(filteredFoundMovies);
                setSavedMovies(filteredMovies);
                localStorage.setItem('savedMovies', JSON.stringify(filteredMovies));
                localStorage.setItem(isMoviesView ? 'allMoviesFound' : 'savedMoviesFound', JSON.stringify(filteredFoundMovies));

                setIsCardSaved(false);
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
        <a className="card__link" href={movie.trailerLink} onClick={linkClickHandler}>
          <img src={imageLink} alt={altText} className="card__image"/>
          <div className="card__info">
            <h2 className="card__title">{title}</h2>
            <button className="card__button" onClick={(e) => {
                        if (isCardSaved || location.pathname.includes('/saved-movies')) {
                            deleteMovie(e);
                        } else {
                            saveMovie(e)
                        }
                    }}
                    >
              <img src={buttonIcon} alt="лайк" className="card__button-icon"/>
            </button>
            <p className="card__duration">{getMovieTime(movie.duration)}</p>
          </div>
        </a>

      </div>
    )
}

export default MoviesCard