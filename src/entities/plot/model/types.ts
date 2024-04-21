import { RcFile } from 'antd/es/upload'
import { z } from 'zod'
import { AddPlotSchema } from './schema'

export type AddPlotFormData = z.infer<typeof AddPlotSchema>

export type PlotDataForm = {
    name: string
    size: number
    field_id: number
    soil_type_id: number
    culture_id: number
    pdf?: RcFile
}

export type PlotData = {
    id: number
    name: string
    size: string
    field_id: number
    soil_type_id: number
    culture_id: number
    pdf?: RcFile
}

export type SelectProps = {
    id: number
    name: string
    created_at: string | null
    updated_at: string | null
}

export type FileUpload = {
    id: number
    pdf: RcFile
}

export type PlotsData = {
    data: PlotData
}
