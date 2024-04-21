import { FC, useContext } from 'react'
import { AuthContext } from '@app/providers/AuthProvider/AuthContext'
import { useGetMeQuery } from '@entities/Auth/login/api/api'
import { HeaderProfile } from '@features/HeaderProfile'
import { routeMap } from '@shared/model/api'
import Button from '@ui/Button'
import Flex from '@ui/Flex'
import Link from '@ui/Link'
import Paragraph from '@ui/Paragraph'
import Text from '@ui/Text'
import { useLocation } from 'react-router'
import { HeaderLoading } from './HeaderLoading'

export const Header: FC = () => {
    const { data: user, isLoading } = useGetMeQuery(null)

    const { accessToken, setAccessToken } = useContext(AuthContext)

    const location = useLocation()
    const currentPath = location.pathname
    const isFieldsPage = currentPath === routeMap.fields

    if (isLoading) {
        return <HeaderLoading />
    }

    return (
        <header className="fixed top-0 z-40 w-full !bg-white">
            <Flex
                align="center"
                className="flex-shrink-0 border-b border-solid border-border-primary bg-white"
            >
                <div className="border-r border-solid border-border-primary px-16 py-5">
                    <Link to={routeMap.home}>
                        <img src="/images/Logo.png" alt="Logo" />
                    </Link>
                </div>
                <Flex align="center" justify="space-between" className="w-full">
                    <nav className="ml-10">
                        {user && accessToken && (
                            <ul className="flex items-center gap-8">
                                <li>
                                    <Link to={routeMap.fields}>
                                        <Paragraph
                                            className={`relative !mb-0 text-base font-medium transition-colors hover:text-accent ${isFieldsPage ? 'text-accent' : 'text-gray-600'}`}
                                        >
                                            Мои поля
                                            {isFieldsPage && (
                                                <Text className="absolute -bottom-2.5 left-0 h-1 w-full bg-accent" />
                                            )}
                                        </Paragraph>
                                    </Link>
                                </li>
                            </ul>
                        )}
                    </nav>
                    {user && accessToken ? (
                        <HeaderProfile
                            user={user}
                            className="mr-16"
                            setAccessToken={setAccessToken}
                        />
                    ) : (
                        <Link to={routeMap.login}>
                            <Button className="text-s7 mr-16 rounded border-none px-3 py-4 font-inter font-medium text-accent">
                                Войти
                            </Button>
                        </Link>
                    )}
                </Flex>
            </Flex>
        </header>
    )
}
