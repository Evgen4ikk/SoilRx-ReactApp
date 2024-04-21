export type LoginResponse = {
    access_token: string
    token_type: string
    expires_in: number
}

export type LogoutResponse = {
    message: string
}

export type LoginFormData = {
    email: string
    password: string
}

export type RegisterFormDara = {
    email: string
    password: string
    password_confirmation: string
    name: string
}

export type RegisterResponse = {
    message: string
}

export type UserObject = {
    id: string
    name: string
    email: string
}

export type ResetPasswordData = {
    email: string | null
    token: string | null
    password: string
    password_confirmation: string
}
