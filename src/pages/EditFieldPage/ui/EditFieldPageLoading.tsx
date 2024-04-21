import { FC } from 'react'
import { ESpacing } from '@ui/Enums/Enums'
import Flex from '@ui/Flex'
import { Skeleton } from '@ui/Skeleton/Skeleton'
import { SkeletonBtn } from '@ui/Skeleton/SkeletonBtn'
import { SkeletonInput } from '@ui/Skeleton/SkeletonInput'

export const EditFieldPageLoading: FC = () => {
    return (
        <Flex vertical gap={ESpacing.VALUE6} className="mt-10 max-w-[600px]">
            <Flex vertical gap={ESpacing.VALUE4}>
                <Skeleton
                    avatar={false}
                    paragraph={false}
                    title={{ width: '200px', className: '!h-[28px]' }}
                />
                <Skeleton
                    avatar={false}
                    paragraph={{
                        rows: 1,
                        width: '300px',
                        className: '!h-[28px]',
                    }}
                    title={false}
                />
            </Flex>
            <Flex vertical gap={ESpacing.VALUE6}>
                <Flex vertical gap={ESpacing.VALUE1}>
                    <Skeleton
                        avatar={false}
                        title={false}
                        paragraph={{
                            rows: 1,
                            width: '200px',
                            className: '!h-[19px]',
                        }}
                    />
                    <SkeletonInput size="large" className="!w-full" />
                </Flex>
                <Flex vertical gap={ESpacing.VALUE1}>
                    <Skeleton
                        avatar={false}
                        title={false}
                        paragraph={{
                            rows: 1,
                            width: '200px',
                            className: '!h-[19px]',
                        }}
                    />
                    <SkeletonInput size="large" className="!w-full" />
                </Flex>
                <Flex vertical gap={ESpacing.VALUE1}>
                    <Skeleton
                        avatar={false}
                        title={false}
                        paragraph={{
                            rows: 1,
                            width: '200px',
                            className: '!h-[19px]',
                        }}
                    />
                    <SkeletonInput size="large" className="!w-full" />
                </Flex>
            </Flex>
            <Flex gap={ESpacing.VALUE2}>
                <SkeletonBtn size="large" className="!w-[130px]" />
                <SkeletonBtn size="large" className="!w-[220px]" />
            </Flex>
        </Flex>
    )
}
