import { EGradeText } from '@ui/Enums/Enums'

export interface PlotData {
    id: number
    fieldName: string
    grade: EGradeText
    culture: string
    area: string
    soil: string
    chemicalAnalysis: string
}
