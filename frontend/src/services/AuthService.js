import request from './Request';

class AuthService {
    static url = 'auth';

    static register({ username, email, password }) {
        return request({
            url: `${this.url}/register`,
            method: 'POST',
            body: { username, email, password },
        });
    }

    static login({ username, password }) {
        return request({
            url: `${this.url}/login`,
            method: 'POST',
            body: { username, password },
        });
    }

    static getUser() {
        return request({ url: `${this.url}/user`, method: 'GET' });
    }

    static logout() {
        return request({ url: `${this.url}/logout`, method: 'POST' });
    }
}

export default AuthService;
