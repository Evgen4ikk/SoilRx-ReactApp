export const EditPasswordError = (status: number) => {
    switch (status) {
        case 401:
            return 'Неверный пароль'
        case 500:
            return 'Неизвестная ошибка'
    }
}
