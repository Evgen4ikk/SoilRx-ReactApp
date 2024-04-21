import { FC } from 'react'
import InfoIcon from '@app/icons/info.svg?react'
import { useGetTopRecommendQuery } from '@entities/recomendation/api/api'
import { ESpacing } from '@ui/Enums/Enums'
import Flex from '@ui/Flex'
import Paragraph from '@ui/Paragraph'
import Title from '@ui/Title'
import { useParams } from 'react-router'

export const CultureRecommendation: FC = () => {
    const params = useParams()
    const id = Number(params.plotId)
    const { data } = useGetTopRecommendQuery(id)
    return (
        data && (
            <Flex vertical gap={ESpacing.VALUE4}>
                <Title className="!m-0 !text-lg !text-gray-800">
                    Рекомендации по высадке культур
                </Title>
                <Paragraph className="text-sm font-medium text-gray-600">
                    Для вашей почвы мы рекомендуем высадку 7-ми культур,
                    подходящих для наибольшей урожайности:
                </Paragraph>
                <Flex gap={ESpacing.VALUE2} wrap="wrap">
                    {data.top_recommendations.map(
                        (title, index, arr) =>
                            index !== arr.length - 1 && (
                                <Paragraph className="rounded-lg bg-gray-200 px-3 py-2 text-sm font-medium text-gray-700">
                                    {title}
                                </Paragraph>
                            ),
                    )}
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
                        Если вы собираетесь прибегнуть к удобрению почвы, для
                        получения новых рекомендаций по высадке культур, вам
                        необходимо повторить анализ почвы
                    </Paragraph>
                </Flex>
            </Flex>
        )
    )
}
