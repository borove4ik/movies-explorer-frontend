import React from "react";
import './Movies.css'
import SearchForm from "./SearchForm/SearchForm";
import movieImage from "../../images/movie.svg"
import Header from "../Header/Header";
import LoadMoreButton from "./LoadMoreButton/LoadMoreButton";
import Footer from "../Footer/Footer"
import MoviesCardList from "./MoviesCardList/MoviesCardList";
const mockMovies = [
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
  {
      imageLink: movieImage, 
      title: '33 слова о дизайне',
      duration: '1ч 47м',
      id: '4'
  },
  {
      imageLink: movieImage, 
      title: '33 слова о дизайне',
      duration: '1ч 47м',
      id: '5'
  },
  {
      imageLink: movieImage, 
      title: '33 слова о дизайне',
      duration: '1ч 47м',
      id: '6'
  },
  {
      imageLink: movieImage, 
      title: '33 слова о дизайне',
      duration: '1ч 47м',
      id: '7'
  },
  {
      imageLink: movieImage, 
      title: '33 слова о дизайне',
      duration: '1ч 47м',
      id: '8'
  },
  {
      imageLink: movieImage, 
      title: '33 слова о дизайне',
      duration: '1ч 47м',
      id: '9'
  },
  {
      imageLink: movieImage, 
      title: '33 слова о дизайне',
      duration: '1ч 47м',
      id: '10'
  },
  {
      imageLink: movieImage, 
      title: '33 слова о дизайне',
      duration: '1ч 47м',
      id: '11'
  },
  {
      imageLink: movieImage, 
      title: '33 слова о дизайне',
      duration: '1ч 47м',
      id: '12'
  },
  {
      imageLink: movieImage, 
      title: '33 слова о дизайне',
      duration: '1ч 47м',
      id: '13'
  },
  {
      imageLink: movieImage, 
      title: '33 слова о дизайне',
      duration: '1ч 47м',
      id: '14'
  },
  {
      imageLink: movieImage, 
      title: '33 слова о дизайне',
      duration: '1ч 47м',
      id: '15'
  },
  {
      imageLink: movieImage, 
      title: '33 слова о дизайне',
      duration: '1ч 47м',
      id: '16'
  },
  {
      imageLink: movieImage, 
      title: '33 слова о дизайне',
      duration: '1ч 47м',
      id: '17'
  },
  {
      imageLink: movieImage, 
      title: '33 слова о дизайне',
      duration: '1ч 47м',
      id: '18'
  },
  {
      imageLink: movieImage, 
      title: '33 слова о дизайне',
      duration: '1ч 47м',
      id: '19'
  },
  {
      imageLink: movieImage, 
      title: '33 слова о дизайне',
      duration: '1ч 47м',
      id: '20'
  },
  {
      imageLink: movieImage, 
      title: '33 слова о дизайне',
      duration: '1ч 47м',
      id: '21'
  },
  {
      imageLink: movieImage, 
      title: '33 слова о дизайне',
      duration: '1ч 47м',
      id: '22'
  },
  {
      imageLink: movieImage, 
      title: '33 слова о дизайне',
      duration: '1ч 47м',
      id: '23'
  },
  {
      imageLink: movieImage, 
      title: '33 слова о дизайне',
      duration: '1ч 47м',
      id: '24'
  },
  {
      imageLink: movieImage, 
      title: '33 слова о дизайне',
      duration: '1ч 47м',
      id: '25'
  },
  {
      imageLink: movieImage, 
      title: '33 слова о дизайне',
      duration: '1ч 47м',
      id: '26'
  },
  {
      imageLink: movieImage, 
      title: '33 слова о дизайне',
      duration: '1ч 47м',
      id: '27'
  },
  {
      imageLink: movieImage, 
      title: '33 слова о дизайне',
      duration: '1ч 47м',
      id: '28'
  },
  {
      imageLink: movieImage, 
      title: '33 слова о дизайне',
      duration: '1ч 47м',
      id: '29'
  },
  {
      imageLink: movieImage, 
      title: '33 слова о дизайне',
      duration: '1ч 47м',
      id: '30'
  },
  {
      imageLink: movieImage, 
      title: '33 слова о дизайне',
      duration: '1ч 47м',
      id: '31'
  },
  {
      imageLink: movieImage, 
      title: '33 слова о дизайне',
      duration: '1ч 47м',
      id: '32'
  },
  {
      imageLink: movieImage, 
      title: '33 слова о дизайне',
      duration: '1ч 47м',
      id: '33'
  },
  {
      imageLink: movieImage, 
      title: '33 слова о дизайне',
      duration: '1ч 47м',
      id: '34'
  },
  {
      imageLink: movieImage, 
      title: '33 слова о дизайне',
      duration: '1ч 47м',
      id: '35'
  },
  {
      imageLink: movieImage, 
      title: '33 слова о дизайне',
      duration: '1ч 47м',
      id: '36'
  },
  ]

const useMovies = () => {
    const count = 12;
    const [iteration, setIteration] = React.useState(1);
    const [movies, setMovies] = React.useState(mockMovies.slice(0, count));
    
    const getMoreMovies = () => {
        
        setMovies(mockMovies.slice(0, count * (iteration + 1)));
        setIteration(prev => prev + 1)
    }

    return { getMoreMovies, movies }
}

const Movies = () => {
  const [moviesToRender, setMoviesToRender] = React.useState([])
  const [isDisabled, setIsDisabled] = React.useState(false)

  const { movies, getMoreMovies } = useMovies();

    return (
      <>
        <Header authorised={true}/>
        <main className="movies">
          <SearchForm/>
          <MoviesCardList moviesToRender={movies} isLoading={true}/>
          <LoadMoreButton loadMore={getMoreMovies} disabled={isDisabled}/>
        </main>
        <Footer />
      </>
    )
}

export default Movies