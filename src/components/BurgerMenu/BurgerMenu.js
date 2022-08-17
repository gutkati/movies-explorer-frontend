import React from "react";
import {NavLink} from "react-router-dom";
import HeaderAccount from "../../images/haeder-account.png";

function BurgerMenu({isOpenBurgerMenu, closeBurgerMenu}) {
    return (
        <div className={`burgerMenu ${ isOpenBurgerMenu ? 'burgerMenu__open' : ""}`}>
            <nav className='burgerMenu__container'>
                <button className="burgerMenu__btn-close" type='button' onClick={closeBurgerMenu}/>
                <ul className='burgerMenu__list'>
                    <li className='burgerMenu__item'>
                        <NavLink className='burgerMenu__link' to='/'>Главная</NavLink>
                    </li>
                    <li className='burgerMenu__item'>
                        <NavLink className='burgerMenu__link' activeClassName='burgerMenu__link_active'
                                 to='/movies'>Фильмы</NavLink>
                    </li>
                    <li className='burgerMenu__item'>
                        <NavLink className='burgerMenu__link'
                                 activeClassName='burgerMenu__link_active'
                                 to='/movies'>Сохраненные фильмы</NavLink>
                    </li>
                </ul>
                <div className='burgerMenu__account'>
                    <NavLink to='/profile' className='header__account'>
                        <button className='header__account-btn' type='button'>
                            Аккаунт
                            <div className='header__account-icon'>
                                <img className='header__account-image' src={HeaderAccount} alt='Иконка аккаунта'/>
                            </div>
                        </button>
                    </NavLink>
                </div>
            </nav>

        </div>
    )
}

export default BurgerMenu;