import BaseUrls  from "./urls";

class MoviesApi {
    constructor(BaseUrls) {
        this._url = BaseUrls.beatFilmUrl;
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

const moviesApi = new MoviesApi(BaseUrls);
export default moviesApi