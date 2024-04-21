import { baseApi } from '@shared/api/api'
import { apiMap } from '@shared/model/api'
import { FileUpload, PlotData, PlotDataForm, SelectProps } from '../model/types'

export const plotApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getPlots: build.query<PlotData[], null>({
            query: () => {
                return {
                    url: apiMap.getPlots,
                }
            },
            providesTags: () => [
                {
                    type: 'plot',
                },
                {
                    type: 'field',
                },
            ],
        }),
        getPlotById: build.query<PlotData, number>({
            query: (id) => {
                return {
                    url: apiMap.getPlotdById + id,
                }
            },
            providesTags: () => [
                {
                    type: 'plot',
                },
                {
                    type: 'field',
                },
            ],
        }),
        createPlot: build.mutation<null, PlotDataForm>({
            query: (data) => {
                const formData = new FormData()
                formData.append('name', data.name)
                formData.append('size', String(data.size))
                formData.append('field_id', String(data.field_id))
                formData.append('soil_type_id', String(data.soil_type_id))
                formData.append('culture_id', String(data.culture_id))
                data.pdf && formData.append('pdf', data.pdf)
                return {
                    url: apiMap.createPlot,
                    method: 'POST',
                    body: formData,
                    prepareHeaders: (headers: Headers) => {
                        headers.set('Content-Type', 'multipart/form-data')
                        return headers
                    },
                }
            },
            invalidatesTags: () => [
                {
                    type: 'plot',
                },
                {
                    type: 'field',
                },
            ],
        }),
        deletePlot: build.mutation<null, number>({
            query: (id) => {
                return {
                    url: apiMap.deletePlot + id,
                    method: 'DELETE',
                }
            },
            invalidatesTags: () => [
                {
                    type: 'plot',
                },
                {
                    type: 'field',
                },
            ],
        }),
        editPlot: build.mutation<null, PlotData>({
            query: (data) => {
                console.log(data.pdf)
                return {
                    url: apiMap.editPlot + data.id,
                    method: 'PUT',
                    body: data,
                }
            },
            invalidatesTags: () => [
                {
                    type: 'plot',
                },
                {
                    type: 'field',
                },
            ],
        }),
        uploadFile: build.mutation<null, FileUpload>({
            query: (data) => {
                const formData = new FormData()
                formData.append('pdf', data.pdf)
                return {
                    url: apiMap.uploadFile + data.id,
                    method: 'POST',
                    body: formData,
                    prepareHeaders: (headers: Headers) => {
                        headers.set('Content-Type', 'multipart/form-data')
                        return headers
                    },
                }
            },
            invalidatesTags: () => [
                {
                    type: 'plot',
                },
                {
                    type: 'field',
                },
            ],
        }),
        getSoilType: build.query<Array<SelectProps>, null>({
            query: () => {
                return {
                    url: apiMap.getSoilTypes,
                }
            },
        }),
        getCrops: build.query<Array<SelectProps>, null>({
            query: () => {
                return {
                    url: apiMap.getCrops,
                }
            },
        }),
    }),
})

export const {
    useGetPlotsQuery,
    useGetPlotByIdQuery,
    useCreatePlotMutation,
    useDeletePlotMutation,
    useEditPlotMutation,
    useUploadFileMutation,
    useGetSoilTypeQuery,
    useGetCropsQuery,
} = plotApi
