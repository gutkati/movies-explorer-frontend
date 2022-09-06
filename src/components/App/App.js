import React, {useState, useEffect} from "react";
import {Route, Routes, Switch, useHistory, useLocation, useNavigate} from 'react-router-dom';
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
    const [savedMoviesList, setSavedMoviesList] = useState([]);
    const [currentUser, setCurrentUser] = useState({});
    const [message, setMessage] = useState("");
    const [infoTooltipOpen, setInfoTooltipOpen] = useState(false);
    const [isSymbol, setIsSymbol] = useState(false);


    // useEffect(() => {
    //     if (authorized) {
    //         moviesApi
    //             .getBeatFilm()
    //             .then((cards) => {
    //                 console.log(cards)
    //             })
    //     }
    //     checkToken()
    //     setAuthorized(true);
    // }, [authorized]);

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
        // checkToken()
    }, [authorized])

    useEffect(() => {
        const jwt = localStorage.getItem("jwt")
        if (jwt) {
            mainApi
                .getUserData()
                .then((data) => {
                    console.log(data)
                    if (data) {
                        setAuthorized(true)
                    }
                })
                .catch((err) => {
                    console.log(err)
                })
        }
    }, [history])

    function handleRegister(name, email, password) {
        mainApi
            .registration(name, email, password)
            .then((res) => {
                if (res) {
                    //handleLogin(email, name)
                    setInfoTooltipOpen(true)
                    setIsSymbol(true)
                    setMessage("Вы успешно зарегестрировались");
                    history.push('/signin')
                }
            })
            .catch((err) => {
                setInfoTooltipOpen(true)
                setIsSymbol(false)
                setMessage("Что-то пошло не так! Попробуйте ещё раз.");
                // if (err === 400) {
                //     console.log("400 - некорректно заполнено одно из полей");
                // }

            })
    }

    function handleLogin(email, password) {
        mainApi
            .login(email, password)
            .then((data) => {
                if (data.token) {
                    localStorage.setItem("jwt", data.token)
                    handlePageLogin();
                    history.push("/movies")
                }

            })
            .catch((err) => {
                setInfoTooltipOpen(true)
                setIsSymbol(false)
                setMessage("Что-то пошло не так! Попробуйте ещё раз.");
                if (err === 400) {
                    console.log("400 - не передано одно из полей")
                } else if (err === 401) {
                    console.log("401 - пользователь с email не найден")
                }

            })
    }

    function handlePageLogin() {
        setAuthorized(true);
        checkToken();
    }

    function checkToken() {
        if (localStorage.getItem("jwt")) {
            const jwt = localStorage.getItem("jwt")
            console.log("jwt", jwt)
            if (jwt) {
                mainApi
                    .getUserData(jwt)
                    .then((data) => {
                        if (data) {
                            setAuthorized(true);
                            history.push("/movies");
                            setCurrentUser(data);
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
    }


    function handleLogout() {
        setCurrentUser({})
        setAuthorized(false)
        localStorage.removeItem("jwt")
        history.push('/')
    }

    // function handleLogout() {
    //     mainApi
    //         .logout()
    //         .then((res) => {
    //             setAuthorized(false)
    //             setCurrentUser({})
    //             localStorage.removeItem("jwt")
    //             history.push("/")
    //         })
    //         .catch(err => console.log(err))
    //
    // }

    function handleEditProfile(info) {
        mainApi
            .editProfile(info)
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
                setSavedMoviesList([newMovie, ...savedMoviesList])
            })
            .catch((err) => {
                setInfoTooltipOpen(true)
                setIsSymbol(false)
                setMessage('Что-то пошло не так')
            })
    }

    function handleDeleteMovie(movie) {
        const savedMovie = savedMoviesList.find((item) => {
            if (item.movieId === movie.id || item.movieId === movie.movieId) {
                return item
            } else {
                return savedMoviesList
            }
        })
        mainApi
            .deleteMovie(savedMovie._id)
            .then((res) => {
                const newCardList = savedMoviesList.filter((m) => {
                    if (movie.id === m.movieId || movie.movieId === m.movieId) {
                        return false
                    } else {
                        return true
                    }
                })
                setSavedMoviesList(newCardList)
            })
            .catch((err) => console.log(err));
    }


    useEffect(() => {
        if (authorized) {
            mainApi
                .getMovie()
                .then((data) => {
                    setSavedMoviesList(data)
                })
                .catch((err) => {
                    console.log(err)
                })
        }
    }, [authorized])


    return (
        <CurrentUserContext.Provider value={currentUser}>
            <div className='page'>
                <Route>
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

                    <Route path='*'>
                        <NotFound/>
                    </Route>

                    <Route element={<ProtectedRoute authorized={authorized} redirectPath='/'/>}>
                        <Route path='/profile'>
                            <Profile
                                editProfile={handleEditProfile}
                                logout={handleLogout}
                            >
                                <Header loggedIn={loggedIn}/>
                            </Profile>
                        </Route>

                        <Route path='/movies'>
                            <Header loggedIn={loggedIn}/>
                            <Movies
                                user={currentUser}
                                savedMoviesList={savedMoviesList}
                                onClickSave={handleSaveMovie}
                                onClickDelete={handleDeleteMovie}
                            />
                            <Footer/>
                        </Route>

                        <Route path='/saved-movies'>
                            <Header loggedIn={loggedIn}/>
                            <SavedMovies
                                authorized={authorized}
                                user={currentUser}
                                savedMoviesList={savedMoviesList}
                                onClickDelete={handleDeleteMovie}
                            />
                            <Footer/>
                        </Route>

                    </Route>

                    <InfoTooltip
                        isOpen={infoTooltipOpen}
                        onClose={closeInfoTooltip}
                        message={message}
                        symbol={isSymbol}
                    />

                </Route>

            </div>
        </CurrentUserContext.Provider>
    )
}

export default App;




