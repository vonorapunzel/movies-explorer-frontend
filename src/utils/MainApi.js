class MainApi {
  constructor(data) {
    this._url = data.url;
    this._headers = data.headers;
  }

  _getResponseData(res) {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`);
    } else {
      return res.json();
    }
  }

  getMyMovies() {
    return fetch(`${this._url}/movies`, {
      method: 'GET',
      credentials: 'include',
      headers: this._headers,
    })
      .then(res => this._getResponseData(res))
      .then(data => data)
  }

  saveMovies(data) {
    return fetch(`${this._url}/movies`, {
      method: 'POST',
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify({
        nameRU: data.nameRU,
        nameEN: data.nameEN,
        country: data.country,
        director: data.director,
        duration: data.duration,
        year: data.year,
        description: data.description,
        image: data.image,
        trailer: data.trailerLink,
        thumbnail: data.image,
        movieId: data.id,
      }),
    })
      .then((res) => this._getResponseData(res))
  }

  deleteMovies(id) {
    return fetch(`${this._url}/movies/${id}`, {
      method: 'DELETE',
      credentials: 'include',
      headers: this._headers,
    })
      .then((res) => this._getResponseData(res))
  }

  register(name, email, password) {
    return fetch(`${this._url}/signup`, {
      method: 'POST',
      headers: this._headers,
      credentials: 'include',
      body: JSON.stringify({ name: name, email: email, password: password }),
    })
      .then((res) => this._getResponseData(res))
  }

  authorize(email, password) {
    return fetch(`${this._url}/signin`, {
      method: 'POST',
      headers: this._headers,
      credentials: 'include',
      body: JSON.stringify({ email, password }),
    })
      .then((res) => this._getResponseData(res))
  }


  editProfile(email, name) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify({ email, name })
    })
      .then((res) => this._getResponseData(res))
  }

  getUserInfo() {
    return fetch(`${this._url}/users/me`, {
      method: 'GET',
      headers: this._headers,
      credentials: 'include',
    })
      .then((res) => this._getResponseData(res))
      .then(data => data)
  }

  signOut() {
    return fetch(`${this._url}/signout`, {
      method: 'POST',
      headers: this._headers,
      credentials: 'include',
    })
      .then((res) => this._getResponseData(res))
      .then(data => data)
  }
}
const mainApi = new MainApi({
  url: 'https://api.freemovies.nomoredomains.rocks',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
});

export default mainApi;