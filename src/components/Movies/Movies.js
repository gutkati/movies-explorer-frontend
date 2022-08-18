import React from "react";
import Header from '../Header/Header.js';
import SearchForm from './SearchForm/SearchForm.js';
import Preloader from './Preloader/Preloader.js';
import MoviesCardList from './MoviesCardList/MoviesCardList.js';
import Footer from "../Footer/Footer";

function Movies(props) {
    return (
        <div className='movies'>
            {props.children}

                <SearchForm />
                <Preloader />
                <MoviesCardList />

             <Footer />
        </div>
    )
}

export default Movies;