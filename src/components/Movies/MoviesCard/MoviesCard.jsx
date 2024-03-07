import React from "react";
import './MoviesCard.css';
import likeButton from "../../../images/like.svg"
import deleteButton from "../../../images/delete_movie.svg"
import likedIcon from "../../../images/like-active.svg"
import mainApi from "../../../utils/MainApi";
import baseUrls from "../../../utils/urls";
import { useLocation } from "react-router-dom";


const MoviesCard = ({ movie, imageLink, title, duration, saved, savedMovies, setSavedMovies, altText, getData }) => {
  const [isCardSaved, setIsCardSaved] = React.useState((savedMovies.some(item => item.movieId === movie.id)) || movie.owner)
  const location = useLocation()
  const [buttonIcon, setButtonIcon] = React.useState(likeButton)
  const [savedCardLongId, setSavedCardLongId] = React.useState('')
  React.useEffect(() => {
    if (isCardSaved && location.pathname === '/movies') {
      setButtonIcon(likedIcon)
    }
    else if (isCardSaved && location.pathname === '/saved-movies') {
      setButtonIcon(deleteButton)
    } else {
      setButtonIcon(likeButton)
    }
  })

  React.useEffect(() => {
    if (location.pathname === './movies') {
      if (isCardSaved) {
        const savedMovie = savedMovies.find((item) => {
          return item.movieId === movie.id
        })
        setSavedCardLongId(savedMovie._id)
      }
    } else {
      setSavedCardLongId(movie._id)
    }
  }, [savedMovies])

  const saveMovie = async (e) => {
    e.preventDefault()
    try {
      const isSaved = savedMovies.some((savedMovie) => savedMovie.movieId === movie.id);
      if (!isSaved) {
        const savedMovie = await mainApi.createMovie(
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
        // setSavedMovies(savedMoviesList);
        localStorage.setItem('savedMovies', JSON.stringify(savedMoviesList));
        getData()
        setIsCardSaved(true)
      }
    } catch (err) {
      console.log(`Ошибка сохранения фильма: ${err}`);
    }
  }

  const deleteMovie = async (e) => {
    e.preventDefault()
    try {

      await mainApi.deleteMovie(savedCardLongId);

      const filtredSavedMovies = savedMovies.filter((savedMovie) => savedMovie.id !== movie.id);
      localStorage.setItem('savedMovies', JSON.stringify(filtredSavedMovies));
      setSavedMovies(filtredSavedMovies);
      getData()
      setIsCardSaved(false)
    } catch (err) {
      console.log(`Ошибка удаления фильма: ${err}`);
    }
  }

  return (
    <div className="card">
      <img src={imageLink} alt={altText} className="card__image" />
      <div className="card__info">
        <h2 className="card__title">{title}</h2>
        <button className="card__button" onClick={isCardSaved ? deleteMovie : saveMovie}
        >
          <img src={buttonIcon} alt="лайк" className="card__button-icon" />
        </button>
        <p className="card__duration">{duration}</p>
      </div>
    </div>
  )
}

export default MoviesCard