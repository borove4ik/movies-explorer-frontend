import React from "react";
import './BurgerMenu.css';
import {useNavigate} from "react-router-dom";
import closeButton from "../../images/close.svg";
import profileIcon from "../../images/profile-icon.svg";
import myCn from "../../utils/myCn";

const BurgerMenu = ({opened, closeMenu}) => {
    const burgerStyles = myCn('burger-overlay', {
        'burger-overlay_opened': opened
    })

    const navigate = useNavigate();
    const goHome = () => {
        navigate('/');
        closeMenu();
    }
    const toMovies = () => {
        navigate('/movies');
        closeMenu();
    }
    const toSavedMovies = () => {
        navigate('/saved-movies');
        closeMenu();
    }
    const toProfile = () => {
        navigate('/profile');
        closeMenu();
    }
    return (

      <div className={burgerStyles}>
        <div className="burger-menu">
          <button className="burger-menu__close-button" type="button" onClick={closeMenu}>
            <img src={closeButton} alt="закрыть" className="burger-menu__close-button-icon"/>
          </button>
          <div className="burger-menu__navigate-wrapper">
            <button onClick={goHome} className="burger-menu__navigation-button" type="button">Главная</button>
            <button onClick={toMovies} className="burger-menu__navigation-button" type="button">Фильмы</button>
            <button className="burger-menu__navigation-button" type="button" onClick={toSavedMovies}>Сохранённые
              фильмы
            </button>
          </div>
          <button className="burger-menu__navigation-button burger-menu__account-button" type="button">
            <p className="burger-menu__text" onClick={toProfile}>Аккаунт</p>
            <img src={profileIcon} alt="профиль" className="burger-menu__button-icon"/>
          </button>
        </div>
      </div>

    )
}

export default BurgerMenu