import React from "react";
import './MoviesCard.css';
import likeButton from "../../../images/like.svg"
import deleteButton from "../../../images/delete_movie.svg"
import likedIcon from "../../../images/like-active.svg"

const MoviesCard = ({imageLink, title, duration, isCardSaved, isCardliked}) => {
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
        <img src={imageLink} alt="" className="card__image" />
        <div className="card__info">
          <p className="card__title">{title}</p>
          <button className="card__button"
          >
            <img src={buttonIcon} alt="like" className="card__button-icon" />
          </button>
          <p className="card__duration">{duration}</p>
        </div>
      </div>
    )
}

export default MoviesCard