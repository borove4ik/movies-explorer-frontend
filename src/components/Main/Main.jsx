import React from "react";
import Footer from "../Footer/Footer";
import Header from "../Header/Header"
import AboutMe from '../Main/AboutMe/AboutMe';
import AboutProject from '../Main/AboutProject/AboutProject';
import NavTab from '../Main/NavTab/NavTab';
import Portfolio from '../Main/Portfolio/Portfolio';
import Promo from '../Main/Promo/Promo';
import Techs from '../Main/Techs/Techs';

const Main = () => {
    return (
      <>
        <Header/>
        <main className="main">
          <Promo/>
          <NavTab/>
          <AboutProject/>
          <Techs/>
          <AboutMe/>
          <Portfolio/>
        </main>
        <Footer/>
      </>
    )

}

export default Main