import React from "react";
import './MoviesCard.css';
import likeButton from "../../../images/like.svg"
import deleteButton from "../../../images/delete_movie.svg"
import likedIcon from "../../../images/like-active.svg"
import mainApi from "../../../utils/MainApi";
import baseUrls from "../../../utils/urls";
import {useLocation} from "react-router-dom";


const MoviesCard = ({movie, imageLink, title, duration, saved, savedMovies, setSavedMovies, altText, getData}) => {
    const [isCardSaved, setIsCardSaved] = React.useState((savedMovies.some(item => item.movieId === movie.id)) || movie.owner)
    const location = useLocation()
    const [buttonIcon, setButtonIcon] = React.useState(likeButton)
    const [savedCardLongId, setSavedCardLongId] = React.useState('');
    const [loading, setLoading] = React.useState(false);

    React.useEffect(() => {
        if (isCardSaved && location.pathname === '/movies') {
            setButtonIcon(likedIcon)
        } else if (isCardSaved && location.pathname === '/saved-movies') {
            setButtonIcon(deleteButton)
        } else {
            setButtonIcon(likeButton)
        }
    })

    React.useEffect(() => {
        console.log(location.pathname)
        if (location.pathname === '/movies' && isCardSaved && savedMovies && savedMovies.length > 0) {

            const savedMovie = savedMovies.find((item) => {
                return item.movieId === movie.id
            })
            if (savedMovie) {
                setSavedCardLongId(savedMovie._id)
            }
        }
    }, [savedMovies])

    const saveMovie = async (e) => {
        e.preventDefault();

        if (loading) {
            return;
        }

        setLoading(true);

        try {
            const isSaved = savedMovies.some((savedMovie) => savedMovie.movieId === movie.id);

            if (!isSaved) {
                await mainApi.createMovie(
                    movie.country,
                    movie.director,
                    movie.duration,
                    movie.year,
                    movie.description,
                    `${baseUrls.imageLink}${movie.image.url}`,
                    movie.trailerLink,
                    movie.nameRU,
                    movie.nameEN,
                    `${baseUrls.imageLink}${movie.image.formats.thumbnail.url}`,
                    movie.id
                );
                const savedMoviesList = [...savedMovies, movie];
                setSavedMovies(savedMoviesList);
                localStorage.setItem('savedMovies', JSON.stringify(savedMoviesList));
                getData()
                setIsCardSaved(true)
            }
        } catch (err) {
            console.log(`Ошибка сохранения фильма: ${err}`);
        } finally {
            setLoading(false);
        }
    }

    const deleteMovie = async (e) => {
        e.preventDefault()

        if (loading) {
            return;
        }

        setLoading(true);
        try {
            if (savedCardLongId) {
                await mainApi.deleteMovie(savedCardLongId);
                const filtredSavedMovies = savedMovies.filter((savedMovie) => savedMovie.id !== savedCardLongId);
                localStorage.setItem('savedMovies', JSON.stringify(filtredSavedMovies));
                setSavedMovies(filtredSavedMovies);
                getData()
                setIsCardSaved(false)
            }
        } catch (err) {
            console.log(`Ошибка удаления фильма: ${err}`);
        } finally {
            setLoading(false);
        }
    }

    const linkClickHandler = (e) => {
        if (e.target.classList.contains('card__button') || e.target.classList.contains('card__button-icon')) {
            e.preventDefault()
        }
    }

    return (
      <div className="card">
        <a className="card__link" href={movie.trailerLink} onClick={linkClickHandler}>
          <img src={imageLink} alt={altText} className="card__image"/>
          <div className="card__info">
            <h2 className="card__title">{title}</h2>
            <button className="card__button" onClick={isCardSaved ? deleteMovie : saveMovie}
                    >
              <img src={buttonIcon} alt="лайк" className="card__button-icon"/>
            </button>
            <p className="card__duration">{duration}</p>
          </div>
        </a>

      </div>
    )
}

export default MoviesCard