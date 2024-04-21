import React, { createContext, useEffect, useState } from 'react'
import { setRefreshAccessTokenCallback } from '@shared/api/query'
import { accessTokenKey } from '@shared/model/localStorageKeys'
import { TokenStorage } from '@shared/model/tokenStorage'

interface AuthContextType {
    accessToken: string | null
    setAccessToken: (token: string | null) => void
}

export const AuthContext = createContext<AuthContextType>({
    accessToken: null,
    setAccessToken: () => {},
})

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const tokenStorage = new TokenStorage()
    const [accessToken, setAccessToken] = useState<string | null>(
        tokenStorage.getToken(accessTokenKey) || null,
    )

    const updateAccessTokenFromStorage = () => {
        const storedAccessToken = tokenStorage.getToken(accessTokenKey)
        setAccessToken(storedAccessToken || null)
    }

    useEffect(() => {
        const handleStorageChange = () => {
            updateAccessTokenFromStorage()
        }

        const handleRefreshAccessToken = () => {
            setAccessToken(null)
        }

        updateAccessTokenFromStorage()

        window.addEventListener('storage', handleStorageChange)
        setRefreshAccessTokenCallback(handleRefreshAccessToken)

        return () => {
            window.removeEventListener('storage', handleStorageChange)
            setRefreshAccessTokenCallback(() => {})
        }
    }, [])

    return (
        <AuthContext.Provider value={{ accessToken, setAccessToken }}>
            {children}
        </AuthContext.Provider>
    )
}
