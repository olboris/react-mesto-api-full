class Auth {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  register(email, password) {
    return fetch(`${this._baseUrl}/signup`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        "email": email,
        "password": password,
      })
  })
    .then((res) => {
      return this.getResponseData(res);
  })
  }

  authorize(email, password) {
    return fetch(`${this._baseUrl}/signin`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        "email": email,
        "password": password,
      })
    })
    .then((res) => {
      return res;
    })
    .then((data) => {
      console.log(data);
      localStorage.setItem('token', data.token);
      return this.getResponseData(data);
    })
  }
  
  getContent(token) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      }
    })
    .then(res => res.json())
    .then(data => data)
  }

  getResponseData(res) {
    if (res.ok) {
        return res.json();
    }
   return Promise.reject(new Error(`Ошибка: ${res.status}`));
}
}

const auth = new Auth({
  baseUrl: 'https://ap.mesto.olboris.students.nomoredomains.club',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  }
});

export default auth;