import React, {useEffect, useState} from "react";
import './SavedMovies.css'
import useRenderRule from "../../hooks/useRenderRule";
import CardConfig from "../../utils/CardConfig";
import AuthRoute from "../AuthRoute/AuthRoute";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import MoviesCardList from "../Movies/MoviesCardList/MoviesCardList";
import SearchForm from "../Movies/SearchForm/SearchForm";
import { useLocation } from 'react-router-dom';

const SavedMovies = ({savedMovies, setSavedMovies}) => {
    const location = useLocation();
    const isMoviesView = location.pathname === '/movies';
    const moviesKey = 'savedMovies';


    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [foundMovies, setFoundMovies] = useState(savedMovies);

    React.useEffect(() => {
        if (JSON.parse(localStorage.getItem(moviesKey + 'Found')).length > 0) {
            const localFoundMovies = JSON.parse(localStorage.getItem(moviesKey + 'Found') || '');
            setFoundMovies(localFoundMovies)

        } else {
            setFoundMovies(savedMovies)
        }
        setErrorMessage('')

    }, [savedMovies]);


    return (
      <AuthRoute>
        <Header/>
        <main className="movies">
          <SearchForm setSavedMovies={setFoundMovies} foundMovies={foundMovies}
            savedMovies={savedMovies}
            setFoundMovies={setFoundMovies}
            setErrorMessage={setErrorMessage}
            setIsLoading={setIsLoading}
            />
          <MoviesCardList
            moviesToRender={foundMovies}
            errorMessage={errorMessage}
            isLoading={isLoading}
            savedMovies={savedMovies}
            foundMovies={foundMovies}
            setFoundMovies={setFoundMovies}
            setSavedMovies={setSavedMovies}/>
        </main>
        <Footer/>
      </AuthRoute>)
}

export default SavedMovies