import React from "react";
import './Navigation.css'
import profileIcon from "../../images/profile-icon.svg"
import { useNavigate } from "react-router-dom";

const Navigation = () => {
  const navigate = useNavigate()
  const toMovies =()=>{navigate('/movies')}
  const toSavedMovies =()=>{navigate('/saved-movies')}
  const toProfile =()=>{navigate('/profile')}
    return(
      <nav className="navigation">
        <button onClick={toMovies} className="navigation__button">Фильмы</button>
        <button onClick={toSavedMovies} className="navigation__button">Сохранённые фильмы</button>
        <button onClick={toProfile} className="navigation__button navigation__profile-button"> 
          <p className="navigation__text">Аккаунт</p> 
          <img src={profileIcon} alt="account button" className="navigation__button-icon navigation__button-icon_blue" />
        </button>
      </nav>
    )
}

export default Navigation