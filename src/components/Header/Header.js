import React, {useState} from "react";
import {Link, NavLink} from "react-router-dom";
import HeaderLogo from '../../images/header-logo.svg'
import HeaderAccount from '../../images/haeder-account.png';
import BurgerMenu from "../BurgerMenu/BurgerMenu";


function Header({authorized}) {

    const [isOpenBurgerMenu, setIsOpenBurgerMenu] = useState(false);

    function openBurgerMenu() {
        setIsOpenBurgerMenu(true)
    }

    function closeBurgerMenu() {
        setIsOpenBurgerMenu(false)
    }

    return (

        <header className={`header ${authorized ? 'header_theme_white' : ''}`}>
            <div className='header__section'>
                <Link to='/'>
                    <img className='header__logo' src={HeaderLogo} alt='Логотип'/>
                </Link>
                <nav className={`header__menu ${authorized ? 'header__menu_visible' : ""}`}>
                    <ul className='header__list'>
                        <li className='header__list-item'>
                            <NavLink to='/movies'
                                     className={({isActive}) => `header__list-link ${isActive ? 'header__list-item_active' : ""}`}
                            >
                                Фильмы
                            </NavLink>
                        </li>
                        <li className='header__list-item'>
                            <NavLink to='/saved-movies'
                                     className={({isActive}) => `header__list-link ${isActive ? 'header__list-item_active' : ""}`}
                            >
                                Сохранённые фильмы
                            </NavLink>
                        </li>
                    </ul>
                </nav>
                <div
                    className={`header__container-account ${authorized ? 'header__container-account_visible' : ""}`}>
                    <NavLink to='/profile' className='header__account'>
                        <button className='header__account-btn' type='button'>
                            Аккаунт
                            <div className='header__account-icon'>
                                <img className='header__account-image' src={HeaderAccount} alt='Иконка аккаунта'/>
                            </div>
                        </button>
                    </NavLink>
                </div>
                <button className={`header__burger ${authorized ? 'header__burger_visible' : ""}`}
                        onClick={openBurgerMenu}/>
                <div
                    className={`header__container-auth ${authorized ? 'header__container-auth_hidden' : ""} `}>
                    <Link to='/signup'>
                        <button className='header__registration-btn'>Регистрация</button>
                    </Link>
                    <Link to='/signin'>
                        <button className='header__login-btn'>Войти</button>
                    </Link>
                </div>
            </div>
            <BurgerMenu isOpenBurgerMenu={isOpenBurgerMenu} closeBurgerMenu={closeBurgerMenu}/>
        </header>
    )
}

export default Header;