import { baseApi } from '@shared/api/api'
import { apiMap } from '@shared/model/api'
import {
    AddFieldFormData,
    EditFieldFormData,
    FieldData,
    FieldsData,
} from '../model/types'

export const fieldApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getFields: build.query<FieldsData, null>({
            query: () => {
                return {
                    url: apiMap.getFields,
                }
            },
            providesTags: () => [
                {
                    type: 'field',
                },
                {
                    type: 'plot',
                },
            ],
        }),
        createFiled: build.mutation<{ data: FieldData }, AddFieldFormData>({
            query: (data) => {
                return {
                    url: apiMap.createField,
                    method: 'POST',
                    body: data,
                }
            },
            invalidatesTags: () => [
                {
                    type: 'field',
                },
                {
                    type: 'plot',
                },
            ],
        }),
        getFieldById: build.query<FieldData, number>({
            query: (id) => {
                return {
                    url: apiMap.getFieldById + id,
                }
            },
            providesTags: () => [
                {
                    type: 'field',
                },
                {
                    type: 'plot',
                },
            ],
        }),
        deleteField: build.mutation<FieldData, number>({
            query: (id) => {
                return {
                    url: apiMap.deleteField + id,
                    method: 'DELETE',
                }
            },
            invalidatesTags: () => [
                {
                    type: 'field',
                },
                {
                    type: 'plot',
                },
            ],
        }),
        editField: build.mutation<null, EditFieldFormData>({
            query: (data) => {
                return {
                    url: apiMap.editField + data.id,
                    method: 'PATCH',
                    body: data,
                }
            },
            invalidatesTags: () => [
                {
                    type: 'field',
                },
                {
                    type: 'plot',
                },
            ],
        }),
    }),
})

export const {
    useGetFieldsQuery,
    useCreateFiledMutation,
    useGetFieldByIdQuery,
    useDeleteFieldMutation,
    useEditFieldMutation,
} = fieldApi
