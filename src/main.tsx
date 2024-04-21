import React from 'react'
import { App } from '@app/App'
import { AuthProvider } from '@app/providers/AuthProvider/AuthContext'
import { ErrorBoundary } from '@app/providers/ErrorBoundary'
import { StoreProvider } from '@app/providers/StoreProvider'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

const root = ReactDOM.createRoot(document.getElementById('root')!)

root.render(
    <React.StrictMode>
        <ErrorBoundary>
            <AuthProvider>
                <StoreProvider>
                    <BrowserRouter>
                        <App />
                    </BrowserRouter>
                </StoreProvider>
            </AuthProvider>
        </ErrorBoundary>
    </React.StrictMode>,
)
