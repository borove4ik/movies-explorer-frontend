import React, { useEffect } from "react";
import './SavedMovies.css'
import Header from "../Header/Header";
import SearchForm from "../Movies/SearchForm/SearchForm";
import MoviesCardList from "../Movies/MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";
import movieImage from "../../images/movie.svg"
import mainApi from "../../utils/MainApi";

const SavedMovies = ({authorised, savedMovies, setSavedMovies, getData}) => {
  const [errorMessage, setErrorMessage] = React.useState('')
  const [isLoading, setIsLoading] = React.useState(false)
  

    return (
      <>
        <Header authorised={authorised}/>
        <SearchForm movies={savedMovies} setMovies={setSavedMovies} setErrorMessage={setErrorMessage} setIsLoading={setIsLoading}/>
        <MoviesCardList moviesToRender={savedMovies} errorMessage={errorMessage} isLoading={isLoading} savedMovies={savedMovies} setSavedMovies={setSavedMovies} getData={getData}/>
        <Footer />
      </>
    )
}

export default SavedMovies