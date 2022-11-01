import React, {useState, useEffect} from "react";
import SearchForm from './SearchForm/SearchForm.js';
import Preloader from './Preloader/Preloader.js';
import MoviesCardList from './MoviesCardList/MoviesCardList.js';
import {moviesApi} from '../../utils/MoviesApi.js';
import Footer from "../Footer/Footer";

function Movies(
    {
        user = {},
        onClickSave = false,
        onClickDelete = false,
        savedMoviesList = [],
    }) {

    const [isDataLoading, setIsDataLoading] = useState(false);
    const [shortMovies, setShortMovies] = useState(false);
    const [filteredMovies, setFilteredMovies] = useState([]);
    const [initialMovies, setInitialMovies] = useState([]);
    const [nothingFound, setNothingFound] = useState(true);
    const [inputValue, setInputValue] = useState(false);
    const [isError, setIsError] = useState(false);


    function filterMovies(movies, request, shortMoviesSwitch) {
        const foundMovies = movies.filter((movie) => {
            return movie.nameRU.toLowerCase().includes(request.toLowerCase());
        });

        if (shortMoviesSwitch) {
            return filterShortMovies(foundMovies);
        } else {
            return foundMovies;
        }
    }

    function handleSetFilteredMovies(movies, request, shortMoviesSwitch) {
        const moviesList = filterMovies(movies, request, shortMoviesSwitch);
        moviesList.length === 0 ? setNothingFound(true) : setNothingFound(false);
        setInitialMovies(moviesList);
        setFilteredMovies(
            shortMoviesSwitch ? filterShortMovies(moviesList) : moviesList
        );
        localStorage.setItem("movies", JSON.stringify(moviesList));
    }

    function handleSearchSubmit(inputValue) {
        setIsDataLoading(true);
        localStorage.setItem("movieSearch", inputValue);
        localStorage.setItem("shortMovies", shortMovies);
        moviesApi
            .getBeatFilm()
            .then((res) => {
                console.log(res)
                handleSetFilteredMovies(res, inputValue, shortMovies);
            })
            .catch((err) => {
                setIsError(true);
                console.log(err);
            })
            .finally(() => setIsDataLoading(false));
    }

    function filterShortMovies(movies) {
        return movies.filter((movie) => movie.duration <= 40);
    }

    function handleShortFilms() {
        setShortMovies(!shortMovies);
        if (!shortMovies) {
            if (filterShortMovies(initialMovies).length === 0) {
                setFilteredMovies(filterShortMovies(initialMovies));
                setNothingFound(true);
            } else {
                setFilteredMovies(filterShortMovies(initialMovies));
                setNothingFound(false);
            }
        } else {
            initialMovies.length === 0
                ? setNothingFound(true)
                : setNothingFound(false);
            setFilteredMovies(initialMovies);
        }
        localStorage.setItem("shortMovies", !shortMovies);
    }

    useEffect(() => {
        if (localStorage.getItem("movieSearch")) {
            setInputValue(localStorage.getItem("movieSearch"));
        }
    }, []);

    useEffect(() => {
        if (localStorage.getItem("shortMovies") === "true") {
            setShortMovies(true);
        } else {
            setShortMovies(false);
        }
    }, [user]);

    useEffect(() => {
        if (localStorage.getItem("movies")) {
            const movies = JSON.parse(localStorage.getItem("movies"));
            movies.length === 0 ? setNothingFound(true) : setNothingFound(false);
            setInitialMovies(movies);
            if (localStorage.getItem("shortMovies") === "true") {
                setFilteredMovies(filterShortMovies(movies));
            } else {
                setFilteredMovies(movies);
            }
        } else {
            setNothingFound(true);
        }
    }, [user]);

    return (
        <>
            <main className='movies'>
                <SearchForm
                    handleSearchSubmit={handleSearchSubmit}
                    checkBoxClick={handleShortFilms}
                    inputValue={inputValue}
                    shortMovies={shortMovies}
                />
                {isDataLoading ? <Preloader/> :
                    <>
                        {isError ?
                            <span id='movies__error' className="movies__error">Во время запроса произошла ошибка. Возможно,
                    проблема с соединением или сервер не доступен. Подождите немного и попробуйте еще раз </span> :
                            <>
                                <MoviesCardList
                                    moviesList={filteredMovies}
                                    nothingFound={nothingFound}
                                    onClickSave={onClickSave}
                                    onClickDelete={onClickDelete}
                                    savedMoviesList={savedMoviesList}
                                    savedMoviesPage={false}
                                />
                            </>
                        }
                    </>
                }
            </main>
            <Footer/>
        </>
    )
}

export default Movies;