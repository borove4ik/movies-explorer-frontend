import React from "react";
import './Profile.css';
import Header from '../Header/Header';

const Profile = () => {
    return (
      <>
        <Header/>
        <section className="profile"> 
          <h1 className="profile__title">Привет, Денис!</h1> 
          <form action="" className="profile__form">
            <div className="profile__input-wrapper">  
              <label htmlFor="" className="profile__label">Имя</label>
              <input type="text" className="profile__input" />
            </div>
            <div className="profile__input-wrapper profile__input-wrapper_borderless"> 
              <label htmlFor="" className="profile__label">E-mail</label>
              <input type="text" className="profile__input" />
            </div>
         
          </form>
          <button className="profile__edit">Редактировать</button>
          <a href="" className="profile__sign-out">Выйти из аккаунта</a>
        </section>
       
      </>
       
    )
}

export default Profile