import React from "react";
import './AboutProject.css'

const AboutProject = () => {
    return (
      <>
        <section className="AboutProject">
          <h1 className="AboutProject__title">О проекте</h1>
          <h2 className="AboutProject__subtitle AboutProject__stages">Дипломный проект включал 5 этапов</h2>
          <p className="AboutProject__text AboutProject__text-stages">Составление плана, работу над бэкендом, вёрстку, 
            добавление функциональности и финальные доработки.</p>
          <h2 className="AboutProject__subtitle AboutProject__time">На выполнение диплома ушло 5 недель</h2>
          <p className="AboutProject__text AboutProject__text-time">Составление плана, работу над бэкендом, вёрстку, 
            добавление функциональности и финальные доработки.</p>
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
      </>
    )
}

export default AboutProject