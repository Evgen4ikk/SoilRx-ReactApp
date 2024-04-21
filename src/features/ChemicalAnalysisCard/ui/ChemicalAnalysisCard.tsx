import { FC, useState } from 'react'
import PlusIcon from '@app/icons/plus.svg?react'
import { useGetFertileQuery } from '@entities/recomendation'
import AddAnalysisModal from '@features/AddAnalysisModal'
import { cn } from '@lib/dom/classnames'
import Button from '@ui/Button'
import { ESpacing } from '@ui/Enums/Enums'
import Flex from '@ui/Flex'
import Paragraph from '@ui/Paragraph'
import Title from '@ui/Title'

interface IProps {
    id: number
}

export const ChemicalAnalysisCard: FC<IProps> = ({ id }) => {
    const [isWhite, setIsWhite] = useState(false)
    const [isShow, setIsShow] = useState(false)

    const { data } = useGetFertileQuery(id)
    const date = data && new Date(data.Data)
    return (
        <Flex
            vertical
            className={cn(
                'w-[400px] rounded-lg border border-solid border-border-primary p-6',
                !data ? 'h-fit' : 'h-[200px]',
            )}
            gap={ESpacing.VALUE6}
        >
            <AddAnalysisModal isShow={isShow} setIsShow={setIsShow} />
            <Flex align="center" justify="space-between">
                <Title className="!m-0 !text-lg !text-gray-800">
                    Химический анализ
                </Title>
                <Button
                    variant="iconText"
                    classNames={{
                        icon: 'self-center !mr-0',
                    }}
                    icon={
                        <PlusIcon
                            width={8}
                            height={8}
                            className={`${isWhite && '[&>path]:fill-white'}`}
                        />
                    }
                    onMouseEnter={() => setIsWhite(true)}
                    onMouseLeave={() => setIsWhite(false)}
                    onClick={() => setIsShow(true)}
                >
                    Добавить
                </Button>
            </Flex>
            {data && (
                <Flex vertical gap={ESpacing.VALUE4}>
                    <Flex align="center" justify="space-between">
                        <Paragraph className="text-base font-medium text-gray-600">
                            Дата исследования
                        </Paragraph>
                        <Paragraph className="text-base font-medium text-gray-800">
                            {date && `${date.toLocaleDateString('ru-RU')}`}
                        </Paragraph>
                    </Flex>
                    <div className="h-[1px] w-full bg-border-primary" />
                    <Flex align="center" justify="space-between">
                        <Paragraph className="text-base font-medium capitalize text-gray-600">
                            {data.soil}
                        </Paragraph>
                    </Flex>
                </Flex>
            )}
        </Flex>
    )
}
