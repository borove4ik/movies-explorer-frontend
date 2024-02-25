import React from "react";
import './NavTab.css'

const NavTab = () => {
    return (
      <section className="NavTab">
        <a href="#about_project">        
          <button className="NavTab__button">О проекте</button>
        </a>
        <a href="#techs">        
          <button className="NavTab__button">Технологии</button>
        </a>
        <a href= "#about_me">
          <button className="NavTab__button">Студент</button>
        </a>
        
      </section>      
    )
}

export default NavTab