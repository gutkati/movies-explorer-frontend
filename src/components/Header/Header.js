import React from "react";
import {Link, NavLink} from "react-router-dom";
import HeaderLogo from '../../images/header-logo.svg'
import HeaderAccount from '../../images/haeder-account.png';


function Header({loggedIn}) {
    return (
        <header className={`header ${loggedIn ? 'header_theme_white' : ''}`}>
            <div className='header__section'>
                <Link to='/'>
                    <img className='header__logo' src={HeaderLogo} alt='Логотип'/>
                </Link>
                <nav className={`header__menu ${loggedIn ? 'header__menu_visible' : ""}`}>
                    <ul className='header__list'>
                        <li className='header__list-item'>
                            <NavLink to='/movies' className='header__list-link'>
                                Фильмы
                            </NavLink>
                        </li>
                        <li className='header__list-item'>
                            <NavLink to='/saved-movies' className='header__list-link'>
                                Сохранённые фильмы
                            </NavLink>
                        </li>
                    </ul>
                </nav>
                <div className={`header__container-account ${loggedIn ? 'header__container-account_visible' : ""}`}>
                    <NavLink to='/profile' className='header__account'>
                        <button className='header__account-btn'>
                            Аккаунт
                            <div className='header__account-icon'>
                                <img className='header__account-image' src={HeaderAccount} alt='Иконка аккаунта'/>
                            </div>
                        </button>
                    </NavLink>
                </div>
                <div className={`header__container-auth ${loggedIn ? 'header__container-auth_hidden' : ""}`}>
                    <Link to='/signup'>
                        <button className='header__registration-btn'>Регистрация</button>
                    </Link>
                    <Link to='/signin'>
                        <button className='header__login-btn'>Войти</button>
                    </Link>
                </div>
            </div>
        </header>
    )
}

// {`header__buttons ${loggedIn || minimal? 'header__buttons_hidden' : ''}`}
export default Header;