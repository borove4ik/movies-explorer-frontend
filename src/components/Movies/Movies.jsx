import React, {useEffect, useState} from "react";
import './Movies.css'
import useMovies from "../../hooks/useMovies";
import AuthRoute from "../AuthRoute/AuthRoute";
import Footer from "../Footer/Footer"
import Header from "../Header/Header";
import LoadMoreButton from "./LoadMoreButton/LoadMoreButton";
import MoviesCardList from "./MoviesCardList/MoviesCardList";
import SearchForm from "./SearchForm/SearchForm";

const Movies = ({savedMovies, setSavedMovies, isDataLoaded}) => {
    const localFoundMovies = localStorage.getItem('allMoviesFound') ? JSON.parse(localStorage.getItem('allMoviesFound')) : [];

    const [moviesToRender, setMoviesToRender] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [movies, setMovies] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const [foundMovies, setFoundMovies] = useState(localFoundMovies);
    const {moviesRenderRule, handleShowMore, resetMovies} = useMovies();

    useEffect(() => {
        setMoviesToRender((foundMovies.length > 0 ? foundMovies : movies).slice(0, moviesRenderRule.cardsTotal))
    }, [moviesRenderRule.cardsTotal, movies, foundMovies]);

    return (
      <AuthRoute>
        <Header/>
        <main className="movies">
          <SearchForm movies={movies} setMovies={setMovies} setSavedMovies={setSavedMovies}
            savedMovies={savedMovies}
            setIsLoading={setIsLoading} foundMovies={foundMovies}
            setFoundMovies={setFoundMovies}
            setErrorMessage={setErrorMessage}
            resetMovies={resetMovies}
            />
          <MoviesCardList savedMovies={savedMovies} setSavedMovies={setSavedMovies}
            setFoundMovies={setFoundMovies} isDataLoaded={isDataLoaded}
            foundMovies={foundMovies}
            moviesToRender={moviesToRender} isLoading={isLoading} errorMessage={errorMessage}/>
          {(foundMovies.length > 0 ? foundMovies.length : movies.length) > moviesRenderRule.cardsTotal && !errorMessage &&
            <LoadMoreButton loadMore={handleShowMore}/>}
        </main>
        <Footer/>
      </AuthRoute>
    )
}

export default Movies