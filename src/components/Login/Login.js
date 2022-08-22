import React from "react";
import SubmitButton from "../SubmitBatton/SubmitButton";
import {Link} from "react-router-dom";

function Login(props) {
    return (
        <div className='register'>
            {props.children}
            <form className='register__form'>

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
                <span className="register__errorMessage register__errorMessage_big_margin">Что-то пошло не так...</span>
                <SubmitButton name={'Войти'}/>
                <div className="register__link">
                    <span className='register__link-text'>Ещё не зарегистрированы?</span>
                    <Link className='register__link-active' to="/signup">Регистрация</Link>
                </div>
            </form>

        </div>
    )
}

export default Login;