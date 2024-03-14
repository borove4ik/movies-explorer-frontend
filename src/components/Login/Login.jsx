import React, {useState, useEffect} from "react";
import './Login.css';
import {useNavigate} from "react-router-dom";
import useFormValidation from "../../hooks/useFormValidation";
import mainApi from "../../utils/MainApi";
import HomeLinkLogo from "../HomeLinkLogo/HomeLinkLogo";
import InputWithLabel from "../InputWithLabel/InputWithLabel";
import SubmitButton from "../SubmitButton/SubmitButton";

const Login = ({setAuthorised, authorised}) => {
  const navigate = useNavigate()
    useEffect(()=>{
      authorised && navigate('/')
    })
    const [loginErr, setLoginErr] = useState('')
    const [isUploading, setIsUploading] = useState(false);
    const {values, errors, handleInputChange} = useFormValidation();

    const handleLogin = async (email, password) => {
        setLoginErr('');
        setIsUploading(true);

        try {
            if (!email || !password) {
                return;
            }

            const response = await mainApi.login({email, password});

            if (!localStorage.getItem('authorised')) {
                localStorage.setItem('authorised', 'true');
            }

            setAuthorised(true)
            response ? navigate('/movies') : console.log('ошибка при входе')
        } catch (err) {
            setLoginErr(`${err}`)
        }
        setIsUploading(false)
    }

    const handleChangeWithLoading = (e) => {
        handleInputChange(e);
        if (loginErr) {
            setLoginErr('')
        }
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        handleLogin(values.email, values.password)
    }
    return (
      <main className="login">
        <HomeLinkLogo/>
        <h1 className="login__title">Рады видеть!</h1>
        <form onSubmit={handleSubmit}>
          <div className="login__form">
            <InputWithLabel disabled={isUploading} values={values} errors={errors.email}
              handleChangeWithLoading={handleChangeWithLoading} name='email' label='E-mail'/>
            <InputWithLabel disabled={isUploading} values={values} errors={errors.password}
              handleChangeWithLoading={handleChangeWithLoading} name='password' type='password'
              label='Пароль'/>
            <span className="form-error-message">{loginErr}</span>
          </div>
          <SubmitButton disabled={isUploading} text='Войти'/>
          <div className="login__sign-up-wrapper">
            <p className="login__text">Ещё не зарегистрированы?</p>
            <a href="/signup" className="login__sign-up-button">Регистрация</a>
          </div>
        </form>
      </main>
    )
}

export default Login