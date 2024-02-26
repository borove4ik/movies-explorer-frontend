import React from "react";
import './Header.css';
import headerLogo from "../../images/logo.svg";
import { useParams, useNavigate, Link, NavLink } from "react-router-dom";
import Navigation from "../Navigation/Navigation";
import MenuButton from "../BurgerMenu/MenuButton/MenuButton";
import HomeLinkLogo from "../HomeLinkLogo/HomeLinkLogo";
import BurgerMenu from "../BurgerMenu/BurgerMenu";

const Header = ({authorised}) => {
  const navigate = useNavigate();
  const goHome=()=>{navigate('/')}
  const toRegistration = () => {navigate('/signup')}
  const toLogin = () => {navigate('/signin')}
  const [ openMenu, setOpenMenu ] = React.useState(false)
  const toggleMenu = () => {
    setOpenMenu(!openMenu)
    console.log(openMenu)
  }
    return (
      <header className="header">
        <HomeLinkLogo />
        {authorised&&<BurgerMenu opened={openMenu} closeMenu={toggleMenu}/>}
        {!authorised&&<nav className="header__button-wrapper">
          <button className="header__button header__registration"  onClick={toRegistration} type="button">Регистрация</button>
          <button className="header__button header__button-green"  onClick={toLogin} type="button">Войти</button>
        </nav>}
        {authorised&&<Navigation/>}
        {authorised&&<MenuButton clickFunction={toggleMenu} />}

      </header>
      )
}

export default Header