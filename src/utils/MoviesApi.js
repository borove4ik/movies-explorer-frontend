import baseUrls  from "./urls";

class MoviesApi {
    constructor(baseUrls) {
        this._url = baseUrls.beatFilmUrl;
    }

    _responseHandler(res) {
        if (res.ok) {
            return res.json()
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    }

    getMovies() {
        return fetch(`${this._url}`, {
            headers: {"Content-Type": "application/json"}
        })
        .then((res) => this._responseHandler(res))
    }
}

const moviesApi = new MoviesApi(baseUrls);
export default moviesApi