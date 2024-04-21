import { FC } from 'react'
import { useGetPhQuery } from '@entities/recomendation'
import { ESpacing } from '@ui/Enums/Enums'
import Flex from '@ui/Flex'
import Paragraph from '@ui/Paragraph'
import Progress from '@ui/Progress'
import Title from '@ui/Title'
import { useParams } from 'react-router'

const strokeColor = {
    '0%': 'var(--warning-primary)',
    '100%': 'var(--success-primary)',
}

export const HydrogenUnloadingCard: FC = () => {
    const params = useParams()
    const id = Number(params.plotId)
    //TODO: connect ph analysis API
    const { data } = useGetPhQuery(id)
    if (!data) {
        return null
    }
    return (
        <Flex
            vertical
            className="w-[816px] rounded-lg border border-solid border-border-primary p-6"
            gap={ESpacing.VALUE6}
        >
            <Flex vertical gap={ESpacing.VALUE2}>
                <Title className="!m-0 !text-lg !text-gray-800">
                    Выгрузка по pH
                </Title>
                <Paragraph className="text-sm font-medium text-gray-600">
                    Текущее состояние подсвечено
                </Paragraph>
            </Flex>
            <Flex vertical gap={ESpacing.VALUE4}>
                <Progress
                    showInfo={false}
                    percent={(parseFloat(data.ph) / 14) * 100}
                    status="normal"
                    strokeColor={strokeColor}
                    strokeWidth={8}
                    trailColor={'var(--success-secondary)'}
                />
                <Flex align="center" justify="space-between">
                    <Paragraph className="text-base font-medium text-gray-500">
                        Кислотная: 0-5,9
                    </Paragraph>
                    <Paragraph className="text-base font-medium text-gray-800">
                        Нейтральная: 6,0-7,4
                    </Paragraph>
                    <Paragraph className="text-base font-medium text-gray-500">
                        Щелочная: 7,5-14,0
                    </Paragraph>
                </Flex>
            </Flex>
        </Flex>
    )
}
