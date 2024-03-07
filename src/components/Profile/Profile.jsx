import React, { useState } from "react";
import './Profile.css';
import Header from '../Header/Header';
import useFormValidation from '../../hooks/useFormValidation';
import mainApi from "../../utils/MainApi";
import myCn from "../../utils/myCn";

const Profile = ({
  authorised,
  isLoading,
  currentUser,
  setCurrentUser,
  handleSignOut,
}) => {

  const { values, errors, formValid, handleInputChange, resetForm } = useFormValidation();

  const [infoMessage, setInfoMessage] = useState('')


  React.useEffect(() => {
    resetForm({
        email: currentUser.email,
        name: currentUser.name
    }, {}, false)
}, [currentUser, resetForm]);

const getUserName = async () => {
  try {
   const userData = await mainApi.getMe()
   setCurrentUser(userData)
  } catch(err) {
    console.log(err)
  }
}

React.useEffect(() => {
  getUserName()

}, [])

const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const response = await mainApi.updateUser({name: values.name, email: values.email})
    setCurrentUser(response)
    setInfoMessage('Информация обновлена')
  }
  catch(err) {
    setInfoMessage(err)
  }
}

const handleInputChangeWithLoading = (e) => {
  handleInputChange(e);
  if (infoMessage) {
      setInfoMessage('')
  }
}

const isDataChanged = values.name !== currentUser.name || values.email !== currentUser.email;



    return (
      <>
        <Header authorised={authorised} />
        <main className="profile"> 
          <h1 className="profile__title">{`Привет, ${currentUser.name || ""}!`}</h1> 
          <form className="profile__form" onSubmit={handleSubmit}>
            <div className="profile__input-wrapper">  
              <label className="profile__label">Имя</label>
              <input type="text" 
                className="profile__input" name='name' value={values.name || ""}
                onChange={handleInputChangeWithLoading}
                autoComplete="off"
 />           <span className="profile__info-span profile__info-span_error">{errors.name}</span>
            </div>
           
            <div className="profile__input-wrapper profile__input-wrapper_borderless"> 
              <label className="profile__label">E-mail</label>
              <input type="email" className="profile__input" name='email' value={values.email || ""} onChange={handleInputChangeWithLoading}/>
              <span className={myCn('profile__info-span', {'profile__info-span_error': !infoMessage})}>{infoMessage ? infoMessage : errors.email}</span>
            </div>
            <button className='profile__edit' type="submit" disabled={!formValid || !isDataChanged || isLoading}
> {isLoading ? "Сохранение..." : "Редактировать"}
            </button>
          </form>
          <button onClick={handleSignOut} className="profile__sign-out">Выйти из аккаунта</button>
        </main>
       
      </>
       
    )
}

export default Profile