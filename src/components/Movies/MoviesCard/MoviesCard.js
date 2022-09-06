import React, {useState} from "react";
import {useLocation} from "react-router-dom"

function MoviesCard(
    {
        movie = {},
        saved,
        onClickSave,
        onClickDelete,
        savedMoviesPage,

    }) {

    const [isLiked, setIsLiked] = useState(false);

    const {pathname} = useLocation();

    function handleClickSave() {
        onClickSave(movie);
    }

    function handleClickDelete() {
        onClickDelete(movie);
    }

    function transferToHouse(duration) {
        return `${Math.floor(duration / 60)}ч ${duration % 60}м`;
    }

    return (
        <div className='moviesCard'>
            <div className='moviesCard__container'>
                <div className='moviesCard__info'>
                    <h3 className='moviesCard__title'>{movie.nameRU}</h3>
                    <p className='moviesCard__time'>{transferToHouse(movie.duration)}</p>
                </div>
                {!savedMoviesPage ? (
                    <button
                        onClick={saved ? handleClickDelete : handleClickSave}
                        className={saved
                            ? "moviesCard__like moviesCard__like_type_active"
                            : "moviesCard__like moviesCard__like_type_disabled"}
                    />
                ) : (
                    <button
                        className="moviesCard__like moviesCard__like_type_delete"
                        type='button'
                        aria-label='нравится'
                        onClick={handleClickDelete}
                    />)}

            </div>
            <a className='moviesCard__image-link' href={movie.trailerLink} target='blank'>
                <img className='moviesCard__image'
                     src={pathname === '/saved-movies' ?
                         `${movie.image}` : `http://api.nomoreparties.co${movie.image.formats.thumbnail.url}`}
                     alt={movie.nameRU}/>
            </a>
        </div>
    )
}

export default MoviesCard;