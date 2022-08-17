import React from "react";
import SearchForm from "../Movies/SearchForm/SearchForm";
import Preloader from "../Movies/Preloader/Preloader";
import MoviesCardList from "../Movies/MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";

function SavedMovies(props) {

    const saved = true;

    return (
        <div className='movies'>
            {props.children}
            <div className='movies__container'>
                <SearchForm/>
                <MoviesCardList saved={saved}/>
                <Preloader/>
            </div>
            <Footer/>
        </div>
    )
}

export default SavedMovies;

