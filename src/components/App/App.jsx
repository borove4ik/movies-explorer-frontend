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

function App() {
  
const { pathname } = useLocation()
const [onHomePage, setOnHomePage] = React.useState(true)
// pathname === '/' ? setOnHomePage(true) : setOnHomePage(false)

const isHomePage = pathname === '/' ;


  return (
    
    <div className="app ">
      {/* <div className={`page ${isHomePage ? 'page__homepage' : ''}`} >  */}
      <div className={myCn('page', {page__homepage: isHomePage} )}> 
        <Routes>
          <Route path='/' element={<Main/>}/>
          <Route path='/movies' element={<Movies/>}/>
          <Route path='/saved-movies' element={<SavedMovies/>}/>
          <Route path='/profile' element={<Profile/>}/>
          <Route path='/signin' element={<Login/>}/>
          <Route path='/signup' element={<Register/>}/>
          <Route path='*' element={<ErrorPage/>}/>
        </Routes>
      </div>
    </div>
  );
}



export default App;
