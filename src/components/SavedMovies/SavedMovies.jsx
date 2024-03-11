import React, {useEffect, useState} from "react";
import './SavedMovies.css'
import useRenderRule from "../../hooks/useRenderRule";
import CardConfig from "../../utils/CardConfig";
import AuthRoute from "../AuthRoute/AuthRoute";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import MoviesCardList from "../Movies/MoviesCardList/MoviesCardList";
import SearchForm from "../Movies/SearchForm/SearchForm";

const SavedMovies = ({savedMovies, setSavedMovies}) => {
    const localFoundMovies = localStorage.getItem('savedMoviesFound') ? JSON.parse(localStorage.getItem('savedMoviesFound')) : [];

    const [moviesToRender, setMoviesToRender] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [foundMovies, setFoundMovies] = useState(localFoundMovies);

    const useMovies = () => {
        const {moviesRenderRule, setMoviesRenderRule} = useRenderRule();

        const handleShowMore = () => {
            const windowSize = window.innerWidth;
            if (windowSize > CardConfig.windowResolution.tablet) {
                setMoviesRenderRule({
                    ...moviesRenderRule, cardsTotal: moviesRenderRule.cardsTotal + 3
                })
            } else if (windowSize <= CardConfig.windowResolution.tablet) {
                setMoviesRenderRule({
                    ...moviesRenderRule, cardsTotal: moviesRenderRule.cardsTotal + 2
                })
            }
        }

        return {moviesRenderRule, handleShowMore}
    }

    const {moviesRenderRule} = useMovies();

    useEffect(() => {
        setMoviesToRender((foundMovies.length > 0 ? foundMovies : savedMovies).slice(0, moviesRenderRule.cardsTotal))
    }, [moviesRenderRule.cardsTotal, savedMovies, foundMovies]);

    return (
      <AuthRoute>
        <Header/>
        <main className="movies">
          <SearchForm movies={savedMovies} setSavedMovies={setSavedMovies} foundMovies={foundMovies}
            savedMovies={savedMovies}
            setFoundMovies={setFoundMovies}
            setMovies={setSavedMovies} setErrorMessage={setErrorMessage}
            setIsLoading={setIsLoading}/>
          <MoviesCardList
            moviesToRender={moviesToRender}
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