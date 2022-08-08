import React from "react";
import LandingLogo from "../../../images/landing-logo.png";
import NavTab from "../NavTab/NavTab.js";

function Promo() {
    return (
        <section className='promo main__promo'>
            <div className='promo__container'>
                <img className='promo__img' src={LandingLogo} alt='Картинка проекта'/>
                <h1 className='promo__title'>
                Учебный проект студента факультета Веб-разработки.
                </h1>
            </div>
            <NavTab />
        </section>
    )
}

export default Promo