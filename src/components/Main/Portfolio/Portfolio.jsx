import React from "react";
import './Portfolio.css';
import arrow from '../../../images/arrow.svg'

const Portfolio = () => {
    return (
      <section className="portfolio">
        <h1 className="portfolio__title">Портфолио</h1>
        <a className="portfolio__link" href="https://github.com/borove4ik/how-to-learn">
          <p className="portfolio__link-text">Статичный сайт</p>
          <img src={arrow} alt="link-icon" className="portfolio__link-icon" /> 
        </a>
        <a className="portfolio__link" href="https://github.com/borove4ik/russian-travel">
          <p className="portfolio__link-text">Адаптивный сайт</p>
          <img src={arrow} alt="link-icon" className="portfolio__link-icon" /> 
        </a>
        <a className="portfolio__link portfolio__link_borderless" href="https://github.com/borove4ik/react-mesto-api-full-gha">
          <p className="portfolio__link-text">Одностраничное приложение</p>
          <img src={arrow} alt="link-icon" className="portfolio__link-icon" />  
        </a>
      </section>
    )
}

export default Portfolio