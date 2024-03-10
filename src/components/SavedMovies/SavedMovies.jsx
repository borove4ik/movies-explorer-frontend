import React, {useEffect} from "react";
import './SavedMovies.css'
import Header from "../Header/Header";
import SearchForm from "../Movies/SearchForm/SearchForm";
import MoviesCardList from "../Movies/MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";
import useRenderRule from "../../utils/useRenderRule";
import CardConfig from "../../utils/CardConfig";
import { useNavigate } from "react-router-dom";

const SavedMovies = ({authorised, savedMovies, setSavedMovies, isDataLoaded}) => {
    const [moviesToRender, setMoviesToRender] = React.useState([])
    const [isLoading, setIsLoading] = React.useState(false)
    const navigate = useNavigate()
    

    const [errorMessage, setErrorMessage] = React.useState('');

    useEffect(() => {
        if (!isDataLoaded) {
            const foundSavedMovies = localStorage.getItem('savedMoviesFound') ? JSON.parse(localStorage.getItem('savedMoviesFound')) : null;
            const savedMoviesData = localStorage.getItem('savedMovies') ? JSON.parse(localStorage.getItem('savedMovies')) : null;

            if (foundSavedMovies) {
                setSavedMovies(foundSavedMovies);
                return;
            }

            if (savedMoviesData) {
                setSavedMovies(savedMoviesData);
                return;
            }
        }
    }, [isDataLoaded]);

     if (!authorised) {
          navigate('/')
        }

    const useMovies = () => {
        const {moviesRenderRule, setMoviesRenderRule} = useRenderRule();

        const handleShowMore = () => {
            const windowSize = window.innerWidth;
            if (windowSize > CardConfig.windowResolution.tablet) {
                setMoviesRenderRule({
                    ...moviesRenderRule,
                    cardsTotal: moviesRenderRule.cardsTotal + 3
                })
            } else if (windowSize <= CardConfig.windowResolution.tablet) {
                setMoviesRenderRule({
                    ...moviesRenderRule,
                    cardsTotal: moviesRenderRule.cardsTotal + 2
                })
            }

        }

        return {moviesRenderRule, handleShowMore}
    }

    const {moviesRenderRule, handleShowMore} = useMovies();

    useEffect(() => {
        setMoviesToRender(savedMovies.slice(0, moviesRenderRule.cardsTotal))
    }, [moviesRenderRule.cardsTotal, savedMovies])


    return (
      <>
        <Header authorised={authorised}/>
        <main className="movies">
          <SearchForm movies={savedMovies} setMovies={setSavedMovies} setErrorMessage={setErrorMessage}
            setIsLoading={setIsLoading}/>
          <MoviesCardList moviesToRender={moviesToRender} errorMessage={errorMessage} isLoading={isLoading}
            savedMovies={savedMovies} setSavedMovies={setSavedMovies}/>
        </main>
        <Footer/>
      </>
    )
}

export default SavedMovies