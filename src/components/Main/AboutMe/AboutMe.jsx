import React from "react";
import './AboutMe.css'
import photo from '../../../images/photo_2024-02-15_21-21-02.jpg'

const AboutMe = () => {
    return (
      <section className="student" id='about_me'>
        <h2 className="student__title">Студент</h2>
        <div className="student__info"> 
          <h3 className="student__subtitle">Денис</h3>
          <h4 className="student__description">Фронтенд-разработчик, 27 лет</h4>
          <p className="student__text">Я родился в Санкт-Петербурге, окончил юридический факультет НИУ ВШЭ. Работал по специальности. Однако всегда тяготел к более творческим профессиям. Так я нашёл себя в сфере фронтенд-разработки. Увлекаюсь фотографией и автоспортом.</p>
        </div>
        <img src={photo} alt="фотография" className="student__photo" />
        <a href="https://github.com/borove4ik" className="student__github" target="_blank" rel="noreferrer">Github</a>
      </section>
    )
}

export default AboutMe