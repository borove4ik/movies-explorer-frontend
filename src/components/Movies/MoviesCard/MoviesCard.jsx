import React from "react";
import './MoviesCard.css';
import likeButton from "../../../images/like.svg"
import deleteButton from "../../../images/delete_movie.svg"
import likedIcon from "../../../images/like-active.svg"
import mainApi from "../../../utils/MainApi";
import BaseUrls from "../../../utils/urls";
import {useLocation} from "react-router-dom";


const MoviesCard = ({movie, imageLink, title, savedMovies, setSavedMovies, altText}) => {
    const [isCardSaved, setIsCardSaved] = React.useState((savedMovies.some(item => item.movieId === movie.id)) || movie.owner)
    const location = useLocation()
    const [buttonIcon, setButtonIcon] = React.useState(likeButton)

    React.useEffect(() => {
        if (isCardSaved && location.pathname === '/movies') {
            setButtonIcon(likedIcon)
        } else if (location.pathname.includes( '/saved-movies')) {
            setButtonIcon(deleteButton)
        } else {
            setButtonIcon(likeButton)
        }
    }, [isCardSaved])

    const saveMovie = async (e) => {

        e.preventDefault()
        try {
            const isSaved = savedMovies.some((savedMovie) => savedMovie.movieId === movie.id);
            console.log('save', isSaved)

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


                setSavedMovies(prev => [...prev, createdMovie]);

                setIsCardSaved(true);
            }
        } catch (err) {
            console.log(`Ошибка сохранения фильма: ${err}`);
        }
    }


    const deleteMovie = async (e) => {
        e.preventDefault()
        
        const savedMovie = savedMovies.find((item) => {
          const id = location.pathname.includes('/saved-movies') ? movie.movieId : movie.id;
            return item.movieId === id
        })


        try {
            if (savedMovie && savedMovie._id) {
                await mainApi.deleteMovie(savedMovie._id);
    
                setSavedMovies(prev => prev.filter(item => item._id !== savedMovie._id));

                setIsCardSaved(false);
            }
        } catch (err) {
            console.log(`Ошибка удаления фильма: ${err}`);
        }
    }

    const linkClickHandler = (e) => {
        if (e.target.classList.contains('card__button') || e.target.classList.contains('card__button-icon')) {
            e.preventDefault()
        }
    }

    const getMovieTime = (mins) => {
        let hours = Math.trunc(mins/60);
        let minutes = mins % 60;
        if (hours < 1) {
            return minutes + 'м';
        } else {
            return hours + 'ч ' + minutes + 'м';
        }
    }

    return (
      <div className="card">
        <a className="card__link" href={movie.trailerLink} onClick={linkClickHandler}>
          <img src={imageLink} alt={altText} className="card__image"/>
          <div className="card__info">
            <h2 className="card__title">{title}</h2>
            <button className="card__button" onClick= { (e) => {
                if (isCardSaved || location.pathname.includes( '/saved-movies')) {
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