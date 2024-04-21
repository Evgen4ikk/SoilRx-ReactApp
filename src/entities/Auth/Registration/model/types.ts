import { z } from 'zod'
import { signUpSchema } from './schema'

export type SignUpSchema = z.infer<typeof signUpSchema>
