import { LocalStorageWorker } from './storageWorker'
import { TokenKey } from './types'

export class TokenStorage {
    storageWorker: LocalStorageWorker

    constructor() {
        this.storageWorker = new LocalStorageWorker()
    }

    getToken(key: TokenKey) {
        var tokenData = this.storageWorker.get(key)

        if (tokenData && tokenData.length > 0) {
            return tokenData
        }
    }

    addToken(key: TokenKey, token: string) {
        if (token.length > 0) {
            this.storageWorker.add(key, token)
        }
    }

    removeToken(key: TokenKey) {
        this.storageWorker.remove(key)
    }

    clear() {
        this.storageWorker.clear()
    }
}
