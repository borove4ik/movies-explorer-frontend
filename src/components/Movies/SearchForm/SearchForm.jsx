import React from "react";
import './SearchForm.css';
import searchIcon from "../../../images/search.svg"

const SearchForm = () => {
    return(
      <search className="search">
        <form action="" className="search__form">
          <div className="search__input-wrapper"> 
            <input type="search" className="search__input" placeholder="Фильм" />
            <button className="search__button" type="submit">
              <img src={searchIcon} alt="" className="search__icon" />
            </button>
          </div>
          <div className="search__filter">
            <label className="search__switch">
              <input type="checkbox" name="Короткометражки" id="filter" className="search__checkbox"/>
              <span className="search__slider"></span>
            </label>
            <p className="search__filter-text">Короткометражки</p>
          </div>
          
        </form>
      </search>
    )
}

export default SearchForm