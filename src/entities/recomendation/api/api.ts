import { baseApi } from '@shared/api/api'
import { apiMap } from '@shared/model/api'
import {
    AnalysisItem,
    FertileData,
    Recommendation,
    TopRecomendations,
} from '../model/types'

export const recommendationApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getFertile: build.query<FertileData, number>({
            query: (id) => {
                return {
                    url: apiMap.getFertile + id,
                }
            },
            providesTags: () => [
                {
                    type: 'plot',
                },
            ],
        }),
        getAnalysis: build.query<{ [key: string]: AnalysisItem }, number>({
            query: (id) => {
                return {
                    url: apiMap.getAnalysis + id,
                }
            },
            providesTags: () => [
                {
                    type: 'plot',
                },
            ],
        }),
        getTopRecommend: build.query<TopRecomendations, number>({
            query: (id) => {
                return {
                    url: apiMap.getTopRecomend + id,
                }
            },
            providesTags: () => [
                {
                    type: 'plot',
                },
            ],
        }),
        getRecommend: build.query<Recommendation, number>({
            query: (id) => {
                return {
                    url: apiMap.getRecomend + id,
                }
            },
            providesTags: () => [
                {
                    type: 'plot',
                },
            ],
        }),
        getPh: build.query<{ ph: string }, number>({
            query: (id) => {
                return {
                    url: apiMap.getPh + id,
                }
            },
            providesTags: () => [
                {
                    type: 'plot',
                },
            ],
        }),
        generatePdf: build.query<string, number>({
            query: (id) => {
                return {
                    url: apiMap.generatePdf + id,
                    responseHandler: 'content-type',
                }
            },
            transformResponse: (res: string) => {
                const blob = new Blob([res], {
                    type: 'application/pdf;charset=utf-8',
                })
                return URL.createObjectURL(blob)
            },
        }),
    }),
})

export const {
    useGetFertileQuery,
    useGetAnalysisQuery,
    useGetTopRecommendQuery,
    useGetRecommendQuery,
    useGetPhQuery,
    useGeneratePdfQuery,
} = recommendationApi
