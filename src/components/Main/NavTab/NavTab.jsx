import React from "react";
import './NavTab.css'

const NavTab = () => {
    return (
      <>
        <section className="NavTab">
          <button className="NavTab__button">О проекте</button>
          <button className="NavTab__button">Технологии</button>
          <button className="NavTab__button">Студент</button>
        </section>      
      </>
    )
}

export default NavTab