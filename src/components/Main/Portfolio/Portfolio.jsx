import React from "react";
import './Portfolio.css';
import arrow from '../../../images/arrow.svg'

const Portfolio = () => {
    return (
      <section className="portfolio">
        <h2 className="portfolio__title">Портфолио</h2>
        <ul>
          <li> 
            <a className="portfolio__link" href="https://github.com/borove4ik/how-to-learn" target="_blank" rel="noreferrer">
              <p className="portfolio__link-text">Статичный сайт</p>
              <img src={arrow} alt="иконка ссылки" className="portfolio__link-icon" /> 
            </a>
          </li>
          <li>
            <a className="portfolio__link" href="https://github.com/borove4ik/russian-travel" target="_blank" rel="noreferrer">
              <p className="portfolio__link-text">Адаптивный сайт</p>
              <img src={arrow} alt="иконка ссылки" className="portfolio__link-icon" /> 
            </a>
          </li>
          <li>
            <a className="portfolio__link portfolio__link_borderless" href="https://github.com/borove4ik/react-mesto-api-full-gha" target="_blank" rel="noreferrer">
              <p className="portfolio__link-text">Одностраничное приложение</p>
              <img src={arrow} alt="иконка ссылки" className="portfolio__link-icon" />  
            </a>
          </li>
        </ul>
        
      </section>
    )
}

export default Portfolio