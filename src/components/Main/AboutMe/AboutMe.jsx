import React from "react";
import './AboutMe.css'
import photo from '../../../images/photo_2024-02-15_21-21-02.jpg'

const AboutMe = () => {
    return (
      <section className="student">
        <h1 className="student__title">Студент</h1>
        <h2 className="student__subtitle">Денис</h2>
        <h2 className="student__description">Фронтенд-разработчик, 27 лет</h2>
        <p className="student__text">Я родился в Санкт-Петербурге, окончил юридический факультет НИУ ВШЭ. Работал по специальности. Однако всегда тяготел к более творческим профессиям. Так я нашёл себя в сфере фронтенд-разработки. Увлекаюсь фотографией и автоспортом.  </p>
        <img src={photo} alt="it`s me" className="student__photo" />
        <a href="https://github.com/borove4ik" className="student__github">Github</a>

      </section>
    )
}

export default AboutMe