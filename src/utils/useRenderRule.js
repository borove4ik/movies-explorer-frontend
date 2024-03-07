import React, { useCallback, useState, useEffect } from "react";
import cardConfig from "./cardConfig";

const useRenderRule = () => {
    const [moviesRenderRule, setMoviesRenderRule] = useState({
        cardsTotal: 0
    });

    const handleResolutionChange = useCallback(() => {
        const windowResolution = window.innerWidth;
        if(windowResolution > cardConfig.windowResolution.tablet) {
            setMoviesRenderRule((prev) => ({
                ...prev,  
                cardsTotal: 12
            }))
        } else if (windowResolution<=cardConfig.windowResolution.tablet&&windowResolution>cardConfig.windowResolution.mobile){
          setMoviesRenderRule((prev) => ({
            ...prev,  
            cardsTotal: 8
          }))
        } else if(windowResolution<=cardConfig.windowResolution.mobile) {
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