import React from "react";

function NavTab() {
    return (
        <nav className='navTab'>
            <a className='navTab__link' href='#aboutProjectId'>
                О проекте
            </a>
            <a className='navTab__link' href='#techsId'>
                Технологии
            </a>
            <a className='navTab__link' href='#aboutMeId'>
                Студент
            </a>
        </nav>
    )
}

export default NavTab;