import React from 'react';
import './App.css';
import ErrorPage from '../ErrorPage/ErrorPage';
import SavedMovies from '../SavedMovies/SavedMovies';
import Login from '../Login/Login';
import Register from '../Register/Register';
import Profile from '../Profile/Profile';
import {Routes, Route } from 'react-router-dom';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';

function App() {
  
  return (
    
    <div className="app ">
      <div className="page "> 
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
