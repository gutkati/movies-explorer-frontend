import React from "react";

import Promo from "./Promo/Promo.js";
import AboutProject from "./AboutProject/AboutProject.js";
import SectionTitle from "./SectionTitle/SectionTitle.js";
import Techs from "./Techs/Techs.js";
import AboutMe from "./AboutMe/AboutMe.js";
import Footer from "../Footer/Footer.js";
import Header from "../Header/Header.js";

function Main() {
    return(
        <main className='main'>
            <Header />
            <Promo />
            <AboutProject>
                <SectionTitle title={'О проекте'} />
            </AboutProject>
            <Techs>
                <SectionTitle title={'Технологии'} />
            </Techs>
            <AboutMe>
                <SectionTitle title={'Студент'} />
            </AboutMe>
            <Footer />
        </main>
    )
}

export default Main;