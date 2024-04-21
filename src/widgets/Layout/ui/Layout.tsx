import { ReactNode } from 'react'
import OopsIcon from '@app/icons/oops.svg?react'
import { cn } from '@lib/dom/classnames'
import { routeMap } from '@model/api'
import Flex from '@ui/Flex'
import Title from '@ui/Title'
import { Footer } from '@widgets/Footer'
import { Header } from '@widgets/Header'
import { useLocation } from 'react-router'

export const Layout = ({ children }: { children: ReactNode }) => {
    const location = useLocation()
    const currentPath = location.pathname
    const isHomePage = currentPath === routeMap.home

    return (
        <div className="flex h-[100vh] flex-col max-xl:!h-full">
            <Header />
            <main
                className={cn(
                    'my-20 flex-1 max-xl:!mx-0 max-xl:!my-0',
                    isHomePage ? 'mx-auto max-w-[1792px] px-8' : 'container',
                )}
            >
                {children}
            </main>
            <Footer />
            <Flex
                vertical
                align="center"
                justify="flex-start"
                className="fixed inset-x-0 inset-y-0 !z-50 hidden bg-white pt-10 max-xl:!flex"
            >
                <OopsIcon className="h-adaptive w-adaptive" />
                <Title className="!text-adaptive text-center">
                    Приносим свои извинения. <br /> Мобильная версия сайта ещё в
                    разработке
                </Title>
            </Flex>
        </div>
    )
}
