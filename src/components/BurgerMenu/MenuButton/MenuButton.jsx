import React from "react";
import './MenuButton.css'
import burgerLines from "../../../images/burger.svg"

const MenuButton = () => {
    return (
      <>
        <button className="menu-button">
          <img src={burgerLines} alt="" className="menu-button__icon" />
        </button>
      </>
    )
}

export default MenuButton