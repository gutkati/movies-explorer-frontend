class MainApi {
    constructor({baseUrl, headers}) {
        this._baseUrl = baseUrl;
        this._headers = headers;
    }

    _checkResponse(res) {
        if (res.ok) {
            return res.json()
        }
        return Promise.reject(`Error: ${res.status}`)
    }

    registration(name, email, password) {
        return fetch(`${this._baseUrl}/signup`, {
            method: "POST",
            credentials: "include",
            headers: this._headers,
            body: JSON.stringify({
                name: name,
                email: email,
                password: password,
            }),
        }).then((res) => this._checkResponse(res));
    }

    login(email, password) {
        return fetch(`${this._baseUrl}/signin`, {
            method: "POST",
            credentials: 'include',
            headers: this._headers,
            body: JSON.stringify({
                email: email,
                password: password,
            }),
        }).then((res) => this._checkResponse(res));
    }

    logout() {
        return fetch(`${this._baseUrl}/logout`, {
            credentials: 'include',
            headers: this._headers,

        }).then((res) => this._checkResponse(res));
    }

  //    getUserData(jwt) {
  //   return fetch(`${this._baseUrl}/users/me`, {
  //     method: "GET",
  //     headers: {
  //       authorization: `Bearer ${localStorage.getItem('jwt')}`,
  //       "Content-Type": "application/json",
  //     },
  //   }).then((res) => this._checkResponse(res));
  // }

    getUserData(jwt) {
        return fetch(`${this._baseUrl}/users/me`, {
            method: "GET",
            credentials: 'include',
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${jwt}`,
            },
        }).then((res) => this._checkResponse(res));
    }

    // getUserData() {
    //     return fetch(`${this._baseUrl}/users/me`, {
    //         headers: this._headers,
    //         credentials: "include"
    //     }).then((res) => this._checkResponse(res));
    // }

    editProfile(name, email) {
        return fetch(`${this._baseUrl}/users/me`, {
            method: "PATCH",                 //метод изменяет существующие данные на сервере
            credentials: 'include',
            headers: this._headers,
            body: JSON.stringify({     //делает из объекта строку
                name: name,
                email: email,
            })
        })
    }

    getMovie() {
        return fetch(`${this._baseUrl}/movies`, {
            headers: this._headers,
        })
            .then(this._checkResponse) //если сервер ответил успешно(ok) создаем из ответа объект, если нет то появляется ошибка
    }

    saveMovie(card) {
        return fetch(`${this._baseUrl}/movies`, {
            method: "POST",                 //метод изменяет существующие данные на сервере
            headers: this._headers,
            body: JSON.stringify({     //делает из объекта строку
                country: card.country,
                director: card.director,
                duration: card.duration,
                year: card.year,
                description: card.description,
                image: `https://api.nomoreparties.co/${card.image.url}`,
                trailerLink: card.trailerLink,
                nameRu: card.nameRu,
                nameEN: card.nameEN,
                thumbnail: `https://api.nomoreparties.co/${card.image.formats.thumbnail.url}`,
                movieId: card.id,
            }),
        })
            .then(this._checkResponse)
    }

    deleteMovie(id) {
        return fetch(`${this._baseUrl}/cards/${id}`, {
            method: "DELETE",
            headers: this._headers,
        })
            .then(this._checkResponse)
    }
}

export const mainApi = new MainApi({
    baseUrl: 'http://localhost:3001',
    headers: {
        'Content-Type': 'application/json'
    }
})
