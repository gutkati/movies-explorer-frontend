import React from "react";
import SearchForm from "../Movies/SearchForm/SearchForm.js";
import Preloader from "../Movies/Preloader/Preloader.js";
import MoviesCardList from "../Movies/MoviesCardList/MoviesCardList.js";
import Footer from "../Footer/Footer.js";

function SavedMovies(
    {
        user = {},
        onClickDelete = false,
        savedCards = [],
    }) {

    const [inputValue, setInputValue] = React.useState(false);
    const [shortMovies, setShortMovies] = React.useState(false);
    const [nothingFound, setNothingFound] = React.useState(true);
    const [showedMovies, setShowedMovies] = React.useState(savedCards);
    const [filteredMovies, setFilteredMovies] = React.useState(showedMovies);

    function filterMovies(movies, request, shortMoviesSwitch) {
        const foundMovies = movies.filter((movie) => {
            return movie.nameRU.toLowerCase().includes(request.toLowerCase())
        });

        if (shortMoviesSwitch) {
            return filterShortMovies(foundMovies);
        } else {
            return foundMovies;
        }
    };

    function filterShortMovies(movies) {
        return movies.filter((movie) => movie.duration <= 40);
    };

    function handleSearchSubmit(inputValue) {
        localStorage.setItem('savedMoviesSearch', inputValue);
        if (filterMovies(savedCards, inputValue, shortMovies).length === 0) {
            setNothingFound(true)
        } else {
            setNothingFound(false)
            setFilteredMovies(filterMovies(savedCards, inputValue, shortMovies))
            setShowedMovies(filterMovies(savedCards, inputValue, shortMovies))
            localStorage.setItem('savedMovies', JSON.stringify(savedCards));
        }
    }

    function handleShortFilms() {
        if (!shortMovies) {
            setShortMovies(true)
            localStorage.setItem('shortSavedMovies', true);
            setShowedMovies(filterShortMovies(filteredMovies));
            filterShortMovies(filteredMovies).length === 0 ? setNothingFound(true) : setNothingFound(false)
        } else {
            setShortMovies(false)
            localStorage.setItem('shortSavedMovies', false);
            filteredMovies.length === 0 ? setNothingFound(true) : setNothingFound(false)
            setShowedMovies(filteredMovies)
        }
    }

    React.useEffect(() => {
        if (localStorage.getItem('savedMoviesSearch')) {
            setInputValue(localStorage.getItem('savedMoviesSearch'));
        }
    }, []);

    React.useEffect(() => {
        if (localStorage.getItem('shortSavedMovies') === 'true') {
            setShortMovies(true)
            setShowedMovies(filterShortMovies(savedCards))
        } else {
            setShortMovies(false)
            setShowedMovies(savedCards)
        }
    }, [savedCards, user]);

    React.useEffect(() => {
        if (savedCards.length !== 0) {
            setNothingFound(false)
        } else {
            setNothingFound(true)
        }
    }, [savedCards])


    // const saved = true;

    return (
        <main className='movies'>
            <div className='movies__container'>
                <SearchForm
                    handleSearchSubmit={handleSearchSubmit}
                    checkBoxClick={handleShortFilms}
                    shortMovies={shortMovies}
                    inputValue={inputValue}
                />
                <MoviesCardList
                    nothingFound={nothingFound}
                    moviesList={showedMovies}
                    onClickDelete={onClickDelete}
                    onSaveClick={false}
                    savedMoviesPage={true}
                    savedCards={savedCards}
                />
                {/*<Preloader/>*/}
            </div>
        </main>
    )
}

export default SavedMovies;

