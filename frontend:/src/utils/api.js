class Api {
    constructor(options) {
        this._baseUrl = options.baseUrl;
        this._headers = options.headers;
    }

    
    getInitialCards() {
        return fetch(`${this._baseUrl}/cards`, {
            method: 'GET',
            headers: this._headers,
        })
            .then((res) => {
                return this._getResponseData(res);
            })
    }

    getUser() {
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'GET',
            headers: this._headers,
        })
            .then((res) => {
                return this._getResponseData(res);
            })
    }

    setUser(data) {
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                name: data.name,
                about: data.about,
            })
        })
            .then((res) => {
                return this._getResponseData(res);
            })
    }

    setAvatar(data) {
        return fetch(`${this._baseUrl}/users/me/avatar`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                avatar: data.avatar,
            })
        })
            .then((res) => {
                return this._getResponseData(res);
            })
    }

    addCard(data) {
        return fetch(`${this._baseUrl}/cards`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                name: data.name,
                link: data.link
            })
        })

            .then((res) => {
                return this._getResponseData(res);
            })
    }

    deleteCard(_id) {
        return fetch(`${this._baseUrl}/cards/${_id}`, {
            method: 'DELETE',
            headers: this._headers,
        })
            .then((res) => {
                return this._getResponseData(res);
            })

    }

    changeLikeCardStatus(_id, isLiked) {
        if (isLiked) {
            return fetch(`${this._baseUrl}/cards/likes/${_id}`, {
            method: 'PUT',
            headers: this._headers,
        })
            .then((res) => {
                return this._getResponseData(res);
            })

        }
        else {
            return fetch(`${this._baseUrl}/cards/likes/${_id}`, {
                method: 'DELETE',
                headers: this._headers,
            })
                .then((res) => {
                    return this._getResponseData(res);
                })
        }
    }

    _getResponseData(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(new Error(`Ошибка: ${res.status}`));
    }
}

const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-18',
    headers: {
        authorization: '46990cf4-451e-43ba-b2b4-1af58b8e42dd',
        'Content-Type': 'application/json'
    }
});

export default api;