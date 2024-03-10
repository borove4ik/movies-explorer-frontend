import React, { useEffect } from "react";
import './Movies.css'
import SearchForm from "./SearchForm/SearchForm";
import Header from "../Header/Header";
import LoadMoreButton from "./LoadMoreButton/LoadMoreButton";
import Footer from "../Footer/Footer"
import MoviesCardList from "./MoviesCardList/MoviesCardList";
import useRenderRule from "../../utils/useRenderRule";
import CardConfig from "../../utils/CardConfig";
import { useNavigate } from "react-router-dom";


const Movies = ({savedMovies, setSavedMovies, authorised, isDataLoaded}) => {
  const [moviesToRender, setMoviesToRender] = React.useState([])
  const [isLoading, setIsLoading] = React.useState(false)
  const [movies, setMovies] = React.useState([])
  const navigate = useNavigate();  
  const search = localStorage.getItem('allMoviesSearchQuery') ? localStorage.getItem('allMoviesSearchQuery') : '';

  
  const [errorMessage, setErrorMessage] = React.useState('')

  const useMovies = () => {
    const {moviesRenderRule, setMoviesRenderRule } = useRenderRule();

    const handleShowMore = () => {
      const windowSize = window.innerWidth;
      if(windowSize > CardConfig.windowResolution.tablet) {
        setMoviesRenderRule({
          ...moviesRenderRule,
          cardsTotal: moviesRenderRule.cardsTotal + 3
        })
      } else if(windowSize <= CardConfig.windowResolution.tablet) {
        setMoviesRenderRule({
          ...moviesRenderRule,
          cardsTotal: moviesRenderRule.cardsTotal + 2
        })
      }
  
    }

    return {moviesRenderRule, handleShowMore}
}


  const { moviesRenderRule, handleShowMore } = useMovies();

  useEffect(() => {
  if (!authorised) {
          navigate('/')
        }
  }, [])
  
  useEffect(() => {
      setMoviesToRender(movies.slice(0, moviesRenderRule.cardsTotal))
  }, [moviesRenderRule.cardsTotal, movies]);

    useEffect(() => {
          if (!isDataLoaded && search) {
              const foundMovies = localStorage.getItem('allMoviesFound') ? JSON.parse(localStorage.getItem('allMoviesFound')) : null;
              const allMoviesData = localStorage.getItem('allMovies') ? JSON.parse(localStorage.getItem('allMovies')) : null;
  
              if (foundMovies) {
                  setMovies(foundMovies);
                  return;
              }
  
              if (allMoviesData) {
                  setMovies(allMoviesData);
                  return;
              }
          }
      }, [isDataLoaded]);

    return (
      <>
        <Header authorised={authorised}/>
        <main className="movies">
          <SearchForm movies={movies} setMovies={setMovies} setIsLoading={setIsLoading} setErrorMessage={setErrorMessage}/>
          <MoviesCardList savedMovies={savedMovies} setSavedMovies={setSavedMovies} moviesToRender={moviesToRender} isLoading={isLoading} errorMessage={errorMessage}/>
          {movies.length > moviesRenderRule.cardsTotal && !errorMessage && <LoadMoreButton loadMore={handleShowMore}/>}
        </main>
        <Footer />
      </>
    )
}

export default Movies