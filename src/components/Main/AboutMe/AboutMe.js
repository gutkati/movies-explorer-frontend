import React from "react";
import Photo from "../../../images/Katerina.JPG"
import Arrow from "../../../images/arrow.png"

function AboutMe(props) {
    return (
        <section className='aboutMe' id='aboutMeId'>
            <div className='aboutMe__section'>
                {props.children}
                <div className='aboutMe__container-profile'>
                    <div className='aboutMe__profile'>
                        <h2 className='aboutMe__title'>Екатерина</h2>
                        <p className='aboutMe__subtitle'>Фронтенд-разработчик, 34 года</p>
                        <p className='aboutMe__info'>Я  живу в Ижевске, закончила факультет Реклама и Дизайн ИжГТУ. Во время обучения в институте
                            я работала дизайнером штор, проработав 7 лет, решила кординально сменить профессию и пошла работать в военную
                            приемку на завод. И вот я снова решила сменить профессию, теперь я обучаюсь на веб-разработчика. Я замужем
                            и у меня есть сын. Меня очень привлекает творчество, люблю делать что то своими руками.</p>
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