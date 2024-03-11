import React, {createContext, useEffect, useState} from 'react';
import './App.css';
import {Route, Routes, useLocation, useNavigate} from 'react-router-dom';
import mainApi from '../../utils/MainApi';
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

function App() {
    const {pathname} = useLocation();
    const [savedMovies, setSavedMovies] = useState([]);
    const [authorised, setAuthorised] = useState(isLocalAuthorized);
    const [currentUser, setCurrentUser] = useState({});
    const [isDataLoaded, setIsDataLoaded] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (authorised) {
            setIsDataLoaded(true);
            Promise.all([mainApi.getMe(), mainApi.getMovies()])
                .then(([userData, savedMoviesData]) => {
                    setAuthorised(true);
                    setCurrentUser(userData);
                    setSavedMovies(savedMoviesData);
                    localStorage.setItem('savedMovies', JSON.stringify(savedMoviesData));
                })
                .catch((err) => {
                    console.log(`Ошибка хука на выдачу данных: ${err}`);
                })
                .finally(() => {
                    setIsDataLoaded(false);
                })
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
            <Routes>
              <Route path='/' element={<Main/>}/>
              <Route path='/movies' element={<Movies isDataLoaded={isDataLoaded} savedMovies={savedMovies}
                setSavedMovies={setSavedMovies}/>}/>
              <Route path='/saved-movies'
                element={<SavedMovies savedMovies={savedMovies} authorised={authorised}
                  isDataLoaded={isDataLoaded} setSavedMovies={setSavedMovies}/>}/>
              <Route path='/profile'
                element={<Profile currentUser={currentUser} setCurrentUser={setCurrentUser}
                  handleSignOut={handleSignOut}/>}/>
              <Route path='/signin' element={<Login setAuthorised={setAuthorised}/>}/>
              <Route path='/signup' element={<Register setAuthorised={setAuthorised}/>}/>
              <Route path='*' element={<ErrorPage/>}/>
            </Routes>
          </AuthContext.Provider>
        </div>
      </div>
    );
}


export default App;
