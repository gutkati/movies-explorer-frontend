import React, {useState} from "react";
import film1 from '../../../images/film-1.png'
import {CurrentUserContext} from "../../../contexts/curentUserContext.js";


function MoviesCard({saved}) {

    const currentUser = React.useContext(CurrentUserContext);
    const [isLiked, setIsLiked] = useState(false);

    function handleCardLike() {
        setIsLiked(true)
    }

    const cardLikeButtonClassName = `moviesCard__like ${ isLiked ? "moviesCard__like-active" : ""} ${ saved ? "moviesCard__delete" : ""}`;

    return (
        <div className='moviesCard'>
            <div className='moviesCard__container'>
                <div className='moviesCard__info'>
                    <h3 className='moviesCard__title'>33 слова о дизайне</h3>
                    <p className='moviesCard__time'>1ч 47м</p>
                </div>
                <button
                    className={cardLikeButtonClassName}
                    type='button'
                    aria-label='нравится'
                    onClick={handleCardLike}
                />
            </div>
            <img className='moviesCard__image' src={film1} alt='Обложка фильма' />
        </div>
    )
}

export default MoviesCard;