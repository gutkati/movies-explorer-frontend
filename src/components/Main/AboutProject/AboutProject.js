import React from "react";

function AboutProject(props) {
    return (
        <section className='aboutProject'>
            <div className='aboutProject__section'>
                {props.children}
                <div className='aboutProject__container'>
                    <div className='aboutProject__description'>
                        <h3 className='aboutProject__description-title'>Дипломный проект включал 5 этапов</h3>
                        <p className='aboutProject__description-text'>Составление плана, работу над бэкендом, вёрстку,
                            добавление
                            функциональности и финальные доработки.</p>
                    </div>
                    <div className='aboutProject__description'>
                        <h3 className='aboutProject__description-title'>На выполнение диплома ушло 5 недель</h3>
                        <p className='aboutProject__description-text'>У каждого этапа был мягкий и жёсткий дедлайн,
                            которые нужно было соблюдать, чтобы успешно защититься.</p>
                    </div>
                </div>
                <div className='aboutProject__container'>
                    <div className='aboutProject__section-brief'>
                        <p className='aboutProject__time aboutProject__time_theme_colored'>1 неделя</p>
                        <p className='aboutProject__app'>Back-end</p>
                    </div>
                    <div className='aboutProject__section-long'>
                        <p className='aboutProject__time'>4 недели</p>
                        <p className='aboutProject__app'>Front-end</p>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default AboutProject;