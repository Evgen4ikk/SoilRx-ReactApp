import { routeMap } from '@shared/model/api'
import { ESpacing } from '@ui/Enums/Enums'
import Flex from '@ui/Flex'
import Link from '@ui/Link'
import Text from '@ui/Text'
import { useLocation } from 'react-router'

export const Footer = () => {
    const location = useLocation()
    const currentPath = location.pathname
    const isHomePage = currentPath === routeMap.home

    return (
        <footer className="w-full flex-shrink-0 border-t-1 border-solid border-gray-300">
            {!isHomePage ? (
                <Flex className="my-8">
                    <Flex justify="center" className="my-12 w-1/2">
                        <Text variant="simpleGray">
                            Copyright ©2024 SoilRX. All rights reserved
                        </Text>
                    </Flex>
                    <Flex vertical align="center" className="w-1/2">
                        <Flex vertical className="w-fit">
                            <Text variant="simpleGray" className="mb-5">
                                Пользователям
                            </Text>
                            <Link
                                to={routeMap.privacy}
                                variant="simpleMarginBlack"
                            >
                                Политика конфиденциальности
                            </Link>
                            <Link
                                to={routeMap.public}
                                variant="simpleMarginBlack"
                            >
                                Публичная оферта
                            </Link>
                        </Flex>
                    </Flex>
                </Flex>
            ) : (
                <Flex
                    vertical
                    align="center"
                    gap={ESpacing.VALUE8}
                    className="my-10 ml-10 w-1/2"
                >
                    <Flex vertical gap={ESpacing.VALUE4}>
                        <Link
                            to={routeMap.privacy}
                            variant="simpleMarginBlack"
                            className="!m-0 !text-lg !text-gray-500 hover:!text-gray-800"
                        >
                            Политика конфиденциальности
                        </Link>
                        <Link
                            to={routeMap.public}
                            variant="simpleMarginBlack"
                            className="!m-0 !text-lg !text-gray-500 hover:!text-gray-800"
                        >
                            Публичная оферта
                        </Link>
                    </Flex>
                    <Text variant="simpleGray" className="!text-sm">
                        Copyright ©2024 SoilRX. All rights reserved
                    </Text>
                </Flex>
            )}
        </footer>
    )
}
