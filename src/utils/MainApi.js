import getCookie from './getCookie'
import setCookie from './setCookie'
import BaseUrls from './urls'

class MainApi {
    constructor(BaseUrls) {
        this._url = BaseUrls;
    }

    _responseHandler(res) {
        if (res.ok) {
            return res.json()
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    }


    register({name, email, password}) {
        return fetch(`${this._url}/signup`, {
            method: 'POST',
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({name, email, password}),
        })
            .then(this._responseHandler)
            .then(res => {
                setCookie('jwt', res.token, 7);
                return res;
            })
            .catch(error => {
                return Promise.reject(`Ошибка: ${error}`);
            })
    }

    login = ({email, password}) => {
        return fetch(`${this._url}/signin`, {
            method: "POST",
            credentials: 'include',
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({email, password}),
        })
            .then(this._responseHandler)
            .then(res => {
                setCookie('jwt', res.token, 7)
                return res;
            })
            .catch(error => {
                return Promise.reject(`Ошибка: ${error}`);
            })
    }

    getMe() {
        const token = getCookie('jwt');

        return fetch(`${this._url}/users/me`, {
            method: "GET",
            credentials: 'include',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        })
            .then(this._responseHandler);
    }

    updateUser(inputValues) {
        const token = getCookie('jwt');

        return fetch(`${this._url}/users/me`, {
            method: "PATCH",
            credentials: 'include',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({
                name: inputValues.name,
                email: inputValues.email
            })
        })
            .then(this._responseHandler)
    }

    signOut() {
        return fetch(`${this._url}/signout`, {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        })
            .then(this._responseHandler)
    }

    getMovies() {
        const token = getCookie('jwt');

        return fetch(`${this._url}/movies`, {
            method: "GET",
            credentials: 'include',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
        })
            .then(this._responseHandler)
    }

    createMovie(
        country,
        director,
        duration,
        year,
        description,
        image,
        trailerLink,
        nameRU,
        nameEN,
        thumbnail,
        movieId
    ) {
        const token = getCookie('jwt');

        return fetch(`${this._url}/movies`, {
            method: "POST",
            credentials: 'include',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(
                {
                    country,
                    director,
                    duration,
                    year,
                    description,
                    image,
                    trailerLink,
                    nameRU,
                    nameEN,
                    thumbnail,
                    movieId
                }
            )
        })
            .then(this._responseHandler)
    }

    deleteMovie(movieId) {
        const token = getCookie('jwt');

        return fetch(`${this._url}/movies/${movieId}`, {
            method: "DELETE",
            credentials: 'include',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        })
            .then(this._responseHandler);
    }
}

const mainApi = new MainApi(BaseUrls.backendUrl)
export default mainApi