import React from "react";
import Photo from "../../../images/vitalii.png"
import Arrow from "../../../images/arrow.png"

function AboutMe(props) {
    return (
        <section className='aboutMe' id='aboutMeId'>
            <div className='aboutMe__section'>
                {props.children}
                <div className='aboutMe__container-profile'>
                    <div className='aboutMe__profile'>
                        <h2 className='aboutMe__title'>Виталий</h2>
                        <p className='aboutMe__subtitle'>Фронтенд-разработчик, 30 лет</p>
                        <p className='aboutMe__info'>Я родился и живу в Саратове, закончил факультет экономики СГУ. У
                            меня есть жена
                            и дочь. Я люблю слушать музыку, а ещё увлекаюсь бегом. Недавно начал кодить. С 2015 года
                            работал
                            в компании «СКБ Контур». После того, как прошёл курс по веб-разработке, начал заниматься
                            фриланс-заказами и ушёл с постоянной работы.</p>
                        <ul className='aboutMe__social-list'>
                            <li><a className='aboutMe__social-link' href='https://vk.com/katerinamalinka' target='blank'>ВКонтакте</a></li>
                            <li><a className='aboutMe__social-link' href='https://github.com/gutkati' target='blank'>Github</a></li>
                        </ul>
                    </div>
                    <div className='aboutMe__container-photo'>
                        <img className='aboutMe__photo' src={Photo} alt='Фото студента'/>
                    </div>
                </div>
                <div className='aboutMe__container-portfolio'>
                    <h3 className='aboutMe__portfolio-title'>Портфолио</h3>
                    <ul className='aboutMe__portfolio-list'>
                        <li className='aboutMe__portfolio-item'>
                            <a className='aboutMe__portfolio-link' href='https://github.com/gutkati/how-to-learn' target='blank'>Статичный сайт</a>
                            <a className='aboutMe__portfolio-link' href='https://github.com/gutkati/how-to-learn' target='blank'>
                                <img className='aboutMe__portfolio-arrow' src={Arrow} alt="Стрелка"/>
                            </a>
                        </li>
                        <div className='aboutMe__portfolio-border'></div>
                        <li className='aboutMe__portfolio-item'>
                            <a className='aboutMe__portfolio-link' href='https://github.com/gutkati/russian-travel' target='blank'>Адаптивный сайт</a>
                            <a className='aboutMe__portfolio-link' href='https://github.com/gutkati/russian-travel' target='blank'>
                                <img className='aboutMe__portfolio-arrow' src={Arrow} alt="Стрелка"/>
                            </a>
                        </li>
                        <div className='aboutMe__portfolio-border'></div>
                        <li className='aboutMe__portfolio-item'>
                            <a className='aboutMe__portfolio-link' href='https://github.com/gutkati/react-mesto-api-full' target='blank'>Одностраничное приложение</a>
                            <a className='aboutMe__portfolio-link' href='https://github.com/gutkati/react-mesto-api-full' target='blank'>
                                <img className='aboutMe__portfolio-arrow' src={Arrow} alt="Стрелка"/>
                            </a>
                        </li>
                    </ul>
                </div>

            </div>
        </section>
    )
}

export default AboutMe;