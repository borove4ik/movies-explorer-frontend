import React from "react";
import './MenuButton.css'
import burgerLines from "../../../images/burger.svg"

const MenuButton = ({clickFunction}) => {
    return (
      <>
        <button className="menu-button" type="button" onClick={clickFunction}>
          <img src={burgerLines} alt="открыть меню" className="menu-button__icon" />
        </button>
      </>
    )
}

export default MenuButton