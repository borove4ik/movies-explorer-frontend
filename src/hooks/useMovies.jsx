import useRenderRule from "../hooks/useRenderRule";
import CardConfig from "../utils/CardConfig";

const useMovies = () => {
    const {moviesRenderRule, setMoviesRenderRule, resetMovies} = useRenderRule();

    const handleShowMore = () => {
        const windowSize = window.innerWidth;

        if (windowSize > CardConfig.windowResolution.tablet) {
            setMoviesRenderRule({
                ...moviesRenderRule,
                cardsTotal: moviesRenderRule.cardsTotal + 3
            })
        }

        if (windowSize <= CardConfig.windowResolution.tablet) {
            setMoviesRenderRule({
                ...moviesRenderRule,
                cardsTotal: moviesRenderRule.cardsTotal + 2
            })
        }
    }

    return {moviesRenderRule, handleShowMore, resetMovies}
}

export default useMovies;