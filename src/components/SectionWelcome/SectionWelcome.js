import React from "react";
import {Link} from 'react-router-dom';
import RegisterLogo from '../../images/header-logo.svg'

function SectionWelcome({title}) {
    return (
        <div className='sectionWelcome'>
            <div className='sectionWelcome__container'>
                <Link className='sectionWelcome__logo' to='/'>
                    <img src={RegisterLogo} alt='Логотип'/>
                </Link>
                <h2 className='sectionWelcome__title'>{title}</h2>
            </div>
        </div>
    )
}

export default SectionWelcome;