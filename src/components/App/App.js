import React from "react";
import {Route, Switch} from 'react-router-dom';
import Header from '../Header/Header.js';
import Register from '../Register/Register.js';
import SectionWelcome from '../SectionWelcome/SectionWelcome.js';
import Login from '../Login/Login.js';
import Profile from '../Profile/Profile.js';
import Movies from '../Movies/Movies.js';
import Main from "../Main/Main.js"
import SavedMovies from "../SavedMovies/SavedMovies";
import NotFound from "../NotFound/NotFound";

function App() {

    const loggedIn = true;

    return (
        <div className='page'>
            <Switch>
                <Route exact path='/'>
                    <Main/>
                </Route>

                <Route path='/signup'>
                    <Register>
                        <SectionWelcome title={'Добро пожаловать!'}/>
                    </Register>
                </Route>

                <Route path='/signin'>
                    <Login>
                        <SectionWelcome title={'Рады видеть!'}/>
                    </Login>
                </Route>

                <Route path='/profile'>
                    <Profile>
                        <Header loggedIn={loggedIn}/>
                    </Profile>
                </Route>

                <Route>
                    <Movies path='/movies'>
                        <Header loggedIn={loggedIn}/>
                    </Movies>
                </Route>

                <Route>
                    <SavedMovies path='/saved-movies'>
                        <Header loggedIn={loggedIn}/>
                    </SavedMovies>
                </Route>

                <Route path='*'>
                    <NotFound/>
                </Route>

            </Switch>

        </div>

    )
}

export default App;