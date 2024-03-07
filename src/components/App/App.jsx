import React from 'react';
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
  const [onHomePage, setOnHomePage] = React.useState(true)
  const [savedMovies, setSavedMovies] = React.useState([]);
  const [authorised, setAuthorised] = React.useState(localStorage.getItem('authorised') ?JSON.parse(localStorage.getItem('authorised')) : false )
  const [currentUser, setCurrentUser] = React.useState({});
  
  const navigate = useNavigate()
  const getData = async () => {
  const responseData = await mainApi.getMovies();
  localStorage.setItem('savedMovies', JSON.stringify(responseData))
    setSavedMovies(responseData)
  }

  const handleSignOut = async () => {
    try {
      await mainApi.signOut()
      localStorage.clear();
      setCurrentUser({});
      setAuthorised(false)
      navigate('/')
    } catch(err) {
      console.log(err)
    }
  }

  React.useEffect(() => {
    getData()
  }, []);

const isHomePage = pathname === '/' ;


  return (
    
    <div className="app">
      <div className={myCn('page', {page__homepage: isHomePage} )}> 
        <Routes>
          <Route path='/' element={<Main authorised={authorised}/>}/>
          <Route path='/movies' element={<Movies savedMovies={savedMovies} setSavedMovies={setSavedMovies} getData={getData} authorised={authorised}/>}/>
          <Route path='/saved-movies' element={<SavedMovies savedMovies={savedMovies} authorised={authorised} setSavedMovies={setSavedMovies} getData={getData}/>}/>
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
