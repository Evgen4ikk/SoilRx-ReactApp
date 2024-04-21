import { ApplicationError } from './ApplicationError'

export class UnauthorizedError extends ApplicationError {
    public static readonly code = 401

    get code(): number {
        return UnauthorizedError.code
    }
}
