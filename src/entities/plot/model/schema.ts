import { ACCEPTED_FILE_TYPES, MAX_FILE_SIZE } from '@model/fileValidation'
import { type UploadFile } from 'antd'
import { z } from 'zod'

export const AddPlotSchema = z.object({
    plotName: z.string({
        required_error: 'Обязательные поля должны быть заполнены',
    }),
    plotArea: z.coerce
        .number({
            required_error: 'Обязательные поля должны быть заполнены',
        })
        .min(1, 'Необходимо заполнить все обязательные поля'),
    cultureSelect: z.number({
        required_error: 'Обязательные поля должны быть заполнены',
    }),
    soilType: z.number({
        required_error: 'Обязательные поля должны быть заполнены',
    }),
    chemicalAnalysis: z
        .custom<UploadFile<any>[]>()
        .refine(
            (data) =>
                data.length !== 0 && data[0].size
                    ? data[0].size
                    : MAX_FILE_SIZE + 1 <= MAX_FILE_SIZE,
            `Максимальный размер файла 5 MB`,
        )
        .refine(
            (data) =>
                ACCEPTED_FILE_TYPES.includes(
                    data.length !== 0 && data[0].type ? data[0].type : '',
                ),
            'Допустимые форматы: pdf, docx',
        )
        .optional(),
})
