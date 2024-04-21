import { FC } from 'react'
import InfoIcon from '@app/icons/info.svg?react'
import { useGetRecommendQuery } from '@entities/recomendation'
import { ESpacing } from '@ui/Enums/Enums'
import Flex from '@ui/Flex'
import Paragraph from '@ui/Paragraph'
import Title from '@ui/Title'
import { useParams } from 'react-router'

export const SoilRecommendation: FC = () => {
    const params = useParams()
    const id = Number(params.plotId)
    const { data } = useGetRecommendQuery(id)
    const paragArr = data && data.recommend.split('\n')
    const content =
        paragArr &&
        paragArr.map((item) => (
            <Paragraph className="text-sm font-medium text-gray-600">
                {item}
            </Paragraph>
        ))
    return (
        content && (
            <Flex vertical gap={ESpacing.VALUE4}>
                <Title className="!m-0 !text-lg !text-gray-800">
                    Рекомендации по удобрению почвы
                </Title>
                <Flex vertical gap={ESpacing.VALUE2}>
                    <Paragraph className="text-sm font-medium text-gray-600">
                        {content}
                    </Paragraph>
                </Flex>
                <Flex
                    className="relative rounded-lg bg-gray-100 p-4 pl-10"
                    gap={ESpacing.VALUE2}
                >
                    <InfoIcon
                        width={16}
                        height={16}
                        className="absolute left-4 top-4"
                    />
                    <Paragraph className="text-sm font-medium text-gray-700">
                        Нейтральная среда дает возможность оптимального
                        произрастания любой культуры (при прочих оптимальных
                        характеристиках почвы)
                    </Paragraph>
                </Flex>
            </Flex>
        )
    )
}
