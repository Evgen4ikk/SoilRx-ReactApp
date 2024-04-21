import { FC } from 'react'
import StackItem, { StackType } from '@features/StackItem'
import { ESpacing } from '@ui/Enums/Enums'
import Flex from '@ui/Flex'

interface IProps {
    data: Array<StackType>
}

export const PlotStack: FC<IProps> = ({ data }) => {
    return (
        <Flex vertical gap={ESpacing.VALUE2} className="w-[768px]">
            {data.map((item) => (
                <StackItem
                    id={item.id}
                    title={item.title}
                    area={item.area}
                    culture={item.culture}
                />
            ))}
        </Flex>
    )
}
