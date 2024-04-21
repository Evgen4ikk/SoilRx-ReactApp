import { ReactNode } from 'react'
import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { baseApi } from '@shared/api/api'
import { Provider } from 'react-redux'

const store = configureStore({
    reducer: {
        [baseApi.reducerPath]: baseApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(baseApi.middleware),
})

setupListeners(store.dispatch)

export const StoreProvider = ({ children }: { children: ReactNode }) => {
    return <Provider store={store}>{children}</Provider>
}
