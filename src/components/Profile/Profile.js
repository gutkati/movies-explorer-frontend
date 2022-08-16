import React, {useState, useRef} from "react";
import {NavLink} from "react-router-dom";
import SubmitButton from "../SubmitBatton/SubmitButton";

function Profile(props) {
    const disabled = false;
    const [active, setActive] = useState(false);
    const [name, setName] = useState('Виталий');
    const [email, setEmail] = useState('pochta@yandex.ru');
    const nameInput = useRef();
    const emailInput = useRef();

    const emailChange = (e) => {
        setEmail(e.target.value);
    }

    const nameChange = (e) => {
        setName(e.target.value);
    }

    function editProfile() {
        setActive(true)
        nameInput.current.removeAttribute('disabled');
        emailInput.current.removeAttribute('disabled');
    }

    return (
        <div className='profile'>
            {props.children}
            <div className='profile__container'>
                <h2 className='profile__title'>Привет, Виталий</h2>
                <form className='profile__form'>
                    <div className='profile__container-input'>
                        <label className='profile__label'>Имя</label>
                        <input className='profile__input'
                               id='name'
                               value={name}
                               minLength="2"
                               maxLength="100"
                               disabled
                               ref={nameInput}
                               onChange={nameChange}
                        />

                    </div>
                    <div className='profile__border' />
                    <div className='profile__container-input'>
                        <label className='profile__label'>E-mail</label>
                        <input
                            className='profile__input'
                            id='email'
                            value={email}
                            type='email'
                            minLength="2"
                            maxLength="100"
                            disabled
                            ref={emailInput}
                            onChange={emailChange}
                        />
                    </div>
                    <div className='profile__container-submit'>
                        <span className={`profile__errorMessage ${disabled ? 'profile__errorMessage_visible' : ""}`}>
                            При обновлении профиля произошла ошибка
                        </span>
                        <button
                            className={`profile__btn-save ${disabled ? 'profile__btn-save_disabled' : ""} ${active ? 'profile__btn-save_visible' : ""}`}>
                            Сохранить
                        </button>
                    </div>
                </form>
                <div className={`profile__edit-exit ${active ? 'profile__edit-exit_hidden' : ""}`}>
                    <button className='profile__edit' type='button' onClick={editProfile}>
                        Редактировать
                    </button>
                    <NavLink to='/movies' className='profile__exit'>Выйти из аккаунта</NavLink>
                </div>

            </div>
        </div>
    )
}

export default Profile