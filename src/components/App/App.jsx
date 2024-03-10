import React, {useCallback, useEffect} from 'react';
import './App.css';
import ErrorPage from '../ErrorPage/ErrorPage';
import SavedMovies from '../SavedMovies/SavedMovies';
import Login from '../Login/Login';
import Register from '../Register/Register';
import Profile from '../Profile/Profile';
import {Routes, Route, useLocation} from 'react-router-dom';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import myCn from '../../utils/myCn';
import removeAllCookies from '../../utils/removeAllCookies';
import mainApi from '../../utils/MainApi';
import {useNavigate} from 'react-router-dom';

function App() {
    const isLocalAuthorized = localStorage.getItem('authorised') ? localStorage.getItem('authorised') === 'true' : false;
    const {pathname} = useLocation();
    const [savedMovies, setSavedMovies] = React.useState([]);
    const [authorised, setAuthorised] = React.useState(isLocalAuthorized);
    const [currentUser, setCurrentUser] = React.useState({});
    const [isDataLoaded, setIsDataLoaded] = React.useState(false);
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
          <Routes>
            <Route path='/' element={<Main authorised={authorised}/>}/>
            <Route path='/movies' element={<Movies  isDataLoaded={isDataLoaded}savedMovies={savedMovies} setSavedMovies={setSavedMovies}
              authorised={authorised}/>}/>
            <Route path='/saved-movies' element={<SavedMovies savedMovies={savedMovies} authorised={authorised}
              isDataLoaded={isDataLoaded}
              setSavedMovies={setSavedMovies}/>}/>
            <Route path='/profile' element={<Profile authorised={authorised} currentUser={currentUser}
              setCurrentUser={setCurrentUser}
              handleSignOut={handleSignOut}/>}/>
            <Route path='/signin' element={<Login authorised={authorised} setAuthorised={setAuthorised}/>}/>
            <Route path='/signup' element={<Register authorised={authorised} setAuthorised={setAuthorised}/>}/>
            <Route path='*' element={<ErrorPage/>}/>
          </Routes>
        </div>
      </div>
    );
}


export default App;
