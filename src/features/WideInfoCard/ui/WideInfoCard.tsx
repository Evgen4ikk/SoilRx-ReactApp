import { FC } from 'react'
import { useGetCropsQuery, useGetSoilTypeQuery } from '@entities/plot'
import { ESpacing } from '@ui/Enums/Enums'
import Flex from '@ui/Flex'
import Paragraph from '@ui/Paragraph'
import Text from '@ui/Text'
import Title from '@ui/Title'

interface IProps {
    area: number
    culture: number
    soil: number
}

export const WideInfoCard: FC<IProps> = ({ area, culture, soil }) => {
    const { data: soils } = useGetSoilTypeQuery(null)
    const { data: crops } = useGetCropsQuery(null)
    const soilItem = soils?.filter((item) => item.id === soil)
    const cropItem = crops?.filter((item) => item.id === culture)
    return (
        <Flex
            vertical
            className="h-[200px] min-w-[400px] rounded-lg border border-solid border-gray-300 p-6"
            gap={ESpacing.VALUE6}
        >
            <Title variant="h4" className="!mb-0 !text-lg font-bold">
                Общая информация
            </Title>
            <Flex gap={ESpacing.VALUE4} vertical>
                <Flex justify="space-between">
                    <Paragraph variant="baseGray600">
                        Площадь, м<sup>2</sup>
                    </Paragraph>
                    <Text variant="baseGray800">{area}</Text>
                </Flex>
                <hr />
                <Flex justify="space-between">
                    <Paragraph variant="baseGray600">
                        Культура высадки
                    </Paragraph>
                    <Text variant="baseGray800">
                        {cropItem && cropItem[0].name}
                    </Text>
                </Flex>
                <Flex justify="space-between">
                    <Paragraph variant="baseGray600">Тип почвы</Paragraph>
                    <Text variant="baseGray800">
                        {soilItem && soilItem[0].name}
                    </Text>
                </Flex>
            </Flex>
        </Flex>
    )
}
