import React from "react";
import './Techs.css'

const Techs = () => {
    return (
      <section className="techs" id="techs">
        <h2 className="techs__title">Технологии</h2>
        <h3 className="techs__subtitle">7 технологий</h3>
        <p className="techs__text">На курсе веб-разработки мы освоили технологии, 
          которые применили в дипломном проекте.</p>
        <ul className="techs__features">
          <li className="techs__feature">HTML</li>
          <li className="techs__feature">CSS</li>
          <li className="techs__feature">JS</li>
          <li className="techs__feature">React</li>
          <li className="techs__feature">Git</li>
          <li className="techs__feature">Express.js</li>
          <li className="techs__feature">mongoDB</li>
        </ul>
      </section>
    )
}

export default Techs