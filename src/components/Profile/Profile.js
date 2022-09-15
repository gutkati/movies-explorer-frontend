import React, {useState, useRef, useContext, useEffect} from "react";
import {CurrentUserContext} from '../../contexts/curentUserContext'

function Profile({logout, editProfile}) {

    const currentUser = useContext(CurrentUserContext);
    const [name, setName] = useState(currentUser.name);
    const [email, setEmail] = useState(currentUser.email);
    const [initialName, setInitialName] = useState(currentUser.name);
    const [initialEmail, setInitialEmail] = useState(currentUser.email);
    const [activeButton, setActiveButton] = useState(false);
    const nameInput = useRef();
    const emailInput = useRef();

    function handleChangeName(e) {
        setName(e.target.value);
        if (e.target.value !== initialName) {
            setActiveButton(true);
        } else {
            setActiveButton(false);
        }
    }

    function handleChangeEmail(e) {
        setEmail(e.target.value);
        if (e.target.value !== initialEmail) {
            setActiveButton(true);
        } else {
            setActiveButton(false);
        }
    }

    function isEditProfile() {
        setActiveButton(true)
        nameInput.current.removeAttribute("disabled")
        emailInput.current.removeAttribute("disabled")
    }

    function handleSubmit(e) {
        e.preventDefault();
        setActiveButton(false);

        editProfile({
            name: name,
            email: email,
        });
        localStorage.setItem('name', name)
        localStorage.setItem('email', email)
    }

    React.useEffect(() => {
        const localStorageName = localStorage.getItem('name');
        if (localStorageName) {
            setInitialName(localStorageName);
        }
        const localStorageEmail = localStorage.getItem('email');
        if (localStorageEmail) {
            setInitialEmail(localStorageEmail);
        }

    }, [])

    useEffect(() => {
        if (currentUser.name || currentUser.email) {
            setName(currentUser.name)
            setEmail(currentUser.email)
        }

    }, [currentUser])

    return (
        <>
            <div className='profile'>
                <main className='profile__container'>
                    <h2 className='profile__title'>Привет, {name}!</h2>
                    <form className='profile__form' onSubmit={handleSubmit}>
                        <div className='profile__container-input'>
                            <label className='profile__label'>Имя</label>
                            <input className='profile__input'
                                   id='name'
                                   value={name || ""}
                                   minLength="2"
                                   maxLength="100"
                                   onChange={handleChangeName}
                                   disabled
                                   ref={nameInput}
                            />

                        </div>
                        <div className='profile__border'/>
                        <div className='profile__container-input'>
                            <label className='profile__label'>E-mail</label>
                            <input
                                className='profile__input'
                                id='email'
                                value={email || ""}
                                type='email'
                                minLength="2"
                                maxLength="100"
                                onChange={handleChangeEmail}
                                disabled
                                ref={emailInput}
                            />
                        </div>
                        <div className='profile__container-submit'>
                            <button
                                type='submit'
                                className={`profile__btn-save ${!activeButton ? 'profile__btn-save_disabled' : ""} ${activeButton ? 'profile__btn-save_visible' : ""}`}>
                                Сохранить
                            </button>
                        </div>
                    </form>
                    <div className={`profile__edit-exit ${activeButton ? 'profile__edit-exit_hidden' : ""}`}>
                        <button className='profile__edit' type='button' onClick={isEditProfile}>
                            Редактировать
                        </button>
                        <button className='profile__exit' type='button' onClick={logout}>Выйти из аккаунта
                        </button>
                    </div>
                </main>
            </div>
        </>
    )


}

export default Profile