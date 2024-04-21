export type AddFieldFormData = {
    name: string
    cadastre_number: string
    size: number
}

export type EditFieldFormData = {
    id?: number
    name: string
    size: number
    cadastre_number: string
}

export type FieldData = {
    id: number
    name: string
    size: string
    plots_number: number
    cadastre_number: string
    number_of_plots: number
}

export type FieldsData = {
    data: FieldData[]
}
