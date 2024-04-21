export const LoginError = (status: number) => {
    switch (status) {
        case 401:
            return 'Неверный адрес электронной почты или пароль'
        case 403:
            return 'Вам на почту было отправлено письмо с подтверждением'
        case 404:
            return 'Пользователь не найден'
        case 500:
            return 'Неизвестная ошибка'
    }
}
