import { ApplicationError } from './ApplicationError'

export class BadRequestError extends ApplicationError {
    public static readonly code = 400

    get code(): number {
        return BadRequestError.code
    }
}
