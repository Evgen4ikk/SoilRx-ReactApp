import { baseApi } from '@shared/api/api'
import { apiMap } from '@shared/model/api'
import '../model/types'
import { PersonalInformationData } from '../model/types'

export const userApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getUserInfo: build.query<PersonalInformationData, number>({
            query: (id) => {
                return {
                    url: apiMap.getUserInfo + id,
                }
            },
            providesTags: () => [
                {
                    type: 'user',
                },
                {
                    type: 'auth',
                },
            ],
        }),
        editUserInfo: build.mutation({
            query: (data) => {
                return {
                    url: apiMap.editUserInfo + data.id,
                    method: 'PATCH',
                    body: data,
                }
            },
            invalidatesTags: () => [
                {
                    type: 'user',
                },
                {
                    type: 'auth',
                },
            ],
        }),
        editUserPassword: build.mutation({
            query: ({ data, id }) => {
                return {
                    url: apiMap.editUserPassword + id,
                    method: 'PUT',
                    body: data,
                }
            },
            invalidatesTags: () => [
                {
                    type: 'user',
                },
                {
                    type: 'auth',
                },
            ],
        }),
        editUserEmail: build.mutation({
            query: ({ data, id }) => {
                return {
                    url: apiMap.editUserEmail + id,
                    method: 'PUT',
                    body: data,
                }
            },
            invalidatesTags: () => [
                {
                    type: 'user',
                },
                {
                    type: 'auth',
                },
            ],
        }),
        deleteUser: build.mutation<null, number>({
            query: (id) => {
                return {
                    url: apiMap.deleteUser + id,
                    method: 'DELETE',
                }
            },
        }),
    }),
})

export const {
    useGetUserInfoQuery,
    useDeleteUserMutation,
    useEditUserEmailMutation,
    useEditUserInfoMutation,
    useEditUserPasswordMutation,
} = userApi
