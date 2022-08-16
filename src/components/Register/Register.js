import React from "react";
import SubmitButton from '../SubmitBatton/SubmitButton.js';
import {Link} from 'react-router-dom';

function Register(props) {
    return (
        <div className='register'>
            {props.children}
            <form className='register__form'>
                <label className='register__label'>Имя</label>
                <input
                    className="register__input"
                    name="name"
                    minLength="2"
                    maxLength="100"
                    required
                />
                <label className='register__label'>E-mail</label>
                <input
                    className="register__input"
                    type="email"
                    name="email"
                    minLength="2"
                    maxLength="100"
                    required
                />

                <label className='register__label'>Пароль</label>
                <input
                    className="register__input"
                    type="password"
                    name="password"
                    minLength="4"
                    maxLength="50"
                    required
                />
                <span className="register__errorMessage">Что-то пошло не так...</span>
                <SubmitButton name={'Зарегистрироваться'}/>
                <div className="register__link">
                    <span className='register__link-text'>Уже зарегистрированы?</span>
                    <Link className='register__link-active' to="/signin">Войти</Link>
                </div>
            </form>

        </div>
    )
}

export default Register;