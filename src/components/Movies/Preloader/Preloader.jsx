import React from "react";
import "./Preloader.css";

const Preloader = ({loadMore}) => {

  return (
    <section className='preloader'>
      <button className="preloader__load" onClick={loadMore} >
        Ещё
      </button>
    </section>
  )
}

export default Preloader;