import { Layout } from '@widgets/Layout'
import './index.css'
import AppRouter from './providers/RouterProvider/AppRouter'

export const App = () => {
    return (
        <Layout>
            <AppRouter />
        </Layout>
    )
}
