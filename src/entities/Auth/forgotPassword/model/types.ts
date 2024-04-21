import { z } from 'zod'
import { ForgotPasswordSchema } from './schema.ts'

export type ForgotPassData = z.infer<typeof ForgotPasswordSchema>
