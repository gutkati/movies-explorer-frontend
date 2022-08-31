import React, {useState, useEffect} from "react";
import {Route, Switch, useHistory, useLocation} from 'react-router-dom';
import {CurrentUserContext} from '../../contexts/curentUserContext'
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute'
import Header from '../Header/Header.js';
import Register from '../Register/Register.js';
import SectionWelcome from '../SectionWelcome/SectionWelcome.js';
import Login from '../Login/Login.js';
import Profile from '../Profile/Profile.js';
import Movies from '../Movies/Movies.js';
import Main from "../Main/Main.js"
import Footer from "../Footer/Footer.js";
import SavedMovies from "../SavedMovies/SavedMovies.js";
import NotFound from "../NotFound/NotFound.js";
import {mainApi} from "../../utils/MainApi.js";
import {moviesApi} from "../../utils/MoviesApi"
import InfoTooltip from "../InfoTooltip/InfoTooltip.js"

function App() {
    const loggedIn = true;

    const history = useHistory();
    const [authorized, setAuthorized] = useState(false);
    const [savedCards, setSavedCards] = useState([]);
    const [currentUser, setCurrentUser] = useState({});
    const [message, setMessage] = useState("");
    const [infoTooltipOpen, setInfoTooltipOpen] = useState(false);
    const [isSymbol, setIsSymbol] = useState(false);


    useEffect(() => {
        if (authorized) {
            moviesApi
                .getBeatFilm()
                .then((cards) => {
                    console.log(cards)
                })
        }
        checkToken()
        setAuthorized(true);
    }, [authorized]);

    useEffect(() => {
        if (authorized) {
            mainApi
                .getUserData()
                .then((res) => {
                    setCurrentUser(res)
                })
                .catch((err) => {
                    console.log(err)
                })
        }
        checkToken()
    }, [authorized])

    useEffect(() => {
            mainApi
                .getUserData()
                .then((data) => {
                    console.log(data)
                if (data) {
                    setAuthorized(true)
                    setCurrentUser(data);
                }
            })
                .catch((err) => {
                    console.log(err)
                })

    }, [history])

    function checkToken() {
        const jwt = localStorage.getItem("jwt")
        console.log("jwt", jwt)
        if (jwt) {
            mainApi
                .getUserData()
                .then((res) => {
                    if (res) {
                        setCurrentUser(res);
                        setAuthorized(true);
                        history.push("/movies");
                    } else {
                        setAuthorized(false);
                        setCurrentUser({});
                        history.push("/");
                    }
                })
                .catch((err) => {
                    if (err === 401) {
                        console.log("401 - Токен не передан или передан не в том формате")
                    }
                    console.log("401 - Переданный токен не корректен")
                })
        }
    }

    function handleRegister(name, email, password) {
        mainApi
            .registration(name, email, password)
            .then((res) => {
                if (res) {
                    setInfoTooltipOpen(true)
                    setIsSymbol(true)
                    setMessage("Вы успешно зарегестрировались");
                    history.push('/signin')
                }
            })
            .catch((err) => {
                if (err === 400) {
                    console.log("400 - некорректно заполнено одно из полей");
                }
                setInfoTooltipOpen(true)
                setIsSymbol(false)
                setMessage("Что-то пошло не так! Попробуйте ещё раз.");
            })
    }

    function handleLogin(email, password) {
        mainApi
            .login(email, password)
            .then((res) => {
                if (res) {
                    handlePageLogin(res);
                    history.push("/movies")
                }
            })
            .catch((err) => {
                if (err === 400) {
                    console.log("400 - не передано одно из полей")
                } else if (err === 401) {
                    console.log("401 - пользователь с email не найден")
                }
                setInfoTooltipOpen(true)
                setIsSymbol(false)
                setMessage("Что-то пошло не так! Попробуйте ещё раз.");
            })
    }

    function handlePageLogin(user) {
        setAuthorized(true);
        setCurrentUser(user);
        checkToken();
    }

    function handleLogout() {
        mainApi
            .logout()
            .then((res) => console.log(res))
            .catch(err => console.log(err))
        setAuthorized(false)
        localStorage.removeItem("jwt")
        history.push("/")
    }

    function handleEditProfile(name, email) {
        mainApi
            .editProfile(name, email)
            .then((res) => {
                setCurrentUser(res);
                setInfoTooltipOpen(true)
                setIsSymbol(true)
                setMessage("Данные профиля успешно изменены.");
            })
            .catch((err) => console.log(err));
    }

    // useEffect(() => {
    //     checkToken()
    // })

    function closeInfoTooltip() {
        setInfoTooltipOpen(false)
    }


// раздел с фильмами

    // useEffect(() => {
    //     if (authorized) {
    //         moviesApi
    //             .getBeatFilm()
    //             .then((cards) => {
    //                 console.log(cards)
    //                 setFilteredCards(cards);
    //             })
    //     }
    // }, [authorized]);

    function handleSaveMovie(movie) {
        mainApi
            .saveMovie(movie)
            .then((newMovie) => {
                setSavedCards([newMovie, ...savedCards])
            })
            .catch((err) => {
                setInfoTooltipOpen(true)
                setIsSymbol(false)
                setMessage('Что-то пошло не так')
            })
    }

    function handleDeleteMovie(movie) {
        const savedMovie = savedCards.find((item) => {
            if (item.movieId === movie.id || item.movieId === movie.movieId) {
                return item
            } else {
                return savedCards
            }
        })
        mainApi
            .deleteMovie(savedMovie._id)
            .then((res) => {
                const newCardList = savedCards.filter((m) => {
                    if (movie.id === m.movieId || movie.movieId === m.movieId) {
                        return false
                    } else {
                        return true
                    }
                })
                setSavedCards(newCardList)
            })
            .catch((err) => console.log(err));
    }

    // useEffect(() => {
    //     if (authorized) {
    //         mainApi
    //             .getMovie()
    //             .then((movies) => {
    //                 setSavedCards(movies)
    //             })
    //             .catch((err) => {
    //                 console.log(err)
    //             })
    //     }
    // }, [authorized])


    return (
        <CurrentUserContext.Provider value={currentUser}>
            <div className='page'>
                <Switch>
                    <Route exact path='/'>
                        <Main/>
                    </Route>

                    <Route path='/signup'>
                        <Register register={handleRegister}>
                            <SectionWelcome title={'Добро пожаловать!'}/>
                        </Register>
                    </Route>

                    <Route path='/signin'>
                        <Login login={handleLogin}>
                            <SectionWelcome title={'Рады видеть!'}/>
                        </Login>
                    </Route>
                    <ProtectedRoute
                        path='/profile'
                        authorized={authorized}
                    >
                        <Profile
                            editProfile={handleEditProfile}
                            logout={handleLogout}
                        >
                            <Header loggedIn={loggedIn}/>
                        </Profile>
                    </ProtectedRoute>

                    <ProtectedRoute path='/movies'>
                        <Header loggedIn={loggedIn}/>
                        <Movies
                            user={currentUser}
                            savedCards={savedCards}
                            onClickSave={handleSaveMovie}
                            onClickDelete={handleDeleteMovie}
                        />
                        <Footer/>
                    </ProtectedRoute>

                    <ProtectedRoute path='/saved-movies'>
                        <Header loggedIn={loggedIn}/>
                        <SavedMovies
                            user={currentUser}
                            savedCards={savedCards}
                            onClickDelete={handleDeleteMovie}
                        />
                        <Footer/>
                    </ProtectedRoute>

                    <Route path='*'>
                        <NotFound/>
                    </Route>

                    <InfoTooltip
                        isOpen={infoTooltipOpen}
                        onClose={closeInfoTooltip}
                        message={message}
                        symbol={isSymbol}
                    />

                </Switch>

            </div>
        </CurrentUserContext.Provider>
    )
}

export default App;




