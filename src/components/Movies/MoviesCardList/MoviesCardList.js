import React from "react";

import MoviesCard from "../MoviesCard/MoviesCard";

function MoviesCardList({saved}) {

    return (
        <div className='moviesCardList'>
            <div className='moviesCardList__container'>
                <ul className='moviesCardList__cards'>
                    <MoviesCard saved={saved}/>
                    <MoviesCard saved={saved}/>
                    <MoviesCard saved={saved}/>
                    <MoviesCard saved={saved}/>
                    <MoviesCard saved={saved}/>
                    <MoviesCard saved={saved}/>
                    <MoviesCard saved={saved}/>
                    <MoviesCard saved={saved}/>
                    <MoviesCard saved={saved}/>
                    <MoviesCard saved={saved}/>
                    <MoviesCard saved={saved}/>
                    <MoviesCard saved={saved}/>
                </ul>
                <button className={`moviesCardList__btn ${saved ? 'moviesCardList__btn_hidden' : ""}`}>Ещё</button>
            </div>
        </div>
    )
}

export default MoviesCardList;