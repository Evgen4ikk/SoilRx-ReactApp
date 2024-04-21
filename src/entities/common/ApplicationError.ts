import { IError } from '@shared/api/types'

export abstract class ApplicationError extends Error implements IError {
    constructor() {
        super()
        this.name = this.constructor.name
        Object.setPrototypeOf(this, new.target.prototype)
    }

    abstract readonly code: number
}
