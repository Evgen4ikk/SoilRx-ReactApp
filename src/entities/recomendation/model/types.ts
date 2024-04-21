import { z } from 'zod'
import { AnalysisSchema } from './schema'

export type AnalysisFormData = z.infer<typeof AnalysisSchema>

export type FertileData = {
    soil: string
    Data: string
}

export type DateType = {
    date: string
    timezone_type: number
    timezone: string
}

export type TopRecomendations = {
    top_recommendations: Array<string & Object>
}

export type Recommendation = {
    recommend: string
}

export type AnalysisItem = {
    id: number
    plots_id: number
    nitric_oxide: string
    phosphorus_oxide: string
    potassium_oxide: string
    pH: string
    pdf_path: string
    created_at: string
    updated_at: string
}

export type ResultItem = {
    n: number
    p: number
    k: number
    date: Date
}
