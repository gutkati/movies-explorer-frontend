import React, {useState, useRef, useContext, useEffect} from "react";
import {CurrentUserContext} from '../../contexts/curentUserContext'
import useFormWithValidation from "../../utils/validation";


function Profile({logout, editProfile}) {
    const currentUser = useContext(CurrentUserContext);

    const {values, setValues, isValid, handleChange} = useFormWithValidation();
    const nameInput = useRef();
    const emailInput = useRef();

    const [isActive, setIsActive] = useState(false);
    const [inputActive, setInputActive] = useState(false);


    useEffect(() => {
        setValues({
            name: currentUser.name,
            email: currentUser.email
        })
    }, [currentUser])

    function inputEditProfile() {
        setIsActive(true);
        setInputActive(true);
    }

    const handleFormSubmit = (evt) => {
        evt.preventDefault();

        editProfile({
            name: values.name,
            email: values.email
        });
        setIsActive(false);
        console.log(currentUser)
    }

    const handleToggle = () => {
        setInputActive(false);
    }

    return (
        <>
            <div className='profile'>
                <main className='profile__container'>
                    <h2 className='profile__title'>Привет, {currentUser.name}!</h2>
                    <form className='profile__form' onSubmit={handleFormSubmit}>
                        <div className='profile__container-input'>
                            <label className='profile__label'>Имя</label>
                            <input className='profile__input'
                                   type="name"
                                   name="name"
                                   id="name"
                                   ref={nameInput}
                                   minLength="2"
                                   maxLength="30"
                                   required
                                   disabled={!inputActive}
                                   onChange={handleChange}
                                   value={values.name || ''}
                            />

                        </div>
                        <div className='profile__border'/>
                        <div className='profile__container-input'>
                            <label className='profile__label'>E-mail</label>
                            <input
                                className='profile__input'
                                type="email"
                                name="email"
                                id="email"
                                ref={emailInput}
                                required
                                pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-z]{2,}$"
                                disabled={!inputActive}
                                onChange={handleChange}
                                value={values.email || ''}
                            />
                        </div>
                        <div className='profile__container-submit'>
                            <button
                                type='submit'
                                className={`profile__btn-save ${!isActive ? 'profile__btn-save_hidden' : ""} `}
                                disabled={!isValid || (currentUser.name === values.name && currentUser.email === values.email)}
                                onClick={handleToggle}
                            >
                                Сохранить
                            </button>
                        </div>
                    </form>
                    <div className={`profile__edit-exit ${isActive ? 'profile__edit-exit_hidden' : ""}`}>
                        <button className='profile__edit' type='button' onClick={inputEditProfile}>
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
