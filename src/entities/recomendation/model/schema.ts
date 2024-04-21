import { ACCEPTED_FILE_TYPES, MAX_FILE_SIZE } from '@model/fileValidation'
import { UploadFile } from 'antd'
import { z } from 'zod'

export const AnalysisSchema = z.object({
    chemicalAnalysis: z
        .custom<UploadFile<any>[]>()
        .refine(
            (data) =>
                data && data[0].size
                    ? data[0].size
                    : MAX_FILE_SIZE + 1 <= MAX_FILE_SIZE,
            `Максимальный размер файла 5 MB`,
        )
        .refine(
            (data) =>
                ACCEPTED_FILE_TYPES.includes(
                    data && data[0].type ? data[0].type : '',
                ),
            'Допустимые форматы: pdf, docx',
        ),
})
