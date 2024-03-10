import React, { useCallback, useEffect } from 'react';
import './App.css';
import ErrorPage from '../ErrorPage/ErrorPage';
import SavedMovies from '../SavedMovies/SavedMovies';
import Login from '../Login/Login';
import Register from '../Register/Register';
import Profile from '../Profile/Profile';
import {Routes, Route, useLocation } from 'react-router-dom';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import myCn from '../../utils/myCn';
import mainApi from '../../utils/MainApi';
import { useNavigate } from 'react-router-dom';

function App() {
  
  const { pathname } = useLocation()
  const [savedMovies, setSavedMovies] = React.useState([]);
  const [authorised, setAuthorised] = React.useState(localStorage.getItem('authorised') ?JSON.parse(localStorage.getItem('authorised')) : false )
  const [currentUser, setCurrentUser] = React.useState({});
  
  const navigate = useNavigate()

  useEffect(() => {
    if (savedMovies && savedMovies.length > 0) {
      const savedMoviesData = localStorage.setItem('savedMovies', JSON.stringify(savedMovies));
    }
     
  }, [savedMovies]);

  const checkToken = useCallback(async () => {
    try {
      const authorised = localStorage.getItem('authorised');
      if (authorised) {
        await mainApi.checkToken();
        setAuthorised(true);
      } else {
        setAuthorised(false);
        localStorage.removeItem('authorised');
      }
    } catch (err) {
      console.log(err);
      localStorage.removeItem('authorised');
      setAuthorised(false);
    }
  }, []);

  useEffect(() => {
    checkToken();
    authorised &&
    Promise.all([mainApi.getMe(), mainApi.getMovies()])
    .then(([userData, savedMoviesData]) => {
      setAuthorised(true);
      setCurrentUser(userData);
      setSavedMovies(savedMoviesData);
      localStorage.setItem('savedMovies', JSON.stringify(savedMoviesData));
    })
    .catch((err) => {
      console.log(`Ошибка хука на выдачу данных: ${err}`);
    });

    if (!authorised) {
      navigate('/');
    }
  }, [authorised, checkToken]);

  const handleSignOut = async () => {
    try {
      await mainApi.signOut()
      localStorage.clear();
      const cookies = document.cookie.split(';');
      // set past expiry to all cookies
      for (var i = 0; i < cookies.length; i++) {
          document.cookie = cookies[i] + "=; expires="+ new Date(0).toUTCString();
      }     
     
     setCurrentUser({});
      setAuthorised(false)
      navigate('/')
    } catch(err) {
      console.log(err)
    }
  }


const isHomePage = pathname === '/' ;


  return (
    
    <div className="app">
      <div className={myCn('page', {page__homepage: isHomePage} )}> 
        <Routes>
          <Route path='/' element={<Main authorised={authorised}/>}/>
          <Route path='/movies' element={<Movies savedMovies={savedMovies} setSavedMovies={setSavedMovies} authorised={authorised}/>}/>
          <Route path='/saved-movies' element={<SavedMovies savedMovies={savedMovies} authorised={authorised} setSavedMovies={setSavedMovies}/>}/>
          <Route path='/profile' element={<Profile authorised={authorised} currentUser={currentUser} setCurrentUser={setCurrentUser} handleSignOut={handleSignOut}/>}/>
          <Route path='/signin' element={<Login setAuthorised={setAuthorised}/>}/>
          <Route path='/signup' element={<Register setAuthorised={setAuthorised}/>}/>
          <Route path='*' element={<ErrorPage/>}/>
        </Routes>
      </div>
    </div>
  );
}



export default App;
