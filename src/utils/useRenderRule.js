import React, { useCallback, useState, useEffect } from "react";
import CardConfig from "./CardConfig";

const useRenderRule = () => {
    const [moviesRenderRule, setMoviesRenderRule] = useState({
        cardsTotal: 0
    });

    const handleResolutionChange = useCallback(() => {
        const windowResolution = window.innerWidth;
        if(windowResolution > CardConfig.windowResolution.tablet) {
            setMoviesRenderRule((prev) => ({
                ...prev,  
                cardsTotal: 12
            }))
        } else if (windowResolution<=CardConfig.windowResolution.tablet&&windowResolution>CardConfig.windowResolution.mobile){
          setMoviesRenderRule((prev) => ({
            ...prev,  
            cardsTotal: 8
          }))
        } else if(windowResolution<=CardConfig.windowResolution.mobile) {
          setMoviesRenderRule((prev) => ({
            ...prev,  
            cardsTotal: 5
          }))
        }
    }, [])
    useEffect(()=>{
      handleResolutionChange()
      window.addEventListener('resize', handleResolutionChange);

      return()=>{
        window.removeEventListener('resize', handleResolutionChange);
      };
    }, [handleResolutionChange])

    return {moviesRenderRule, setMoviesRenderRule};

}

export default useRenderRule