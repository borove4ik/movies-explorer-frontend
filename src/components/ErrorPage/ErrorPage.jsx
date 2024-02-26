import React from "react";
import './ErrorPage.css';
import { useNavigate } from "react-router-dom";

const ErrorPage = () => {
const navigate = useNavigate()
  const goBack = () => {
    navigate(-1)
  }

    return (
      <main className="error-page">
        <div className="error-page__message-wrapper">
          <h1 className="error-page__status">404</h1>
          <h2 className="error-page__message">Страница не найдена</h2>
        </div>
        <button className="error-page__button" type="button" onClick={goBack}>Назад</button>
      </main>
    )
}

export default ErrorPage