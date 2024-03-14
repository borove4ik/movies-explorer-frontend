import React from "react";
import './SavedMovies.css'
import CardConfig from "../../utils/CardConfig";
import AuthRoute from "../AuthRoute/AuthRoute";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import MoviesCardList from "../Movies/MoviesCardList/MoviesCardList";
import SearchForm from "../Movies/SearchForm/SearchForm";
import { useLocation } from 'react-router-dom';
import { useFiltersContext } from "../App/App";


const SavedMovies = ({savedMovies, isLoading}) => {
  const location = useLocation();
  const locationType = location.pathname === '/movies' ? 'movies' : 'saved-movies';

  const { filters, getDataError } = useFiltersContext();
  const [errorMessage, setErrorMessage] = React.useState('');
  const [searchTouched, setSearchTouched] = React.useState(false);

  const { checked, searchValue } = filters[locationType];


  const filteredSavedMovies = savedMovies.filter(movie => {
    const searchResult = (movie.nameRU + movie.nameEN).toLowerCase().trim().includes(searchValue.toLowerCase().trim())
    if (checked) {
      return movie.duration <= CardConfig.shortMovieLength && searchResult;
    }

    return searchResult;
  })

  
  const wrongSearch = !isLoading && searchValue.length > 0 && filteredSavedMovies.length === 0;
  const emptySearch = !isLoading && searchValue.length === 0 && searchTouched;

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
  }, [wrongSearch, emptySearch]);

    return (
      <AuthRoute>
        <Header/>
        <main className="movies">
          <SearchForm setErrorMessage={setErrorMessage} setSearchTouched={setSearchTouched} />
          <MoviesCardList isLoading={isLoading} errorMessage={errorMessage} moviesToRender={filteredSavedMovies} savedMovies={savedMovies} />
        </main>
        <Footer/>
      </AuthRoute>)
}

export default SavedMovies

