import { ApplicationError } from './ApplicationError'

export class NotFoundError extends ApplicationError {
    public static readonly code = 404

    get code(): number {
        return NotFoundError.code
    }
}
