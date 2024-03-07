import React from "react";
import './Login.css';
import InputWithLabel from "../InputWithLabel/InputWithLabel";
import SubmitButton from "../SubmitButton/SubmitButton";
import HomeLinkLogo from "../HomeLinkLogo/HomeLinkLogo";
import useFormValidation from "../../hooks/useFormValidation";
import mainApi from "../../utils/MainApi";
import { useNavigate } from "react-router-dom";

const Login = ({setAuthorised}) => {

  const navigate=useNavigate()
  const [loginErr, setLoginErr] = React.useState('')
  
  const { formValid, values, errors, resetForm, handleInputChange } = useFormValidation();

  const handleLogin = async (email, password) => {
    setLoginErr('');
    try {
      if(!email || !password){
        return
      }
      const response = await mainApi.login({email: email, password: password});
      if(!localStorage.getItem('authorised')){
        localStorage.setItem('authorised', true )
      }
      setAuthorised(true)
      response ? navigate('/movies') : console.log('ошибка при входе')
    }
    catch(err) {
      setLoginErr(`${err}`)
    }
  }

  const handleChangeWithLoading = (e) => {
    handleInputChange(e);
    if(loginErr){
      setLoginErr('')
    }
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin(values.email, values.password)
  }
    return (
      <main className="login">
        <HomeLinkLogo />
        <h1 className="login__title">Рады видеть!</h1>
        <form onSubmit={handleSubmit}>
          <div className="login__form">
            <InputWithLabel values={values} errors={errors.email} handleChangeWithLoading={handleChangeWithLoading} name='email' label='E-mail' />
            <InputWithLabel values={values} errors={errors.password} handleChangeWithLoading={handleChangeWithLoading}name='password' label='Пароль' />
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