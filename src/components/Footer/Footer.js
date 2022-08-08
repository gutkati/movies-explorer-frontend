import React from "react";

function Footer() {
    return (
        <footer className='footer'>
            <div className='footer__section'>
                <p className='footer__subtitle'>Учебный проект Яндекс.Практикум х BeatFilm.</p>
                <div className='footer__border'></div>
                <div className='footer__container'>
                    <p className='footer__copyright'>© 2022</p>
                    <ul className='footer__social-list'>
                        <li className='footer__social-item'>
                            <a className='footer__social-link' href='#'>Яндекс.Практикум</a>
                        </li>
                        <li className='footer__social-item'>
                            <a className='footer__social-link' href='#'>Github</a>
                        </li>
                        <li className='footer__social-item'>
                            <a className='footer__social-link' href='#'>ВКонтакте</a>
                        </li>
                    </ul>
                </div>
            </div>
        </footer>
    )
}

export default Footer;