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

    getMovies() {
        return fetch(`${this._baseUrl}/movies`, {
            headers: this._headers,
        })
            .then(this._checkResponse) //если сервер ответил успешно(ok) создаем из ответа объект, если нет то появляется ошибка
    }

    saveMovie(film) {
        return fetch(`${this._baseUrl}/movies`, {
            method: "POST",                 //метод изменяет существующие данные на сервере
            headers: this._headers,
            body: JSON.stringify({     //делает из объекта строку
                country: film.country,
                director: film.director,
                duration: film.duration,
                year: film.year,
                description: film.description,
                image: `https://api.nomoreparties.co/${film.image.url}`,
                trailerLink: film.trailerLink,
                nameRu: film.nameRu,
                nameEN: film.nameEN,
                thumbnail: `https://api.nomoreparties.co/${film.image.formats.thumbnail.url}`,
                movieId: film.id,
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
