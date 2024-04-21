import { z } from 'zod'

export const ForgotPasswordSchema = z.object({
    email: z
        .string({
            required_error: 'Все поля должны быть заполнены',
        })
        .max(256, 'Почта не должна содержать больше 256 символов')
        .email({ message: 'Недействительный адрес электронной почты' })
        .min(1, 'Необходимо заполнить все обязательные поля'),
})
