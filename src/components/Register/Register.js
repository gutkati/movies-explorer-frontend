import React, {useState, useCallback, useEffect} from "react";
import SubmitButton from '../SubmitBatton/SubmitButton.js';
import {Link} from 'react-router-dom';

function Register(props) {



    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [insideName, setInsideName] = useState(false)
    const [insideEmail, setInsideEmail] = useState(false)
    const [insidePassword, setInsidePassword] = useState(false) // находимся внутри инпута
    const [nameError, setNameError] = useState('')
    const [emailError, setEmailError] = useState('')
    const [passwordError, setPasswordError] = useState('')
    const [formValid, setFormValid] = useState(false)

    const emailHandler = (e) => {
        setEmail(e.target.value)
        const regular = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        if (!regular.test(String(e.target.value).toLowerCase())) {
            setEmailError("Некорректный email")
            if (!e.target.value) {
                setEmailError('Обязательно для заполнения')

            }
        } else {
            setEmailError("")
        }
    }

    const passwordHandler = (e) => {
        setPassword(e.target.value)
        if (e.target.value.length < 8 || e.target.value.length > 50) {
            setPasswordError('Пароль должен быть длиннее 8 и меньше 50')
            if (!e.target.value) {
                setPasswordError('Обязательно для заполнения')

            }
        } else {
            setPasswordError('')
        }
    }

    const nameHandler = (e) => {
        setName(e.target.value)
        const regular = /^[A-Za-zА-Яа-яёЁ -]+$/
        if (!regular.test(String(e.target.value).toLowerCase())) {
            setNameError("Некорректное имя")
            if (!e.target.value) {
                setNameError('Обязательно для заполнения')

            }
        } else {
            setNameError("")
        }
    }

    const blurHandler = (e) => {
        switch (e.target.name) {
            case "name":
                setInsideName(true)
                break
            case "email":
                setInsideEmail(true)
                break
            case "password":
                setInsidePassword(true)
                break
        }
    }

    useEffect(() => {
        if (emailError || nameError || passwordError) {
            setFormValid(false)
        } else {
            setFormValid(true)
        }
    }, [emailError, nameError, passwordError])

    const handleSubmit = (e) => {
        e.preventDefault();
        props.register(name, email, password);          //вы усрешно зарегестрировались
    };

    return (
        <div className='register'>
            {props.children}
            <form className='register__form' onSubmit={handleSubmit} noValidate>
                <div className='register__container-input'>
                    <label className='register__label'>Имя</label>
                    <input
                        className="register__input"
                        name="name"
                        value={name}
                        onChange={nameHandler}
                        onBlur={blurHandler}
                        minLength="2"
                        maxLength="100"
                        required
                    />
                    <div className='register__error'>{(insideName && nameError) &&
                    <span className="register__errorMessage">{nameError}</span>}</div>

                    <label className='register__label'>E-mail</label>
                    <input
                        className="register__input"
                        type="email"
                        name="email"
                        value={email}
                        onChange={emailHandler}
                        onBlur={blurHandler}
                        minLength="2"
                        maxLength="100"
                        required
                    />
                    <div className='register__error'>{(insideEmail && emailError) &&
                    <span className="register__errorMessage">{emailError}</span>}</div>
                    <label className='register__label'>Пароль</label>
                    <input
                        className="register__input"
                        type="password"
                        name="password"
                        value={password}
                        onChange={passwordHandler}
                        onBlur={blurHandler}
                        minLength="8"
                        maxLength="50"
                        required
                    />
                    <div className='register__error'>{(insidePassword && passwordError) &&
                    <span className="register__errorMessage">{passwordError}</span>}</div>
                </div>

                    <SubmitButton
                        name={'Зарегистрироваться'}
                        formValid={!formValid}
                    />
                <div className="register__link">
                    <span className='register__link-text'>Уже зарегистрированы?</span>
                    <Link className='register__link-active' to="/signin">Войти</Link>
                </div>
            </form>

        </div>
    )
}

export default Register;