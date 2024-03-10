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


const Movies = ({savedMovies, setSavedMovies, authorised}) => {
  const [moviesToRender, setMoviesToRender] = React.useState([])
  const [isLoading, setIsLoading] = React.useState(false)
  const [movies, setMovies] = React.useState([])
  const navigate = useNavigate()
  

 
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

  if (!authorised) {
          navigate('/')
        }

  const { moviesRenderRule, handleShowMore } = useMovies();
  
  useEffect(() => {
      setMoviesToRender(movies.slice(0, moviesRenderRule.cardsTotal))
  }, [moviesRenderRule.cardsTotal, movies])

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