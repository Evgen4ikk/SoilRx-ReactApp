import { FC } from 'react'
import { ResultItem } from '@entities/recomendation/model/types'
import { ESpacing } from '@ui/Enums/Enums'
import Flex from '@ui/Flex'
import Paragraph from '@ui/Paragraph'
import Text from '@ui/Text'
import Title from '@ui/Title'

interface IProps {
    results: Array<ResultItem>
}

export const AnalysResult: FC<IProps> = ({ results }) => {
    const values = ['>200%', '150%', '125%', '100%', '50%', '25%', '0%']
    const content = values.map((item, index) => {
        return index === 3 ? (
            <Flex
                align="center"
                gap={ESpacing.VALUE4}
                className="h-[12,5%] rounded bg-success-secondary py-2 pr-2"
            >
                <Flex align="center" justify="flex-end" className="w-[7%]">
                    <Paragraph variant="smGray500" className="!text-success">
                        {item}
                    </Paragraph>
                </Flex>
                <hr className="w-full border border-dashed border-success" />
            </Flex>
        ) : (
            <Flex
                align="center"
                gap={ESpacing.VALUE4}
                className="h-[12,5%] py-2 pr-2"
            >
                <Flex align="center" justify="flex-end" className="w-[7%]">
                    <Paragraph variant="smGray500">{item}</Paragraph>
                </Flex>
                <hr className="w-full border border-dashed border-gray-300" />
            </Flex>
        )
    })
    const charts = results.map((item) => {
        const date = item.date.toLocaleDateString('ru-RU', {
            day: '2-digit',
            month: '2-digit',
        })
        return (
            <Flex
                vertical
                gap={ESpacing.VALUE4}
                justify="flex-end"
                align="center"
                className="relative h-full w-[88px]"
            >
                <Flex align="flex-end" gap={ESpacing.VALUE4} className="h-full">
                    <div
                        style={{ height: `${item.k / 2}%` }}
                        className="w-4 rounded-lg bg-gray-600"
                    ></div>
                    <div
                        style={{ height: `${item.p / 2}%` }}
                        className="w-4 rounded-lg bg-gray-500"
                    ></div>
                    <div
                        style={{ height: `${item.n / 2}%` }}
                        className="w-4 rounded-lg bg-gray-400"
                    ></div>
                </Flex>
                <Flex align="center">
                    <Paragraph variant="smGray500">{date}</Paragraph>
                </Flex>
            </Flex>
        )
    })
    return (
        <Flex
            gap={ESpacing.VALUE6}
            vertical
            className="max-w-[816px] rounded-lg border border-solid border-gray-300 p-6"
        >
            <Flex gap={ESpacing.VALUE2} vertical>
                <Title variant="h4" className="!mb-0 !text-lg font-bold">
                    Результаты анализа
                </Title>
                <Paragraph variant="smGray600">
                    Результаты во времени, в %
                </Paragraph>
            </Flex>
            <Flex gap={ESpacing.VALUE4}>
                <Flex
                    align="center"
                    justify="flex-end"
                    className="relative min-w-[45px]"
                >
                    <Text
                        variant="radialBar"
                        className="before:absolute before:left-0 before:top-[calc(50%-5px)] before:h-2 before:w-2 before:rounded-full before:bg-gray-600 before:content-['']"
                    >
                        K20
                    </Text>
                </Flex>
                <Flex
                    align="center"
                    justify="flex-end"
                    className="relative min-w-[45px]"
                >
                    <Text
                        variant="radialBar"
                        className="before:absolute before:left-0 before:top-[calc(50%-5px)] before:h-2 before:w-2 before:rounded-full before:bg-gray-500 before:content-['']"
                    >
                        PO2
                    </Text>
                </Flex>
                <Flex
                    align="center"
                    justify="flex-end"
                    className="relative min-w-[45px]"
                >
                    <Text
                        variant="radialBar"
                        className="before:absolute before:left-0 before:top-[calc(50%-5px)] before:h-2 before:w-2 before:rounded-full before:bg-gray-400 before:content-['']"
                    >
                        NO3
                    </Text>
                </Flex>
            </Flex>
            <Flex vertical className="relative h-[255px]">
                {content}
                <Flex
                    align="flex-end"
                    justify="flex-start"
                    gap={54}
                    className="absolute right-5 !h-full w-[90%] pl-5"
                >
                    {charts}
                </Flex>
            </Flex>
        </Flex>
    )
}
