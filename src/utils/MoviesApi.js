class moviesApi {
  constructor(data) {
    this._url = data.url;
    this._headers = data.headers;
  }

  _getResponseData(res) {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
  }

  getMovies() {
    return fetch(`${this._url}`, {
      method: 'GET',
      headers: this._headers,
    })
      .then(res => this._getResponseData(res))
      .then(data => data)
  }
}

const api = new moviesApi({
  url: 'https://api.nomoreparties.co/beatfilm-movies',
  headers: {
    Accept: 'application/json',
    "Content-Type": "application/json",
  },
});

export default api;