import React from "react";
import LandingLogo from "../../../images/landing-logo.png";
import NavTab from "../NavTab/NavTab.js";

function Promo() {
    return (
        <section className='promo main__promo'>
            <div className='promo__section'>
                <div className='promo__container-image'>
                    <img className='promo__img' src={LandingLogo} alt='Картинка проекта'/>
                </div>
                <h1 className='promo__title'>
                    Учебный проект студента факультета Веб-разработки.
                </h1>
            </div>
            <NavTab/>
        </section>
    )
}

export default Promo