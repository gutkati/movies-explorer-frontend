import React from "react";

function Techs(props) {
    return (
        <section className='techs'>
            <div className='techs__section'>
                {props.children}
                <div className='techs__container'>
                    <h2 className='techs__title'>7 технологий</h2>
                    <p className='techs__description'>На курсе веб-разработки мы освоили технологии, которые применили в
                        дипломном проекте.</p>
                </div>
                <ul className='techs__list'>
                    <li className='techs__technology'>HTML</li>
                    <li className='techs__technology'>CSS</li>
                    <li className='techs__technology'>JS</li>
                    <li className='techs__technology'>React</li>
                    <li className='techs__technology'>Git</li>
                    <li className='techs__technology'>Express.js</li>
                    <li className='techs__technology'>mongoDB</li>
                </ul>
            </div>


        </section>
    )
}

export default Techs;