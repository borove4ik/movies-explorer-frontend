import React from "react";
import './Techs.css'

const Techs = () => {
    return (
      <section className="techs">
        <h1 className="techs__title">Технологии</h1>
        <h2 className="techs__subtitle">7 технологий</h2>
        <p className="techs__text">На курсе веб-разработки мы освоили технологии, 
          которые применили в дипломном проекте.</p>
        <div className="techs__features">
          <p className="techs__feature">HTML</p>
          <p className="techs__feature">CSS</p>
          <p className="techs__feature">JS</p>
          <p className="techs__feature">React</p>
          <p className="techs__feature">Git</p>
          <p className="techs__feature">Express.js</p>
          <p className="techs__feature">mongoDB</p>
        </div>
      </section>
    )
}

export default Techs