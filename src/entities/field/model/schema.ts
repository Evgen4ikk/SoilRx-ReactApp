import { cadastreNumberValidation } from '@model/regex'
import { z } from 'zod'

export const AddFieldSchema = z.object({
    name: z
        .string({
            required_error: 'Необходимо заполнить все обязательные поля',
        })
        .min(1, 'Необходимо заполнить все обязательные поля'),
    size: z
        .number({
            required_error: 'Необходимо заполнить все обязательные поля',
        })
        .min(0, 'Значение должно быть не меньше нуля')
        .refine((value) => String(value).length <= 6, {
            message: 'Значение должно содержать не более 6 цифр',
        }),
    cadastre_number: z
        .string()
        .regex(cadastreNumberValidation, {
            message:
                'Кадастровый номер может содержать только цифры (0-9) и символ ":"',
        })
        .optional()
        .transform((e) => (e === '' ? undefined : e)),
})
