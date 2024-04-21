import { passwordValidation, symbolValidation } from '@model/regex'
import { z } from 'zod'

export const editPasswordSchema = z
    .object({
        old_password: z
            .string({
                required_error: 'Все поля должны быть заполнены',
            })
            .min(6, 'Пароль должен содержать минимум 6 символов')
            .max(24, 'Пароль не должен содержать больше 24 символов')
            .regex(
                passwordValidation,
                'Пароль должен содержать хотя бы одну букву латинского алфавита и хотя бы одну цифру',
            )
            .regex(symbolValidation, 'Допустимые символы: A-Z, a-z, 0-9'),
        password: z
            .string({
                required_error: 'Все поля должны быть заполнены',
            })
            .min(1, 'Все поля должны быть заполнены')
            .max(24, 'Пароль не должен содержать больше 24 символов'),
        password_confirmation: z
            .string({
                required_error: 'Все поля должны быть заполнены',
            })
            .min(1, 'Все поля должны быть заполнены')
            .max(24, 'Пароль не должен содержать больше 24 символов'),
    })
    .refine((data) => data.password === data.password_confirmation, {
        message: 'Пароли не совпадают',
        path: ['password_confirmation'],
    })
