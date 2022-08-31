import React, {useState} from "react";
import {useLocation} from "react-router-dom"

function MoviesCard(
    {
        saved = false,
        card = {},
        onClickSave = false,
        onClickDelete = false,
        savedMoviesPage = false,

    }) {

    const [isLiked, setIsLiked] = useState(false);

    const {pathname} = useLocation();

    function handleClickSave() {
        onClickSave(card);
    }

    function handleClickDelete() {
        onClickDelete(card);
    }

    function transferToHouse(duration) {
        return `${Math.floor(duration / 60)}ч ${duration % 60}м`;
    }

    return (
        <div className='moviesCard'>
            <div className='moviesCard__container'>
                <div className='moviesCard__info'>
                    <h3 className='moviesCard__title'>{card.nameRU}</h3>
                    <p className='moviesCard__time'>{transferToHouse(card.duration)}</p>
                </div>
                {!savedMoviesPage ? (
                    <button
                    className={saved ? "moviesCard__like-active" : "moviesCard__like"}
                    type='button'
                    aria-label='нравится'
                    onClick={saved ? handleClickDelete : handleClickSave}
                />
                ) : (
                    <button
                    className="moviesCard__delete"
                    type='button'
                    aria-label='нравится'
                    onClick={handleClickDelete}
                />)}

            </div>
            <a className='moviesCard__image-link' href={card.trailerLink}>
                <img className='moviesCard__image'
                    src={`${saved ? card.image : `http://api.nomoreparties.co${card.image.formats.thumbnail.url}`}`}
                    alt={card.nameRU}/>
            </a>
        </div>
    )
}

export default MoviesCard;