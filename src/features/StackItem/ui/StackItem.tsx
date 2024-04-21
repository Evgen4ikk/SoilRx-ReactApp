import DeleteIcon from '@app/icons/delete.svg?react'
import { useDeletePlotMutation, useGetCropsQuery } from '@entities/plot'
import { ESpacing } from '@ui/Enums/Enums'
import Flex from '@ui/Flex'
import Paragraph from '@ui/Paragraph'
import Text from '@ui/Text'

export type StackType = {
    id: number
    title: string
    area: number
    culture: number
}

export const StackItem = (props: StackType) => {
    const { id, title, area, culture } = props
    const [deletePlot] = useDeletePlotMutation()
    const { data: crops } = useGetCropsQuery(null)
    const cropItem = crops?.filter((item) => item.id === culture)
    const deleteHandle = async () => {
        await deletePlot(id)
    }
    return (
        <Flex
            vertical
            gap={ESpacing.VALUE4}
            className="rounded-lg bg-gray-100 p-6"
        >
            <Flex justify="space-between" align="center">
                <Text className="text-lg font-bold text-gray-800">{title}</Text>
                <div
                    className="cursor-pointer rounded-lg bg-beige p-4"
                    onClick={deleteHandle}
                >
                    <DeleteIcon />
                </div>
            </Flex>
            <Flex gap={ESpacing.VALUE6}>
                <Flex gap={ESpacing.VALUE2}>
                    <Paragraph className="text-base font-medium text-gray-600">
                        Площадь, м<sup>2</sup>
                    </Paragraph>
                    <Text className="text-base font-medium text-gray-800">
                        {area}
                    </Text>
                </Flex>
                <Flex gap={ESpacing.VALUE2}>
                    <Paragraph className="text-base font-medium text-gray-600">
                        Кульутра для высадки
                    </Paragraph>
                    <Text className="text-base font-medium text-gray-800">
                        {cropItem && cropItem[0].name}
                    </Text>
                </Flex>
            </Flex>
        </Flex>
    )
}
