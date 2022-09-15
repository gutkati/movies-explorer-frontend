import React, {useState, useEffect} from "react";
import {Route, Routes, useLocation, useNavigate} from 'react-router-dom';
import {CurrentUserContext} from '../../contexts/curentUserContext';
import {mainApi} from "../../utils/MainApi.js";
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import Header from '../Header/Header.js';
import Register from '../Register/Register.js';
import SectionWelcome from '../SectionWelcome/SectionWelcome.js';
import Login from '../Login/Login.js';
import Profile from '../Profile/Profile.js';
import Movies from '../Movies/Movies.js';
import Main from "../Main/Main.js";
import SavedMovies from "../SavedMovies/SavedMovies.js";
import NotFound from "../NotFound/NotFound.js";
import InfoTooltip from "../InfoTooltip/InfoTooltip.js";

function App() {
    const loggedIn = true;
    const [authorized, setAuthorized] = useState(false);
    const [savedMoviesList, setSavedMoviesList] = useState([]);
    const [currentUser, setCurrentUser] = useState({});
    const [message, setMessage] = useState("");
    const [infoTooltipOpen, setInfoTooltipOpen] = useState(false);
    const [isSymbol, setIsSymbol] = useState(false);
    const navigate = useNavigate();
    const {pathname} = useLocation();

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
    }, [authorized])

    useEffect(() => {
        const jwt = localStorage.getItem("jwt")
        if (jwt) {
            mainApi
                .getUserData()
                .then((res) => {
                    if (res) {
                        setAuthorized(true)
                    }
                })
                .catch((err) => {
                    console.log(err)
                })
        }
    }, [navigate])

    function checkToken() {
        if (localStorage.getItem("jwt")) {
            const jwt = localStorage.getItem("jwt")
            if (jwt) {
                mainApi
                    .getUserData(jwt)
                    .then((data) => {
                        if (data) {
                            setAuthorized(true);
                            setCurrentUser(data);
                        }
                    })
                    .catch((err) => {

                        if (err === 401) {
                            setAuthorized(false)
                            console.log("401 - Токен не передан или передан не в том формате")
                        }
                        console.log("401 - Переданный токен не корректен")

                    })
            }
            if (!jwt) {
                setAuthorized(false)
            }
        }
    }

    function handleRegister(name, email, password) {
        mainApi
            .registration(name, email, password)
            .then((res) => {
                if (res) {
                    handleLogin(email, password)
                }
            })
            .catch((err) => {
                setInfoTooltipOpen(true)
                setIsSymbol(false)
                setMessage("Что-то пошло не так! Попробуйте ещё раз.");
                if (err === 400) {
                    console.log("400 - некорректно заполнено одно из полей");
                }

            })
    }

    function handleLogin(email, password) {
        mainApi
            .login(email, password)
            .then((data) => {
                if (data.token) {
                    localStorage.setItem("jwt", data.token)
                    handlePageLogin();
                    navigate("/movies")
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


    function handleLogout() {
        setCurrentUser({})
        setAuthorized(false)
        localStorage.removeItem("jwt")
        navigate('/')
    }

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

    function closeInfoTooltip() {
        setInfoTooltipOpen(false)
    }

// раздел с фильмами

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

    return (
        <CurrentUserContext.Provider value={currentUser}>
            <div className='page'>
                {pathname === "/" ||
                pathname === "/movies" ||
                pathname === "/saved-movies" ||
                pathname === "/profile" ? (
                    <Header authorized={authorized}/>
                ) : (
                    ""
                )}
                <Routes>
                    <Route
                        exact path='/'
                        element={<Main/>}
                    />

                    <Route path='/signup'
                           element={
                               <Register
                                   register={handleRegister}>
                                   <SectionWelcome title={'Добро пожаловать!'}/>
                               </Register>
                           }
                    />

                    <Route path='/signin'
                           element={
                               <Login
                                   login={handleLogin}>
                                   <SectionWelcome title={'Рады видеть!'}/>
                               </Login>
                           }
                    />

                    <Route path='*'
                           element={<NotFound/>}
                    />

                    <Route element={<ProtectedRoute authorized={authorized} redirectPath='/'/>}>
                        <Route path='/profile'
                               element={
                                   <Profile
                                       editProfile={handleEditProfile}
                                       logout={handleLogout}
                                       loggedIn={loggedIn}
                                       authorized={authorized}
                                   />
                               }
                        />

                        <Route path='/movies'
                               element={
                                   <Movies
                                       user={currentUser}
                                       savedMoviesList={savedMoviesList}
                                       onClickSave={handleSaveMovie}
                                       onClickDelete={handleDeleteMovie}
                                       loggedIn={loggedIn}
                                       authorized={authorized}
                                   />}

                        />

                        <Route path='/saved-movies'
                               element={
                                   <SavedMovies
                                       loggedIn={loggedIn}
                                       authorized={authorized}
                                       user={currentUser}
                                       savedMoviesList={savedMoviesList}
                                       onClickDelete={handleDeleteMovie}
                                   />}
                        />

                    </Route>
                </Routes>
                <InfoTooltip
                    isOpen={infoTooltipOpen}
                    onClose={closeInfoTooltip}
                    message={message}
                    symbol={isSymbol}
                />
            </div>
        </CurrentUserContext.Provider>
    )
}

export default App;