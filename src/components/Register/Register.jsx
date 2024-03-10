import React from "react";
import './Register.css'
import InputWithLabel from "../InputWithLabel/InputWithLabel";
import SubmitButton from "../SubmitButton/SubmitButton";
import HomeLinkLogo from "../HomeLinkLogo/HomeLinkLogo";
import useFormValidation from "../../hooks/useFormValidation"
import mainApi from "../../utils/MainApi";
import {useNavigate} from 'react-router-dom';

const Register = ({authorised, setAuthorised}) => {
  const navigate=useNavigate()
  const [regErr, setRegErr] = React.useState('')

  const { formValid, values, errors, resetForm, handleInputChange } = useFormValidation();
  const [isUploading, setIsUploading] = React.useState(false);
  

  const handleRegister = async (name, email, password)=>{
    setRegErr('');
    setIsUploading(true)
    try {
      if (!name||!email||!password){
        return
      }
      let response = await mainApi.register({name: name, email: email, password: password});
      response = await mainApi.login({email: email, password: password})
      if(!localStorage.getItem('authorised')){
        localStorage.setItem('authorised', true )
      }
      setAuthorised(true)
      response ? navigate('/movies') : console.log('ошибка во время обработки регистрации')
    }
    catch(err) {
      setRegErr(`${err}`)
    }
    setIsUploading(false)
  }
  const handleChangeWithLoading = (e) => {
    handleInputChange(e);
    if(regErr){
      setRegErr('')
    }
  }

  if (authorised) {
      navigate('/')
    }

  const handleSubmit = (e) => {
    e.preventDefault();
    handleRegister(values.name, values.email, values.password)
  }

    return (
      <main className="register">
        <HomeLinkLogo />
        <h1 className="register__title">Добро пожаловать!</h1>
        <form onSubmit={handleSubmit}>
          <div className="register__form">
            <InputWithLabel disabled={isUploading} values={values} errors={errors.name} handleChangeWithLoading={handleChangeWithLoading} name='name' label='Имя' />
            <InputWithLabel disabled={isUploading} values={values} errors={errors.email} handleChangeWithLoading={handleChangeWithLoading} name='email' label='E-mail' />
            <InputWithLabel disabled={isUploading} type="password" values ={values} regErr={regErr} errors={errors.password} handleChangeWithLoading={handleChangeWithLoading} name='password' label='Пароль' />
            <span className="form-error-message">{regErr}</span>
          </div>
          <SubmitButton disabled={isUploading} text='Зарегистрироваться' />
          <div className="register__sign-in-wrapper">
            <p className="register__text">Уже зарегистрированы?</p>
            <a href="/signin" className="register__sign-in-button">Войти</a>
          </div>
        </form>
      </main>
    )
}

export default Register