import { ApiError } from '@/shared/api/types'
import { SerializedError } from '@reduxjs/toolkit'

export const getApiError = (error: ApiError | SerializedError) => {
    if ('status' in error) {
        return error.status
    }
    return error.message
}
