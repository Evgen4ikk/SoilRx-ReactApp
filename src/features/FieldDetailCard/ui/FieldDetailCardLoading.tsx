import { FC } from 'react'
import { ESpacing } from '@ui/Enums/Enums'
import Flex from '@ui/Flex'
import { Skeleton } from '@ui/Skeleton/Skeleton'
import { SkeletonImage } from '@ui/Skeleton/SkeletonImage'

export const FieldDetailCardLoading: FC = () => {
    return (
        <Flex
            justify="space-between"
            className="mb-10 rounded-lg border border-solid border-border-primary p-4"
        >
            <Flex gap={ESpacing.VALUE4}>
                <SkeletonImage className="!h-[165px] !w-[340px] !rounded-xl" />
                <Flex vertical gap={ESpacing.VALUE4}>
                    <Skeleton
                        avatar={false}
                        paragraph={false}
                        title={{
                            width: '180px',
                            className: '!h-[22px]',
                        }}
                    />
                    <Flex justify="space-between" gap={ESpacing.VALUE2}>
                        <Skeleton
                            avatar={false}
                            title={false}
                            paragraph={{
                                rows: 1,
                                width: '350px',
                                className: '!h-[20px]',
                            }}
                        />
                    </Flex>
                    <div className="h-[1px] w-full bg-border-primary" />
                    <Flex justify="space-between" gap={ESpacing.VALUE2}>
                        <Skeleton
                            avatar={false}
                            title={false}
                            paragraph={{
                                rows: 1,
                                width: '350px',
                                className: '!h-[20px]',
                            }}
                        />
                    </Flex>
                    <div className="h-[1px] w-full bg-border-primary" />
                    <Flex justify="space-between" gap={ESpacing.VALUE2}>
                        <Skeleton
                            avatar={false}
                            title={false}
                            paragraph={{
                                rows: 1,
                                width: '350px',
                                className: '!h-[20px]',
                            }}
                        />
                    </Flex>
                </Flex>
            </Flex>
        </Flex>
    )
}
