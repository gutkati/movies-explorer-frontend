import React from "react";
import MoviesCard from "../MoviesCard/MoviesCard.js";
import {
    WIDTH_SCREEN_DESKTOP,
    WIDTH_SCREEN_TABLET,
    WIDTH_SCREEN_MOBILE,
    QUANTITY_CARDS_DESKTOP,
    QUANTITY_CARDS_TABLET,
    QUANTITY_CARDS_MOBILE,
} from "../../../utils/constants";

function MoviesCardList(
    {
        moviesList = [],
        nothingFound = true,
        onClickSave = false,
        onClickDelete = false,
        savedMoviesList = [],
        savedMoviesPage = false,
    }) {

    const [movieList, setMovieList] = React.useState([]);
    const [cardsShowDetails, setCardsShowDetails] = React.useState({
        QUANTITY_CARDS_DESKTOP
    });
    const [isMount, setIsMount] = React.useState(true);
    const getScreenWidth = React.useCallback(() => window.innerWidth, []);
    const [screenWidth, setScreenWidth] = React.useState(getScreenWidth());
    const moviesCount = {
        bigScreen: {width: WIDTH_SCREEN_DESKTOP, cards: QUANTITY_CARDS_DESKTOP},
        normalScreen: {width: WIDTH_SCREEN_TABLET, cards: QUANTITY_CARDS_TABLET},
        smallScreen: {width: WIDTH_SCREEN_MOBILE, cards: QUANTITY_CARDS_MOBILE},
    };

    React.useEffect(() => {
        function handleScreenResize() {
            setScreenWidth(getScreenWidth());
        }

        window.addEventListener("resize", resizeController, false);
        let resizeTimer;

        function resizeController() {
            if (!resizeTimer) {
                resizeTimer = setTimeout(() => {
                    resizeTimer = null;
                    handleScreenResize();
                }, 1000);
            }
        }

        return () => window.removeEventListener("resize", handleScreenResize);
    }, [getScreenWidth]);

    React.useEffect(() => {
        if (screenWidth >= moviesCount.bigScreen.width) {
            setCardsShowDetails(moviesCount.bigScreen.cards);
        } else if (
            screenWidth <= moviesCount.bigScreen.width &&
            screenWidth > moviesCount.normalScreen.width
        ) {
            setCardsShowDetails(moviesCount.normalScreen.cards);
        } else {
            setCardsShowDetails(moviesCount.smallScreen.cards);
        }
        return () => setIsMount(false);
    }, [
        screenWidth,
        isMount,
    ]);

    function handleClickElse() {
        const start = movieList.length;
        const end = start + cardsShowDetails.extra;
        const additional = moviesList.length - start;

        if (additional > 0) {
            const newCards = moviesList.slice(start, end);
            setMovieList([...movieList, ...newCards]);
        }
    }

    React.useEffect(() => {
        if (moviesList.length) {
            const res = moviesList.filter((item, i) => i < cardsShowDetails.total);
            setMovieList(res);
        }
    }, [
        moviesList,
        savedMoviesPage,
        cardsShowDetails.total
    ]);

    function getSavedMovieCard(savedMoviesList, movie) {
        return savedMoviesList.find(
            (savedMovie) => savedMovie.movieId === movie.id
        );
    }

    return (
        <div className='moviesCardList'>
            <div className='moviesCardList__container'>
                <>
                    {nothingFound ? (
                        <p className='moviesCardList__notFound'>Ничего не найдено</p>
                    ) : (
                        <>
                            <div className='moviesCardList__cards'>
                                {
                                    movieList.map((movie) => (
                                        <MoviesCard
                                            saved={getSavedMovieCard(savedMoviesList, movie)}
                                            movie={movie}
                                            key={movie.id || movie._id}
                                            onClickSave={onClickSave}
                                            onClickDelete={onClickDelete}
                                            savedMoviesPage={savedMoviesPage}
                                        />
                                    ))
                                }
                            </div>
                            {movieList.length >= 5 &&
                            movieList.length < moviesList.length ? (
                                <div className="moviesCardList__else">
                                    <button
                                        className="moviesCardList__button"
                                        onClick={handleClickElse}
                                    >
                                        Ещё
                                    </button>
                                </div>
                            ) : (
                                ""
                            )}
                        </>
                    )}

                </>
            </div>
        </div>
    )
}

export default MoviesCardList;