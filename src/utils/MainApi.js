import baseUrls from './urls'

class MainApi {
    constructor( baseUrls ) {
        this._url = baseUrls;
    }

    _responseHandler(res) {
        if (res.ok) {
            return res.json()
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    }


    register({ name, email, password }) {
        return fetch(`${this._url}/signup`, {
            method: 'POST',
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name, email, password }),
        }).then(this._responseHandler);
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
        }).then(this._responseHandler);
    }

    checkToken = (token) => {
        return fetch(`${this._url}/users/me`, {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }).then(this._responseHandler);
      };

      getMe() {
        return fetch(`${this._url}/users/me`, {
            method: "GET",
            credentials: 'include',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then(this._responseHandler);
    }

    updateUser(inputValues) {
        return fetch(`${this._url}/users/me`, {
            method: "PATCH",
            credentials: 'include',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
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
        return fetch(`${this._url}/movies`, {
            method: "GET",
            credentials: 'include',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
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
        return fetch(`${this._url}/movies`, {
            method: "POST",
            credentials: 'include',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(
                {country,
                director,
                duration,
                year,
                description,
                image,
                trailerLink,
                nameRU,
                nameEN,
                thumbnail,
                movieId}
            )
        })
        .then(this._responseHandler)
    }

    deleteMovie (movieId) {
        return fetch(`${this._url}/movies/${movieId}`, {
            method: "DELETE",
            credentials: 'include',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then(this._responseHandler);
    }
      
}

const mainApi = new MainApi(baseUrls.backendUrl)
export default mainApi