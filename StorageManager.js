import User from "./User/User.js";

export default class StorageManager {

    constructor() {
        this.refreshStorage()
        if (!this.storage) {
            this.initializeStorage();
        }
    }

    get(itemName) {
        return this.storage[itemName];
    }

    set(itemName, item) {

        this.storage[itemName] = item
        this.saveStorage();
    }

    saveStorage() {
        window.localStorage.setItem('skycrash', JSON.stringify(this.storage))
    }

    refreshStorage() {
        this.storage = window.localStorage.getItem('skyCrash')
    }

    initializeStorage() {
        this.storage = {
            users: [],
            currentUser: null
        }

        this.saveStorage();
    }

    getCurrentUser() {
        let user = this.get('currentUser')
        if (!user) return null;
        let userClass = new User();
        userClass.username = user.username;
        return userClass;


    }
}
