import React from "react";
import './SearchForm.css';
import searchIcon from "../../../images/search.svg"
import { useLocation } from "react-router-dom";
import moviesApi from "../../../utils/MoviesApi";
import cardConfig from "../../../utils/cardConfig"
import mainApi from "../../../utils/MainApi";

const SearchForm = ({ setMovies, setIsLoading, setErrorMessage }) => {
  const [checked, setChecked] = React.useState(false)
  const location = useLocation()
  const ref = React.useRef();

  const handleSearchAllMovies = async (e) => {
    e.preventDefault()
    if (ref.current.value) {
      const SearchQuery = ref.current.value
      setErrorMessage('');
      setIsLoading(true)
      try {
        if (!localStorage.getItem('allMovies')) {
          const allMovies = await moviesApi.getMovies();
          localStorage.setItem('allMovies', JSON.stringify(allMovies));
        }
        const toggleState = checked
        localStorage.setItem('toggleState', toggleState)
        const searchQuerryModified = SearchQuery.toLowerCase().trim()
        localStorage.setItem('SearchQuery', searchQuerryModified)
        const foundMovies = JSON.parse(localStorage.getItem('allMovies')).filter(
          (movie) => {
            const movieNameQuery = (movie.nameRU + movie.nameEN).toLowerCase().trim()
            return (
              movieNameQuery.includes(searchQuerryModified)
            )
          }
        )
        if (foundMovies.length === 0) {
          setErrorMessage('Ничего не найдено')
          setIsLoading(false)

        }
        localStorage.setItem('foundMovies', foundMovies)


        if (toggleState) {
          const resultMovies = foundMovies.filter((movie) => {
            return movie.duration <= cardConfig.shortMovieLength
          })

          if (resultMovies.length === 0) {
            setErrorMessage('Ничего не найдено')
            setIsLoading(false)

          }
          setMovies(resultMovies)
          setIsLoading(false)
          return;
        }
        setMovies(foundMovies)
        setIsLoading(false)

      } catch (err) {
        setErrorMessage('Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз')
        console.log(err)
      }

    } else {
      setErrorMessage('Поле должно быть заполнено')
    }
  }

  const handleSearchSavedMovies = async (e) => {
    e.preventDefault()
    if (ref.current.value) {
      const SearchQuery = ref.current.value
      setErrorMessage('');
      setIsLoading(true)
      try {
        if (!localStorage.getItem('savedMovies')) {
          const savedMovies = await mainApi.getMovies();
          localStorage.setItem('savedMovies', JSON.stringify(savedMovies));
        }
        const toggleState = checked
        localStorage.setItem('toggleState', toggleState)
        const searchQuerryModified = SearchQuery.toLowerCase().trim()
        localStorage.setItem('SearchQueryOnSaved', searchQuerryModified)
        const foundSavedMovies = JSON.parse(localStorage.getItem('savedMovies')).filter(
          (movie) => {
            const movieNameQuery = (movie.nameRU + movie.nameEN).toLowerCase().trim()
            return (
              movieNameQuery.includes(searchQuerryModified)
            )
          }
        )
        if (foundSavedMovies.length === 0) {
          setErrorMessage('Ничего не найдено')
          setIsLoading(false)
        }
        localStorage.setItem('foundMovies', foundSavedMovies)


        if (toggleState) {
          const resultSavedMovies = foundSavedMovies.filter((movie) => {
            return movie.duration <= cardConfig.shortMovieLength
          })

          if (resultSavedMovies.length === 0) {
            setErrorMessage('Ничего не найдено')
            setIsLoading(false)

          }
          setMovies(resultSavedMovies)
          setIsLoading(false)
          return;
        }
        setMovies(foundSavedMovies)
        setIsLoading(false)

      } catch (err) {
        setErrorMessage('Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз')
        console.log(err)
      }

    } else {
      setErrorMessage('Поле должно быть заполнено')
    }
    
  }

  return (
    <search className="search">
      <form action="" onSubmit={location.pathname === '/movies' ? handleSearchAllMovies : handleSearchSavedMovies} className="search__form">
        <div className="search__input-wrapper">
          <input ref={ref} type="search" className="search__input" placeholder="Фильм" />
          <button className="search__button" type="submit">
            <img src={searchIcon} alt="" className="search__icon" />
          </button>
        </div>
        <div className="search__filter">
          <label className="search__switch">
            <input type="checkbox" name="Короткометражки" id="filter" className="search__checkbox" checked={checked} onChange={() => { setChecked(!checked) }} />
            <span className="search__slider"></span>
          </label>
          <p className="search__filter-text">Короткометражки</p>
        </div>

      </form>
    </search>
  )
}

export default SearchForm