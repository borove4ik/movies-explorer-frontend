import React from 'react';
import './App.css';
import AboutProject from '../Main/AboutProject/AboutProject';
import Promo from '../Main/Promo/Promo';
import NavTab from '../Main/NavTab/NavTab';
import Techs from '../Main/Techs/Techs';
import AboutMe from '../Main/AboutMe/AboutMe';
import Portfolio from '../Main/Portfolio/Portfolio';



function App() {
  return (
    <div className="App">
      <Promo/>
      <NavTab/>
      <AboutProject/>
      <Techs/>
      <AboutMe/>
      <Portfolio/>
    </div>
  );
}

export default App;
