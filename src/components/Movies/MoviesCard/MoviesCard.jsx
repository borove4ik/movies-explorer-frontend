import React from "react";
import './MoviesCard.css';
import likeButton from "../../../images/like.svg"
import deleteButton from "../../../images/delete_movie.svg"
import likedIcon from "../../../images/like-active.svg"

const MoviesCard = ({imageLink, title, duration, isCardSaved, isCardliked, altText}) => {
  let buttonIcon

  if(isCardSaved) {
     buttonIcon = deleteButton
  }
  else if(isCardliked) {
   buttonIcon = likedIcon
  } else {
    buttonIcon = likeButton
  }

    return (
      <div className="card">
        <img src={imageLink} alt={altText} className="card__image" />
        <div className="card__info">
          <h2 className="card__title">{title}</h2>
          <button className="card__button"
          >
            <img src={buttonIcon} alt="лайк" className="card__button-icon" />
          </button>
          <p className="card__duration">{duration}</p>
        </div>
      </div>
    )
}

export default MoviesCard