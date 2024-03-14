import React, {createContext, useEffect, useState} from 'react';
import './App.css';
import {Route, Routes, useLocation, useNavigate} from 'react-router-dom';
import mainApi from '../../utils/MainApi';
import moviesApi from '../../utils/MoviesApi';
import myCn from '../../utils/myCn';
import removeAllCookies from '../../utils/removeAllCookies';
import ErrorPage from '../ErrorPage/ErrorPage';
import Login from '../Login/Login';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import Profile from '../Profile/Profile';
import Register from '../Register/Register';
import SavedMovies from '../SavedMovies/SavedMovies';

const isLocalAuthorized = localStorage.getItem('authorised') ? localStorage.getItem('authorised') === 'true' : false;
export const AuthContext = createContext(isLocalAuthorized);

const FilterContext = React.createContext(null);
export const useFiltersContext = () => React.useContext(FilterContext)

function App() {
    const {pathname} = useLocation();
    const [authorised, setAuthorised] = useState(isLocalAuthorized); 
    const [currentUser, setCurrentUser] = useState({});
    const navigate = useNavigate();

    const [allMovies, setAllMovies] = React.useState([]);
    const [savedMovies, setSavedMovies] = React.useState(JSON.parse(localStorage.getItem('mySavedMovies')) || []);
    const [isLoading, setisLoading] = React.useState(true);
    const [getDataError, setGetDataError] = React.useState('')  
    
    const [filters, setFilters] = React.useState({
      'movies': {
        checked: JSON.parse(localStorage.getItem('myMoviesChecked')) || false,
        searchValue: localStorage.getItem('myMoviesSearchValue') || '',
      },
      'saved-movies': {
        checked: JSON.parse(localStorage.getItem('mySavedMoviesChecked')) || false,
        searchValue: ''
      }
    });


    const toggleChecked = (type) => {
      setFilters(prev => {
        const addedValue = type === 'movies' ? 'myMovies' : 'mySavedMovies';
        localStorage.setItem(addedValue + 'Checked', JSON.stringify(!prev[type].checked));

        return ({...prev, [type]: {...prev[type], checked: !prev[type].checked}})
      })
    }
    const setSearchValue = (type, searchValue) => {
      if (type === 'movies') {
        localStorage.setItem('myMoviesSearchValue', searchValue)
      }
      setFilters(prev => ({...prev, [type]: {...prev[type], searchValue}}))
    }
    const addMovieToSaved = (movie) => {
      setSavedMovies(prev => {
        const newValue = [...prev, movie];
        localStorage.setItem('mySavedMovies', JSON.stringify(newValue))
        return newValue;
      })
    }
    const removeMovieFromSaved = (movieId) => {
      setSavedMovies(prev => {
        const newValue = prev.filter(movie => movie.movieId !== movieId);
        localStorage.setItem('mySavedMovies', JSON.stringify(newValue))
        return newValue;
      })
    }



    const getData = async () => {
      try {

        const userData = await mainApi.getMe();
        const allMoviesResponse = await moviesApi.getMovies();
        const hasSaved = JSON.parse(localStorage.getItem('mySavedMovies'));
  
        if (!hasSaved) {
          const savedMoviesResponse = await mainApi.getMovies();
          setSavedMovies(savedMoviesResponse);
        }
        setAllMovies(allMoviesResponse)
        setisLoading(false);
        setCurrentUser(userData);
      } catch (error) {
        setGetDataError('Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз')
    }
  }

    React.useEffect(() => {
      if (authorised) {
        getData()
      }
    }, [authorised]);


    const handleSignOut = async () => {
        try {
            await mainApi.signOut();
            localStorage.clear();
            removeAllCookies();
            setCurrentUser({});
            setAuthorised(false);
            navigate('/')
        } catch (err) {
            console.log(err)
        }
    }


    return (
      <div className="app">
        <div className={myCn('page', {page__homepage: pathname === '/'})}>
          <AuthContext.Provider value={authorised}>
            <FilterContext.Provider value={{filters, toggleChecked,setSearchValue,addMovieToSaved,removeMovieFromSaved,getDataError}}>
              <Routes>
                <Route path='/' element={<Main/>}/>
                <Route path='/movies' element={<Movies savedMovies={savedMovies} allMovies={allMovies} isLoading={isLoading} />}/>
                <Route path='/saved-movies'
                  element={<SavedMovies  savedMovies={savedMovies} allMovies={allMovies} isLoading={isLoading} />}/>
                <Route path='/profile'
                  element={<Profile currentUser={currentUser} setCurrentUser={setCurrentUser}
                    handleSignOut={handleSignOut}/>}/>
                <Route path='/signin' element={<Login setAuthorised={setAuthorised} authorised={authorised}/>}/>
                <Route path='/signup' element={<Register setAuthorised={setAuthorised} authorised={authorised}/>}/>
                <Route path='*' element={<ErrorPage/>}/>
              </Routes>
            </FilterContext.Provider>
          </AuthContext.Provider>
        </div>
      </div>
    );
}


export default App;
