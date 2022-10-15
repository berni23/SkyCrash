import User from "./User.js";

export default class UserManager {

    constructor(storageManager) {
        this.storageManager = storageManager;
        this.currentUser = storeManager.getCurrentUser();

    }

    validateUsername(username) {

        return username.trim() !== ""
    }

    sanitizeName(username) {
        return username.trim()
    }

    createUserAndSetAsCurrent(username) {
        this.currentUser = this.createUser(username)
    }

    createUser(username) {
        let user = new User(this.sanitizeName(username));
        this.saveUser(user);
        return user;
    }

    saveUser(user) {
        let users = this.storageManager.get('users')
        users.push(user)
        this.storageManager.set('users', users);
    }

}
