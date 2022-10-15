import User from "./User.js";
import ModeFactory from "../modes/ModeFactory.js";

export default class UserManager {

    constructor(storageManager) {
        this.storageManager = storageManager;
        this.currentUser = this.storageManager.getCurrentUser();
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

    setCurrentUserMode(mode) {
        let factory = new ModeFactory();
        this.currentUser.mode = factory.getMode(mode);

    }

}
