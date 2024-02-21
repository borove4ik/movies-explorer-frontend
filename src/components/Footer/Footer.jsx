import React from "react";
import './Footer.css'

const Footer = () => {
    return (
      <footer className="footer">
        <h2 className="footer__title">Учебный проект Яндекс.Практикум х BeatFilm.</h2>
        <p className="footer__copyright">© 2024</p>
        <a href="https://practicum.yandex.ru/" className="footer__link">Яндекс.Практикум</a>
        <a href="https://github.com/borove4ik" className="footer__link footer__github-link">Github</a>
      </footer>
    )
}

export default Footer