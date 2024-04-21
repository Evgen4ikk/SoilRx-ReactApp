import { memo, Suspense, useCallback, useContext } from 'react'
import { routeMap } from '@model/api'
import { AddFieldPage } from '@pages/AddFieldPage'
import { EditFieldPage } from '@pages/EditFieldPage'
import { FieldDetailPage } from '@pages/FieldDetailPage'
import { FieldsPage } from '@pages/FiledsPage'
import { ForgotPasswordPage } from '@pages/ForgotPasswordPage'
import { LoginPage } from '@pages/LoginPage'
import { MainPage } from '@pages/MainPage'
import { PlotFormPage } from '@pages/PlotFormPage'
import { PlotPage } from '@pages/PlotPage'
import { ProfilePage } from '@pages/ProfilePage'
import { RegistrationPage } from '@pages/RegistrationPage'
import { ResetPasswordPage } from '@pages/ResetPasswordPage'
import { Route, Routes } from 'react-router-dom'
import { AuthContext } from '../AuthProvider/AuthContext'

type TRoute = {
    path: string
    element: JSX.Element
}

const AppRouter = () => {
    const { accessToken } = useContext(AuthContext)

    const PublicRoutes: TRoute[] = [
        { path: routeMap.home, element: <MainPage /> },
        { path: routeMap.login, element: <LoginPage /> },
        { path: routeMap.register, element: <RegistrationPage /> },
        { path: routeMap.forgotPassword, element: <ForgotPasswordPage /> },
        { path: routeMap.resetPassword, element: <ResetPasswordPage /> },
        { path: routeMap.notFound, element: <LoginPage /> },
    ]

    const PrivateRoutes: TRoute[] = [
        { path: routeMap.home, element: <MainPage /> },
        { path: routeMap.fields, element: <FieldsPage /> },
        { path: routeMap.fieldCreate, element: <AddFieldPage /> },
        {
            path: routeMap.fieldEdit(':id'),
            element: <EditFieldPage />,
        },
        {
            path: routeMap.plotCreate(':fieldId'),
            element: <PlotFormPage isAddingPlot={true} />,
        },
        { path: routeMap.fieldDetail(':id'), element: <FieldDetailPage /> },
        {
            path: routeMap.plotEdit(':fieldId', ':plotId'),
            element: <PlotFormPage isAddingPlot={false} />,
        },
        {
            path: routeMap.plotDetail(':fieldId', ':plotId'),
            element: <PlotPage />,
        },
        {
            path: routeMap.profile,
            element: <ProfilePage />,
        },
        { path: routeMap.notFound, element: <FieldsPage /> },
    ]

    const renderWithWrapper = useCallback((route: TRoute) => {
        const element = (
            <Suspense fallback="Loading...">{route.element}</Suspense>
        )

        return <Route key={route.path} path={route.path} element={element} />
    }, [])

    const routes = accessToken ? PrivateRoutes : PublicRoutes

    return <Routes>{routes.map(renderWithWrapper)}</Routes>
}

export default memo(AppRouter)
