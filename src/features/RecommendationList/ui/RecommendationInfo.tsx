import { FC } from 'react'
import InfoIcon from '@app/icons/info.svg?react'
import { ESpacing } from '@ui/Enums/Enums'
import Flex from '@ui/Flex'
import Paragraph from '@ui/Paragraph'
import Title from '@ui/Title'

const data = [
    {
        title: 'Лук репчатый',
    },
    {
        title: 'Перец чили',
    },
    {
        title: 'Капуста',
    },
    {
        title: 'Грибы',
    },
    {
        title: 'Бутылочная тыква',
    },
    {
        title: 'Цветная капуста',
    },
    {
        title: 'Огурец',
    },
]

export const RecommendationInfo: FC = () => {
    return (
        <Flex vertical>
            <Flex vertical gap={ESpacing.VALUE4} className="pb-7">
                <Title className="!m-0 !text-lg !text-gray-800">
                    Рекомендации по удобрению почвы
                </Title>
                <Flex vertical gap={ESpacing.VALUE2} className="">
                    <Paragraph className="text-sm font-medium text-gray-600">
                        Почва на вашем участке является
                        антропогенно-преобразованной, ранее была щедро удобрена
                        K2O, NO3, P2O. Относится к загрязненным почвам по K2O,
                        NO3.
                    </Paragraph>
                    <Paragraph className="text-sm font-medium text-gray-600">
                        Рекомендуем не вводить в эксплуатацию участок 1-3 года и
                        повторить анализы. На ваше усмотрение можете высадить
                        кормовые культуры.
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
            <Flex
                vertical
                gap={ESpacing.VALUE4}
                className="border-t border-solid border-gray-300 pt-6"
            >
                <Title className="!m-0 !text-lg !text-gray-800">
                    Рекомендации по высадке культур
                </Title>
                <Paragraph className="text-sm font-medium text-gray-600">
                    Для вашей почвы мы рекомендуем высадку 7-ми культур,
                    подходящих для наибольшей урожайности:
                </Paragraph>
                <Flex gap={ESpacing.VALUE2} wrap="wrap">
                    {data.map((data) => (
                        <Paragraph className="rounded-lg bg-gray-200 px-3 py-2 text-sm font-medium text-gray-700">
                            {data.title}
                        </Paragraph>
                    ))}
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
        </Flex>
    )
}
