import React from "react";
import Header from "../Header/Header"
import AboutProject from '../Main/AboutProject/AboutProject';
import Promo from '../Main/Promo/Promo';
import NavTab from '../Main/NavTab/NavTab';
import Techs from '../Main/Techs/Techs';
import AboutMe from '../Main/AboutMe/AboutMe';
import Portfolio from '../Main/Portfolio/Portfolio';
import Footer from "../Footer/Footer";
import { Routes, Route } from "react-router-dom";

const Main = ({authorised}) => {
  return (
    <>
      <Header authorised={authorised}/> 
      <main className="main">
        <Promo />
        <NavTab />
        <AboutProject />
        <Techs />
        <AboutMe />
        <Portfolio />
      </main>
      <Footer />
    </>
  )

}

export default Main