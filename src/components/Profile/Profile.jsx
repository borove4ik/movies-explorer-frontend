import React from "react";
import './Profile.css';
import Header from '../Header/Header';

const Profile = () => {
    return (
      <>
        <Header/>
        <main className="profile"> 
          <h1 className="profile__title">Привет, Денис!</h1> 
          <form className="profile__form">
            <div className="profile__input-wrapper">  
              <label className="profile__label">Имя</label>
              <input type="text" className="profile__input" />
            </div>
            <div className="profile__input-wrapper profile__input-wrapper_borderless"> 
              <label className="profile__label">E-mail</label>
              <input type="text" className="profile__input" />
            </div>
         
          </form>
          <button className="profile__edit" type="submit" >Редактировать</button>
          <a href="/" className="profile__sign-out">Выйти из аккаунта</a>
        </main>
       
      </>
       
    )
}

export default Profile