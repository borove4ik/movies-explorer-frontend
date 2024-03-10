import React, { useEffect, useState } from "react";
import './SearchForm.css';
import searchIcon from "../../../images/search.svg"
import { useLocation } from "react-router-dom";
import moviesApi from "../../../utils/MoviesApi";
import cardConfig from "../../../utils/cardConfig"

const SearchForm = ({ setMovies, setIsLoading, setErrorMessage }) => {
  const location = useLocation();
  const moviesKey = location.pathname === '/movies' ? 'allMovies' : 'savedMovies';
  const isDefaultChecked = localStorage.getItem(moviesKey + 'ToggleState') ? localStorage.getItem(moviesKey + 'ToggleState') === 'true' : false;

  const defaultSearch = localStorage.getItem(moviesKey + 'SearchQuery') ? localStorage.getItem( moviesKey + 'SearchQuery')  : '';

  const [checked, setChecked] = React.useState(isDefaultChecked);
  const [search, setSearch] = useState(defaultSearch);

  const findShortFilms = (foundMovies) => {
    const resultMovies = foundMovies.filter((movie) => {
      return movie.duration <= cardConfig.shortMovieLength
    })

    if (resultMovies.length === 0) {
      setErrorMessage('Ничего не найдено')
      setIsLoading(false);
      return false;
    } else {
      setMovies(resultMovies);
      setIsLoading(false);
      return resultMovies;
    }
  }

  useEffect(() => {
    const foundMoviesFromLocal = localStorage.getItem(moviesKey + 'Found') ? JSON.parse(localStorage.getItem(moviesKey + 'Found'))  : null;

    if (foundMoviesFromLocal) {
      setMovies(foundMoviesFromLocal);
    }
  }, [])


  const handleSearchMovies = async (e = null, isChecked = checked) => {
    if (e) {
      e.preventDefault();
    }

    if (search.trim()) {
      setErrorMessage('');
      setIsLoading(true);

      try {
        if (!localStorage.getItem(moviesKey)) {
          const apiMovies = await moviesApi.getMovies();
          localStorage.setItem(moviesKey, JSON.stringify(apiMovies));
        }

        const foundMoviesLocal = JSON.parse(localStorage.getItem(moviesKey));
        const searchQuerryModified = search.toLowerCase();

        localStorage.setItem(moviesKey + 'SearchQuery', searchQuerryModified);

        const foundMovies = foundMoviesLocal.filter(
          (movie) => {
            const movieNameQuery = (movie.nameRU + movie.nameEN).toLowerCase().trim();

            return (
              movieNameQuery.includes(searchQuerryModified)
            )
          }
        )

        if (foundMovies.length === 0) {
          setErrorMessage('Ничего не найдено');
          setIsLoading(false);
          return;
        }


        if (isChecked && findShortFilms(foundMovies)) {
          localStorage.setItem(moviesKey + 'Found', JSON.stringify(findShortFilms(foundMovies)))
          return;
        }

        localStorage.setItem(moviesKey + 'Found', JSON.stringify(foundMovies))

        setMovies(foundMovies);
        setIsLoading(false);
      } catch (err) {
        setErrorMessage('Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз')
        console.log(err)
      }

    } else {
      setErrorMessage('Поле должно быть заполнено')
    }
  }

  const handleCheckboxChange = (e) => {
    const target = e.target;
    localStorage.setItem(moviesKey + 'ToggleState', target.checked);
    setChecked(target.checked);
    handleSearchMovies(null, target.checked);
  };

  const searchHandler = (e) => {
    setSearch(e.target.value);
  }
  
  return (
    <search className="search">
      <form action="" onSubmit={handleSearchMovies} className="search__form">
        <div className="search__input-wrapper">
          <input onChange={searchHandler} value={search} type="search" className="search__input" placeholder="Фильм"
           />
          <button className="search__button" type="submit">
            <img src={searchIcon} alt="" className="search__icon" />
          </button>
        </div>
        <div className="search__filter">
          <label className="search__switch">
            <input type="checkbox" name="Короткометражки" id="filter" className="search__checkbox" checked={checked} onChange={ (e) => {
handleCheckboxChange(e)
            }} />
            <span className="search__slider"></span>
          </label>
          <p className="search__filter-text">Короткометражки</p>
        </div>

      </form>
    </search>
  )
}

export default SearchForm