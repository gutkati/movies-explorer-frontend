import React, {useEffect, useState} from "react";
import {Route, Switch, useHistory, Redirect} from 'react-router-dom';
import Header from '../Header/Header.js';
import Register from '../Register/Register.js';
import SectionWelcome from '../SectionWelcome/SectionWelcome.js';
import Login from '../Login/Login.js';
import Profile from '../Profile/Profile.js';
import Movies from '../Movies/Movies.js';

import Main from "../Main/Main.js"
import SavedMovies from "../SavedMovies/SavedMovies";

function App() {

    const authorization = true;
    const loggedIn = true;
    const whiteHeader = true;

    return (
        <div className='page'>
            <switch>
                <Route>
                    <Main/>
                </Route>

                <Route>
                    <Register>
                        <SectionWelcome title={'Добро пожаловать!'}/>
                    </Register>
                </Route>

                <Route>
                    <Login>
                        <SectionWelcome title={'Рады видеть!'}/>
                    </Login>
                </Route>

                <Route>
                    <Profile>
                        <Header loggedIn={loggedIn}/>
                    </Profile>
                </Route>

                <Route>
                    <Movies>
                        <Header loggedIn={loggedIn}/>

                    </Movies>
                </Route>

                <Route>
                    <SavedMovies>
                        <Header loggedIn={loggedIn}/>
                    </SavedMovies>
                </Route>

            </switch>

        </div>

    )
}

export default App;