import React from 'react'
import './Preloader.css';
import preloadImage from "../../../images/loader.jpg"

const Preloader = () => {
    return (
      <section className="preloader">
        <div className="preloader__wrapper">
          <img src={preloadImage} className="preloader__image" />
        </div>
      </section>
    )
};

export default Preloader;