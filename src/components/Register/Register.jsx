import React from "react";
import './Register.css'
import InputWithLabel from "../InputWithLabel/InputWithLabel";
import SubmitButton from "../SubmitButton/SubmitButton";
import HomeLinkLogo from "../HomeLinkLogo/HomeLinkLogo";

const Register = () => {
    return (
      <main className="register">
        <HomeLinkLogo />
        <h1 className="register__title">Добро пожаловать!</h1>
        <form >
          <div className="register__form">
            <InputWithLabel name='name' label='Имя' />
            <InputWithLabel name='email' label='E-mail' />
            <InputWithLabel name='password' label='Пароль' />
          </div>
          <SubmitButton text='Зарегистрироваться' />
          <div className="register__sign-in-wrapper">
            <p className="register__text">Уже зарегистрированы?</p>
            <a href="/signin" className="register__sign-in-button">Войти</a>
          </div>
        </form>
      </main>
    )
}

export default Register