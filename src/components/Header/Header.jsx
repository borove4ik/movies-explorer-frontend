import React, {useContext, useState} from "react";
import './Header.css';
import {useNavigate} from "react-router-dom";
import {AuthContext} from "../App/App";
import BurgerMenu from "../BurgerMenu/BurgerMenu";
import MenuButton from "../BurgerMenu/MenuButton/MenuButton";
import HomeLinkLogo from "../HomeLinkLogo/HomeLinkLogo";
import Navigation from "../Navigation/Navigation";

const Header = () => {
    const authorized = useContext(AuthContext);

    const navigate = useNavigate();
    const toRegistration = () => {
        navigate('/signup')
    }
    const toLogin = () => {
        navigate('/signin')
    }
    const [openMenu, setOpenMenu] = useState(false)
    const toggleMenu = () => {
        setOpenMenu(!openMenu)
    }
    return (
      <header className="header">
        <HomeLinkLogo/>
        {authorized && <BurgerMenu opened={openMenu} closeMenu={toggleMenu}/>}
        {!authorized && <nav className="header__button-wrapper">
          <button className="header__button header__registration" onClick={toRegistration}
            type="button">Регистрация
          </button>
          <button className="header__button header__button-green" onClick={toLogin} type="button">Войти</button>
        </nav>}
        {authorized && <Navigation authorized={authorized}/>}
        {authorized && <MenuButton clickFunction={toggleMenu}/>}
      </header>
    )
}

export default Header