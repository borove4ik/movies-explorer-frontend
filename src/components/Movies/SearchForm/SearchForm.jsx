import React, {useEffect, useState} from "react";
import './SearchForm.css';
import {useLocation} from "react-router-dom";
import searchIcon from "../../../images/search.svg"
import CardConfig from "../../../utils/CardConfig"
import moviesApi from "../../../utils/MoviesApi";

const SearchForm = ({
                        setMovies,
                        setIsLoading,
                        setErrorMessage,
                        foundMovies,
                        setFoundMovies,
                        setSavedMovies,
                        savedMovies,
                        resetMovies
                    }) => {
    const location = useLocation();
    const isMoviesView = location.pathname === '/movies';
    const moviesKey = isMoviesView ? 'allMovies' : 'savedMovies';
    const isDefaultChecked = localStorage.getItem(moviesKey + 'ToggleState') ? localStorage.getItem(moviesKey + 'ToggleState') === 'true' : false;

    const defaultSearch = localStorage.getItem(moviesKey + 'SearchQuery') ? localStorage.getItem(moviesKey + 'SearchQuery') : '';

    const [checked, setChecked] = useState(isDefaultChecked);
    const [search, setSearch] = useState(defaultSearch);

    const findShortFilms = (foundMovies) => {
        const resultMovies = foundMovies.filter((movie) => {
            return movie.duration <= CardConfig.shortMovieLength
        })

        if (resultMovies.length === 0) {
            setErrorMessage('Ничего не найдено')
            setIsLoading(false);
            return false;
        } else {
            if (location.pathname === '/saved-movies')  {
                localStorage.setItem(moviesKey + 'Found', JSON.stringify(resultMovies));

                setSavedMovies(resultMovies);
            } else {
                setMovies(resultMovies);
            }
            setIsLoading(false);
            return resultMovies;
        }
    }

    const handleSearchMovies = async (e = null, isChecked = checked) => {
        if (e) {
            e.preventDefault();
        }

        const searchValue = search.trim();
        resetMovies?.()

        if (!localStorage.getItem(moviesKey)) {
            try {
                const apiMovies = await moviesApi.getMovies();
                localStorage.setItem(moviesKey, JSON.stringify(apiMovies));
            } catch (error) {
                setErrorMessage('Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз')
                console.log(error)
                return;
            }
        }

        const foundMoviesLocal = JSON.parse(localStorage.getItem(moviesKey));

        setErrorMessage('');
        setIsLoading(true);

        if (searchValue) {
            const searchQueryModified = search.toLowerCase();
            const foundMoviesFromSearch = foundMoviesLocal.filter(movie => {
                    return (movie.nameRU + movie.nameEN)
                        .toLowerCase()
                        .trim()
                        .includes(searchQueryModified);
                }
            )

            if (foundMoviesFromSearch.length === 0) {
                setErrorMessage('Ничего не найдено');
                setFoundMovies([]);
                setIsLoading(false);
                return;
            }

            

            if (isChecked && findShortFilms(foundMoviesFromSearch)) {
                localStorage.setItem(moviesKey + 'Found', JSON.stringify(findShortFilms(foundMoviesFromSearch)));

                setFoundMovies(findShortFilms(foundMoviesFromSearch));
                return;
            }

            localStorage.setItem(moviesKey + 'Found', JSON.stringify(foundMoviesFromSearch));


            if (location.pathname === '/saved-movies')  {
                setSavedMovies(foundMovies);
            } else {
                setMovies(foundMovies);
            }
            setFoundMovies(foundMoviesFromSearch);
            setIsLoading(false);
            return;
        } else {
            setFoundMovies([]);
            localStorage.setItem(moviesKey + 'Found', JSON.stringify([]))

            if (isChecked && !isMoviesView && findShortFilms(savedMovies)) {

                setFoundMovies(findShortFilms(savedMovies));
                return;
            }

            if (location.pathname === '/saved-movies') {
                const savedMovies = localStorage.getItem('savedMovies') ? JSON.parse(localStorage.getItem('savedMovies')) : []
                setSavedMovies(savedMovies);
                setIsLoading(false);
                return;
            }
        }

        setIsLoading(false);
        setErrorMessage('Поле должно быть заполнено')
    }

    const handleCheckboxChange = (e) => {
        const target = e.target;
        localStorage.setItem(moviesKey + 'ToggleState', target.checked);
        setChecked(target.checked);
        handleSearchMovies(null, target.checked);
    };

    const searchHandler = (e) => {
        setSearch(e.target.value);
        localStorage.setItem(moviesKey + 'SearchQuery', e.target.value);
    }

    useEffect(() => {
        if (checked && location.pathname === '/saved-movies') {
            if (findShortFilms(savedMovies)) {
                setFoundMovies(findShortFilms(savedMovies));
            }
        }
    }, []);

    return (
      <search className="search">
        <form action="" onSubmit={handleSearchMovies} className="search__form">
          <div className="search__input-wrapper">
            <input onChange={searchHandler} value={search} type="search" className="search__input"
              placeholder="Фильм"
                    />
            <button className="search__button" type="submit">
              <img src={searchIcon} alt="" className="search__icon"/>
            </button>
          </div>
          <div className="search__filter">
            <label className="search__switch">
              <input type="checkbox" name="Короткометражки" id="filter" className="search__checkbox"
                checked={checked} onChange={(e) => {
                            handleCheckboxChange(e)
                        }}/>
              <span className="search__slider"></span>
            </label>
            <p className="search__filter-text">Короткометражки</p>
          </div>

        </form>
      </search>
    )
}

export default SearchForm