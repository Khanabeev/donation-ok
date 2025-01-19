
export default class AuthStorage {
    key = 'access-token';

    getToken = () => {
        try {
            return JSON.parse(localStorage.getItem(this.key) ?? 'null');
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    setToken = (token) => localStorage.setItem(this.key, JSON.stringify(token))

    removeToken = () => localStorage.removeItem(this.key)
}