export class LocalStorageWorker {
    localStorageSupported: boolean

    constructor() {
        this.localStorageSupported =
            typeof window['localStorage'] != 'undefined' &&
            window['localStorage'] != null
    }

    add(key: string, item: string) {
        if (this.localStorageSupported) {
            localStorage.setItem(key, item)
        }
    }

    get(key: string) {
        if (this.localStorageSupported) {
            var item = localStorage.getItem(key)
            if (item) {
                return item
            } else {
                return null
            }
        }
    }

    remove(key: string) {
        if (this.localStorageSupported) {
            localStorage.removeItem(key)
        }
    }

    clear() {
        if (this.localStorageSupported) {
            localStorage.clear()
        }
    }
}
