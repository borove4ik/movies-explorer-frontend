import React from "react";
import './AboutProject.css'

const AboutProject = () => {
    return (
      <section className="AboutProject" id="about_project">
        <h2 className="AboutProject__title">О проекте</h2>
        <h3 className="AboutProject__subtitle AboutProject__stages">Дипломный проект включал 5 этапов</h3>
        <p className="AboutProject__text AboutProject__text-stages">Составление плана, работу над бэкендом, вёрстку, 
          добавление функциональности и финальные доработки.</p>
        <h4 className="AboutProject__subtitle AboutProject__time">На выполнение диплома ушло 5 недель</h4>
        <p className="AboutProject__text AboutProject__text-time">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
        <div className="AboutProject__progress-bar">
          <div className="AboutProject__back-end">
            <p className="AboutProject__back-end-timeline">1 неделя</p>
            <p className="AboutProject__underline-text">Back-End</p>
          </div>
          <div className="AboutProject__front-end">
            <p className="AboutProject__front-end-timeline">4 недели</p>
            <p className="AboutProject__underline-text">Front-End</p>
          </div>
        </div>
      </section>
    )
}

export default AboutProject