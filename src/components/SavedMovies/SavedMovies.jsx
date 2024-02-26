import React from "react";
import './SavedMovies.css'
import Header from "../Header/Header";
import SearchForm from "../Movies/SearchForm/SearchForm";
import MoviesCardList from "../Movies/MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";
import movieImage from "../../images/movie.svg"


const movies = [
    {
        imageLink: movieImage, 
        title: '33 слова о дизайне',
        duration: '1ч 47м',
        id: '1'
    },
    {
        imageLink: movieImage, 
        title: '33 слова о дизайне',
        duration: '1ч 47м',
        id: '2'
    },
    {
        imageLink: movieImage, 
        title: '33 слова о дизайне',
        duration: '1ч 47м',
        id: '3'
    },
]

const SavedMovies = () => {
    return (
      <>
        <Header authorised={true}/>
        <SearchForm />
        <MoviesCardList moviesToRender={movies}/>
        <Footer />
      </>
    )
}

export default SavedMovies