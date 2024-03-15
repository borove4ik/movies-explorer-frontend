import React, {useEffect, useState} from "react";
import './SearchForm.css';
import {useLocation} from "react-router-dom";
import searchIcon from "../../../images/search.svg"
import { useFiltersContext } from "../../App/App";

const SearchForm = ({setSearchTouched, setErrorMessage}) => {
    const location = useLocation();
    const locationType = location.pathname === '/movies' ? 'movies' : 'saved-movies';

    const { filters, toggleChecked, setSearchValue } = useFiltersContext();
    const { checked, searchValue } = filters[locationType];
    const searchRef = React.useRef();
    

    const handleSearchMovies = (e) => {
        e.preventDefault();
        setErrorMessage('')
        setSearchTouched(true);
        setSearchValue(locationType, searchRef.current.value)
    }        


    return (
      <search className="search">
        <form action="" onSubmit={handleSearchMovies} className="search__form">
          <div className="search__input-wrapper">
            <input defaultValue={searchValue} ref={searchRef} type="search" className="search__input"
              placeholder="Фильм"
                    />
            <button className="search__button" type="submit">
              <img src={searchIcon} alt="" className="search__icon"/>
            </button>
          </div>
          <div className="search__filter">
            <label className="search__switch">
              <input type="checkbox" name="Короткометражки" id="filter" className="search__checkbox"
                checked={checked} onChange={() => toggleChecked(locationType)}/>
              <span className="search__slider"></span>
            </label>
            <p className="search__filter-text">Короткометражки</p>
          </div>

        </form>
      </search>
    )
}

export default SearchForm