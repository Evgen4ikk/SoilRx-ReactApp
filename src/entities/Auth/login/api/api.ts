import { baseApi } from '@shared/api/api'
import { apiMap } from '@shared/model/api'
import { accessTokenKey } from '@shared/model/localStorageKeys'
import { TokenStorage } from '@shared/model/tokenStorage'
import {
    LoginFormData,
    LoginResponse,
    LogoutResponse,
    RegisterFormDara,
    ResetPasswordData,
    UserObject,
} from '../model/types'

const tokenStorage = new TokenStorage()

export const authApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        login: build.mutation<LoginResponse, LoginFormData>({
            query: (data) => {
                return {
                    url: apiMap.postLogin,
                    method: 'POST',
                    body: data,
                }
            },
            transformResponse: (response: LoginResponse) => {
                const { access_token } = response
                tokenStorage.addToken(accessTokenKey, access_token)
                return response
            },
            invalidatesTags: () => [
                {
                    type: 'user',
                },
                {
                    type: 'auth',
                },
                {
                    type: 'plot',
                },
                {
                    type: 'field',
                },
            ],
        }),
        getMe: build.query<UserObject, null>({
            query: () => {
                return {
                    url: apiMap.postMe,
                    method: 'POST',
                }
            },
            providesTags: () => [
                {
                    type: 'user',
                },
                {
                    type: 'auth',
                },
                {
                    type: 'plot',
                },
                {
                    type: 'field',
                },
            ],
        }),
        logout: build.mutation<LogoutResponse, null>({
            query: () => {
                return {
                    url: apiMap.postLogout,
                    method: 'POST',
                }
            },
            invalidatesTags: () => [
                {
                    type: 'user',
                },
                {
                    type: 'auth',
                },
                {
                    type: 'plot',
                },
                {
                    type: 'field',
                },
            ],
            transformResponse: (response: LogoutResponse) => {
                tokenStorage.removeToken(accessTokenKey)
                return response
            },
        }),
        register: build.mutation<null, RegisterFormDara>({
            query: (data) => {
                return {
                    url: apiMap.postRegister,
                    method: 'POST',
                    body: data,
                }
            },
        }),
        confirmEmail: build.mutation({
            query: (data) => {
                return {
                    url: apiMap.postResendVerify,
                    method: 'POST',
                    body: data,
                }
            },
        }),
        forgotPassword: build.mutation({
            query: (data) => {
                return {
                    url: apiMap.postForgotPassword,
                    method: 'POST',
                    body: data,
                }
            },
            transformResponse: (response) => {
                return response
            },
        }),
        resetPassword: build.mutation<null, ResetPasswordData>({
            query: (data) => {
                return {
                    url: apiMap.postResetPassword,
                    method: 'POST',
                    body: data,
                }
            },
        }),
    }),
})

export const {
    useLoginMutation,
    useLogoutMutation,
    useGetMeQuery,
    useRegisterMutation,
    useConfirmEmailMutation,
    useForgotPasswordMutation,
    useResetPasswordMutation,
} = authApi
