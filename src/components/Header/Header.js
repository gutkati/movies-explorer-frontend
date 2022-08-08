import React from "react";
import HeaderLogo from '../../images/header-logo.svg'


function Header() {
    return (
        <header className='header'>
      <div className='header__section'>
        <a href='#'><img className='header__logo' alt='Логотип' src={HeaderLogo}/></a>
        <nav className='header__menu'>
          <ul className='header__list'>
            <li className='header__list-item'>Фильмы</li>
            <li className='header__list-item'>Сохранённые фильмы</li>
          </ul>
        </nav>
        <div className='header__container-account'>
          <button className='header__account'>Аккаунт</button>
        </div>
        <div className='header__container-auth'>
          <button className='header__registration-btn'>Регистрация</button>
          <button className='header__login-btn'>Войти</button>
        </div>
      </div>
    </header>
    )
}

export default Header;