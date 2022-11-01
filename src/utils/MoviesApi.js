class MoviesApi {
    constructor({baseUrl, headers}) {
        this._baseUrl = baseUrl;
        this._headers = headers;
    }

    _checkResponse(res) {
        if (res.ok) {
            return res.json()
        }
        return Promise.reject(`Ошибка: ${res.status}`)
    }

    getBeatFilm() {
        return fetch(`${this._baseUrl}`, {
            method: 'GET',
            headers: this._headers,
        })
            .then(this._checkResponse) //если сервер ответил успешно(ok) создаем из ответа объект, если нет то появляется ошибка
    }
}

export const moviesApi = new MoviesApi({
    baseUrl: 'https://api.nomoreparties.co/beatfilm-movies',
    headers: {
        'Content-Type': 'application/json'
    }
})