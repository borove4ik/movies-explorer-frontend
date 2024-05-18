import React, {useEffect, useState} from "react";
import useFormValidation from '../../hooks/useFormValidation';
import mainApi from "../../utils/MainApi";
import myCn from "../../utils/myCn";
import AuthRoute from "../AuthRoute/AuthRoute";
import Header from '../Header/Header';
import './Profile.css';

const Profile = ({
                     isLoading,
                     currentUser,
                     setCurrentUser,
                     handleSignOut,
                 }) => {

    const {values, errors, formValid, handleInputChange, resetForm} = useFormValidation();
    const [infoMessage, setInfoMessage] = useState('')
    const [isUploading, setIsUploading] = useState(false);


    useEffect(() => {
        resetForm({
            email: currentUser.email,
            name: currentUser.name
        }, {}, false)
    }, [currentUser, resetForm]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsUploading(true)

        try {
            const response = await mainApi.updateUser({name: values.name, email: values.email})
            setCurrentUser(response)
            setInfoMessage('Информация обновлена')
        } catch (err) {
            setInfoMessage(err)
        }
        setIsUploading(false)
    }

    const handleInputChangeWithLoading = (e) => {
        handleInputChange(e);
        if (infoMessage) {
            setInfoMessage('')
        }
    }

    const isDataChanged = values.name !== currentUser.name || values.email !== currentUser.email;

    return (
      <AuthRoute>
        <Header/>
        <main className="profile">
          <h1 className="profile__title">{`Привет, ${currentUser.name || ""}!`}</h1>
          <form className="profile__form" onSubmit={handleSubmit}>
            <div className="profile__input-wrapper">
              <label className="profile__label">Имя</label>
              <input type="text" className="profile__input" disabled={isUploading} name='name'
                value={values.name || ""} onChange={handleInputChangeWithLoading} autoComplete="off"
                        /> <span className="profile__info-span profile__info-span_error">{errors.name}</span>
            </div>

            <div className="profile__input-wrapper profile__input-wrapper_borderless">
              <label className="profile__label">E-mail</label>
              <input type="email" className="profile__input" disabled={isUploading} name='email'
                value={values.email || ""} onChange={handleInputChangeWithLoading}/>
              <span
                className={myCn('profile__info-span', {'profile__info-span_error': !infoMessage})}>{infoMessage ? infoMessage : errors.email}</span>
            </div>
            <button className='profile__edit' type="submit" disabled={!formValid || !isDataChanged || isLoading}
                    > {isLoading ? "Сохранение..." : "Редактировать"}
            </button>
          </form>
          <button onClick={handleSignOut} className="profile__sign-out">Выйти из аккаунта</button>
        </main>
      </AuthRoute>
    )
}

export default Profile