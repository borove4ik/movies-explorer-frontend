import React from "react";
import './HomeLinkLogo.css'
import HomeLogo from "../../images/logo.svg";
import { NavLink } from "react-router-dom";

const HomeLinkLogo = () => {
    return (
      <NavLink to="/" className='test-link'>
        <img src={HomeLogo} alt="логотип"  className="home-link-logo"
      />
      </NavLink>
    )
}

export default HomeLinkLogo