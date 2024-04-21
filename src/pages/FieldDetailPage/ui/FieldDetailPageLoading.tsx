import { FC } from 'react'
import { FieldDetailCardLoading } from '@features/FieldDetailCard'
import { ESpacing } from '@ui/Enums/Enums'
import Flex from '@ui/Flex'
import { Skeleton } from '@ui/Skeleton/Skeleton'

export const FieldDetailPageLoading: FC = () => {
    return (
        <Flex vertical className="mt-10" gap={ESpacing.VALUE8}>
            <Skeleton
                avatar={false}
                paragraph={false}
                title={{ width: '250px', className: '!h-[44px]' }}
            />
            <FieldDetailCardLoading />
        </Flex>
    )
}
