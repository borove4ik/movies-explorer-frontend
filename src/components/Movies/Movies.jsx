import React, {useEffect, useState} from "react";
import './Movies.css'
import useMovies from "../../hooks/useMovies";
import AuthRoute from "../AuthRoute/AuthRoute";
import Footer from "../Footer/Footer"
import Header from "../Header/Header";
import LoadMoreButton from "./LoadMoreButton/LoadMoreButton";
import MoviesCardList from "./MoviesCardList/MoviesCardList";
import SearchForm from "./SearchForm/SearchForm";
import {useLocation} from 'react-router-dom';
import { useFiltersContext } from "../App/App";
import CardConfig from "../../utils/CardConfig"


const Movies = ({allMovies, savedMovies,isLoading}) => {
  const location = useLocation();
  const locationType = location.pathname === '/movies' ? 'movies' : 'saved-movies';

  const { filters, getDataError } = useFiltersContext();
  const { moviesRenderRule, handleShowMore, resetMovies } = useMovies();
  const [errorMessage, setErrorMessage] = React.useState('');
  const [searchTouched, setSearchTouched] = React.useState(false);

  const { checked, searchValue } = filters[locationType];

  const filteredAllMovies = allMovies.filter(movie => {
    const searchResult = (movie.nameRU + movie.nameEN).toLowerCase().trim().includes(searchValue.toLowerCase().trim())
    if (checked) {
      return movie.duration <= CardConfig.shortMovieLength && searchResult;
    }

    return searchResult;
  })

  const wrongSearch = !isLoading && searchValue.length > 0 && filteredAllMovies.length === 0;
  const emptySearch = !isLoading && searchValue.length === 0 && searchTouched;

  const loadButtonCondition = (filteredAllMovies.length > 0 ? filteredAllMovies.length : allMovies.length) > moviesRenderRule.cardsTotal && searchValue.length > 0 && !wrongSearch && !emptySearch;

  React.useEffect(() => {
    if (wrongSearch) {
      setErrorMessage('Ничего не найдено')
    } 
    if (emptySearch) {
      setErrorMessage('Поле обязательно для заполнения')
    }
    if (getDataError.length !== 0) {
      setErrorMessage(getDataError)
    }
  }, [wrongSearch, emptySearch, getDataError]);

  React.useEffect(() => {
    resetMovies()
  }, [searchValue]);

  const moviesToRender = !isLoading && searchValue.length === 0 && !searchTouched ? [] : (filteredAllMovies).slice(0, moviesRenderRule.cardsTotal)

    return (
      <AuthRoute>
        <Header/>
        <main className="movies">
          <SearchForm setErrorMessage={setErrorMessage} setSearchTouched={setSearchTouched} />
          <MoviesCardList isLoading={isLoading} errorMessage={errorMessage} moviesToRender={moviesToRender} savedMovies={savedMovies} />
          {loadButtonCondition && <LoadMoreButton loadMore={handleShowMore}/>}
        </main>
        <Footer/>
      </AuthRoute>
    )
}

export default Movies