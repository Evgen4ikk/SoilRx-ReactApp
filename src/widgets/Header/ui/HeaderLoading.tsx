import { FC, useContext } from 'react'
import { AuthContext } from '@app/providers/AuthProvider/AuthContext'
import { ESpacing } from '@ui/Enums/Enums'
import Flex from '@ui/Flex'
import { Skeleton } from '@ui/Skeleton/Skeleton'
import { SkeletonBtn } from '@ui/Skeleton/SkeletonBtn'

export const HeaderLoading: FC = () => {
    const { accessToken } = useContext(AuthContext)

    return (
        <header className="fixed top-0 z-[99] w-full">
            <Flex
                align="center"
                className="flex-shrink-0 border-b border-solid border-border-primary bg-white"
            >
                <div className="border-r border-solid border-border-primary px-16 py-5">
                    <img src="/images/Logo.png" alt="Logo" />
                </div>
                <Flex align="center" justify="end" className="w-full">
                    {accessToken ? (
                        <Flex
                            align="center"
                            gap={ESpacing.VALUE2}
                            className="mr-16"
                        >
                            <Skeleton
                                avatar={{
                                    shape: 'square',
                                    size: 'default',
                                    className: '!mt-2',
                                }}
                                title={{
                                    width: 160,
                                    className: '!h-[20px]',
                                }}
                                paragraph={false}
                                className="w-[160px]"
                            />
                            <SkeletonBtn className="!h-[40px]" />
                        </Flex>
                    ) : (
                        <SkeletonBtn className="mr-8 !h-[40px]" />
                    )}
                </Flex>
            </Flex>
        </header>
    )
}
