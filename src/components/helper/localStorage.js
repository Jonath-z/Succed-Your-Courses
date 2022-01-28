export class LocalStorage {
    static get(key) {
        return localStorage.getItem(key);
    };
    static set(key, value) {
        return localStorage.setItem(key, value);
    }
    static clear() {
        return localStorage.clear();
    }

}