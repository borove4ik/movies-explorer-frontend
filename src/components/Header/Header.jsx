import React from "react";
import './Header.css';
import headerLogo from "../../images/logo.svg";
import { useParams, useNavigate } from "react-router-dom";
import Navigation from "../Navigation/Navigation";
import MenuButton from "../BurgerMenu/MenuButton/MenuButton";

const Header = ({authorised}) => {
  const navigate = useNavigate();
  const goHome=()=>{navigate('/')}
  const toRegistration = () => {navigate('/signup')}
  const toLogin = () => {navigate('/signin')}
    
    return (
      <header className="header">
        <img src={headerLogo} alt="header-logo" className="header__logo" onClick={goHome}/>
        {!authorised&&<div className="header__button-wrapper">
          <button className="header__button header__registration"  onClick={toRegistration}>Регистрация</button>
          <button className="header__button header__button-green"  onClick={toLogin}>Войти</button>
        </div>}
        {/* <MenuButton /> */}
        {authorised&&<Navigation/>}
        
      </header>
      )
}

export default Header