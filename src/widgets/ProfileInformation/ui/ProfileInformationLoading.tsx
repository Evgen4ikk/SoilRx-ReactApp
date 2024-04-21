import { FC } from 'react'
import { ESpacing } from '@ui/Enums/Enums'
import Flex from '@ui/Flex'
import { Skeleton } from '@ui/Skeleton/Skeleton'
import { SkeletonBtn } from '@ui/Skeleton/SkeletonBtn'
import { SkeletonInput } from '@ui/Skeleton/SkeletonInput'

export const ProfileInformationLoading: FC = () => {
    return (
        <Flex vertical gap={ESpacing.VALUE8}>
            <Flex vertical gap={ESpacing.VALUE4}>
                <Skeleton
                    paragraph={false}
                    avatar={false}
                    title={{
                        width: '190px',
                        className: '!h-6',
                    }}
                />
                <Flex vertical gap={ESpacing.VALUE2}>
                    <SkeletonInput className="!w-full" size="large" />
                    <SkeletonInput className="!w-full" size="large" />
                    <SkeletonInput className="!w-full" size="large" />
                </Flex>
            </Flex>
            <Flex vertical gap={ESpacing.VALUE4}>
                <Skeleton
                    paragraph={false}
                    avatar={false}
                    title={{
                        width: '190px',
                        className: '!h-6',
                    }}
                />
                <Flex vertical gap={ESpacing.VALUE2}>
                    <SkeletonInput className="!w-full" size="large" />
                    <SkeletonInput className="!w-full" size="large" />
                </Flex>
            </Flex>
            <Flex gap={ESpacing.VALUE2}>
                <SkeletonBtn className="!h-[38px] !w-[150px]" />
                <SkeletonBtn className="!h-[38px] !w-[75px]" />
            </Flex>
        </Flex>
    )
}
