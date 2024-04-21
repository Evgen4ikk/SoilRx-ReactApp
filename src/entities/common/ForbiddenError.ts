import { ApplicationError } from './ApplicationError'

export class ForbiddenError extends ApplicationError {
    public static readonly code = 403

    get code(): number {
        return ForbiddenError.code
    }
}
