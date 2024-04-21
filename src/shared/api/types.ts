export interface ApiError {
    status: number
    data: { message: string }
}

export interface IError {
    code: number
}