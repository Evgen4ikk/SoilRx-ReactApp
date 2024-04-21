export const ForgotPasswordError = (status: number) => {
    switch (status) {
        case 500:
            return 'Аккаунт с таким e-mail не зарегистрирован'
    }
}
