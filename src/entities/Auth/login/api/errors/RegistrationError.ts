export const RegistrationError = (status: number) => {
    switch (status) {
        case 400:
            return 'Адрес электронной почты уже используется'
        case 500:
            return 'Неизвестная ошибка'
    }
}
