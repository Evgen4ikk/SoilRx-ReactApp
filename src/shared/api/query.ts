import {
    fetchBaseQuery,
    type BaseQueryFn,
    type FetchArgs,
} from '@reduxjs/toolkit/query/react'
import { jwtDecode } from 'jwt-decode'
import { apiMap } from '../model/api'
import { accessTokenKey } from '../model/localStorageKeys'
import { TokenStorage } from '../model/tokenStorage'
import { ApiError } from './types'

const tokenStorage = new TokenStorage()

let refreshAccessTokenCallback: () => void

export const setRefreshAccessTokenCallback = (callback: () => void) => {
    refreshAccessTokenCallback = callback
}

const _baseQuery = fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_BASE_URL,
    prepareHeaders: (headers) => {
        headers.set(
            'Authorization',
            tokenStorage.getToken(accessTokenKey)
                ? 'Bearer ' + tokenStorage.getToken(accessTokenKey)
                : '',
        )
        return headers
    },
}) as BaseQueryFn<string | FetchArgs, unknown, ApiError, {}>

export const baseQueryWithRefresh: BaseQueryFn<
    string | FetchArgs,
    unknown,
    ApiError,
    {}
> = async (args, api, extraOptions) => {
    let result = await _baseQuery(args, api, extraOptions)
    const accessToken = tokenStorage.getToken(accessTokenKey)

    if (result.error && result.error.status === 401) {
        try {
            const refreshResponse: any = await _baseQuery(
                {
                    url: apiMap.postTokenRefresh,
                    method: 'POST',
                    body: {},
                },
                api,
                extraOptions,
            )

            if (refreshResponse.data) {
                tokenStorage.addToken(
                    accessTokenKey,
                    refreshResponse.data.access_token,
                )
            } else {
                tokenStorage.removeToken(accessTokenKey)
                refreshAccessTokenCallback()
            }
        } catch (e: any) {
            throw new Error(e)
        }
    }

    if (accessToken) {
        const decodedToken = jwtDecode(accessToken)

        if (decodedToken.exp !== undefined) {
            const currentTime = Date.now() / 1000
            if (decodedToken.exp - currentTime < 600) {
                try {
                    const refreshResponse: any = await _baseQuery(
                        {
                            url: apiMap.postTokenRefresh,
                            method: 'POST',
                            body: {},
                        },
                        api,
                        extraOptions,
                    )
                    if (refreshResponse.data) {
                        tokenStorage.addToken(
                            accessTokenKey,
                            refreshResponse.data.access_token,
                        )
                    } else {
                        tokenStorage.removeToken(accessTokenKey)
                        refreshAccessTokenCallback()
                    }
                } catch (e: any) {
                    throw new Error(e)
                }
            }
        }
    }

    return result
}
