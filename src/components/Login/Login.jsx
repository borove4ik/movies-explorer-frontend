import React from "react";
import './Login.css';
import InputWithLabel from "../InputWithLabel/InputWithLabel";
import SubmitButton from "../SubmitButton/SubmitButton";
import HomeLinkLogo from "../HomeLinkLogo/HomeLinkLogo";

const Login = () => {
    return (
      <main className="login">
        <HomeLinkLogo />
        <h1 className="login__title">Рады видеть!</h1>
        <form >
          <div className="login__form">
            <InputWithLabel name='email' label='E-mail' />
            <InputWithLabel name='password' label='Пароль' />
          </div>
          <SubmitButton text='Войти' />
          <div className="login__sign-up-wrapper">
            <p className="login__text">Ещё не зарегистрированы?</p>
            <a href="/signup" className="login__sign-up-button">Регистрация</a>
          </div>
        </form>
      </main>
    )
}

export default Login