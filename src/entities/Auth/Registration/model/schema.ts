import { passwordValidation, symbolValidation } from '@/shared/model/regex'
import { z } from 'zod'

export const signUpSchema = z
    .object({
        email: z
            .string({
                required_error: 'Все поля должны быть заполнены',
            })
            .email({ message: 'Недействительный адрес электронной почты' })
            .min(1, 'Все поля должны быть заполнены')
            .max(256),
        username: z
            .string({
                required_error: 'Все поля должны быть заполнены',
            })
            .min(1, 'Все поля должны быть заполнены'),
        password: z
            .string({
                required_error: 'Все поля должны быть заполнены',
            })
            .min(
                6,
                'Пароль должен включать: минимум 6 символов, хотя бы одну букву латинского алфавита и хотя бы одну цифру',
            )
            .regex(
                passwordValidation,
                'Пароль должен содержать хотя бы одну букву латинского алфавита и хотя бы одну цифру',
            )
            .regex(symbolValidation, 'Допустимые символы: A-Z, a-z, 0-9')
            .max(24),
        confirmPassword: z
            .string({
                required_error: 'Все поля должны быть заполнены',
            })
            .min(1, 'Все поля должны быть заполнены')
            .max(24),
        laws: z.boolean(),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: 'Пароли не совпадают',
        path: ['confirmPassword'],
    })
    .refine((data) => data.laws === true, {
        message:
            'Для регистрации необходимо согласиться с политикой конфиденциальности',
        path: ['laws'],
    })
