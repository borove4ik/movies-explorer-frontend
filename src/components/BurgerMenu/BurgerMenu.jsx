import React from "react";
import './BurgerMenu.css';
import profileIcon from "../../images/profile-icon.svg";
import closeButton from "../../images/close.svg";


const BurgerMenu = () => {
    return (
      <div className="burger-menu">
        <button className="burger-menu__close-button">
          <img src={closeButton} alt="close button" className="burger-menu__close-button-icon" />
        </button>
        <div className="burger-menu__navigate-wrapper">
          <button className="burger-menu__navigation-button">Главная</button>
          <button className="burger-menu__navigation-button">Фильмы</button>
          <button className="burger-menu__navigation-button">Сохранённые фильмы</button>
        </div>
        <button className="burger-menu__navigation-button burger-menu__account-button">
          <p className="burger-menu__text">Аккаунт</p> 
          <img src={profileIcon} alt="account button" className="burger-menu__button-icon" />
        </button>
      </div>
    )
}

export default BurgerMenu