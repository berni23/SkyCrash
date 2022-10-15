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
        this.save();
    }
    save() {
        window.localStorage.setItem('skycrash', this.storage)
    }

    refreshStorage() {
        this.storage = window.localStorage.getItem('skyCrash')
    }

    initializeStorage() {

        this.storage = {
            users: [],
            currentUser: null
        }

        this.save();
    }

    getCurrentUser() {
        this.get('currentUser')
    }
}
