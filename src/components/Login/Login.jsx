import React from "react";
import './Login.css';
import loginLogo from "../../images/logo.svg"
import InputWithLabel from "../InputWithLabel/InputWithLabel";
import SubmitButton from "../SubmitButton/SubmitButton";

const Login = () => {
    return (
      <section className="login">
        <img src={loginLogo} alt="" className="login__logo" />
        <h1 className="login__title">Рады видеть!</h1>
        <form >
          <div className="login__form">
            <InputWithLabel name='email' label='E-mail' />
            <InputWithLabel name='password' label='Пароль' />
          </div>
          <SubmitButton text='Войти' />
          <div className="login__sign-up-wrapper">
            <p className="login__text">Ещё не зарегистрированы?</p>
            <a href="" className="login__sign-up-button">Регистрация</a>
          </div>
        </form>
      </section>
    )
}

export default Login