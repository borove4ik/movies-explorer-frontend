import React from "react";
import "./LoadMoreButton.css";

const LoadMoreButton = ({loadMore}) => {
 
  return (
    <section className='load-more'>
      <button className="load-more__button" onClick={loadMore} >
        Ещё
      </button>
    </section>
  )
}

export default LoadMoreButton;