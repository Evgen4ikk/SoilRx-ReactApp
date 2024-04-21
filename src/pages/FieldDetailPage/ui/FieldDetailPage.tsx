import { FC } from 'react'
import BackIcon from '@app/icons/back.svg?react'
import { useGetFieldByIdQuery } from '@entities/field'
import { useGetPlotsQuery } from '@entities/plot'
import { FieldDetailCard } from '@features/FieldDetailCard'
import { PlotList } from '@features/PlotList'
import { routeMap } from '@model/api'
import Button from '@ui/Button'
import { ESpacing } from '@ui/Enums/Enums'
import Flex from '@ui/Flex'
import Link from '@ui/Link'
import Paragraph from '@ui/Paragraph'
import Title from '@ui/Title'
import { useParams } from 'react-router'
import { FieldDetailPageLoading } from './FieldDetailPageLoading'

export const FieldDetailPage: FC = () => {
    const params = useParams()
    const id = Number(params.id)

    const { data: field, isLoading } = useGetFieldByIdQuery(id)
    const { data: plotsRes } = useGetPlotsQuery(null)
    const plotsArr = plotsRes?.filter((item) => item.field_id === id)

    if (isLoading) {
        return <FieldDetailPageLoading />
    }

    return (
        <Flex vertical className="mt-10 max-w-[1408px]">
            <Flex align="center" gap={ESpacing.VALUE2} className="mb-8">
                <Link to={routeMap.fields}>
                    <div className="cursor-pointer rounded-lg border border-solid border-border-primary p-3">
                        <BackIcon />
                    </div>
                </Link>
                <Title className="!mb-0 !text-4xl !text-gray-800">
                    {field?.name}
                </Title>
            </Flex>
            {field && <FieldDetailCard field={field} />}
            {plotsArr && plotsArr.length > 0 ? (
                <PlotList data={plotsArr} fieldId={id} />
            ) : (
                <Flex
                    vertical
                    gap={ESpacing.VALUE6}
                    className="mx-auto max-w-[320px] text-center"
                >
                    <Flex vertical gap={ESpacing.VALUE2}>
                        <Title className="!m-0 !text-2xl !text-gray-800">
                            У вас пока нет участков
                        </Title>
                        <Paragraph className="text-base font-medium !text-gray-600">
                            Создайте хотя бы один участок, чтобы получать
                            рекомендации
                        </Paragraph>
                    </Flex>
                    <Link to={routeMap.plotCreate(id)}>
                        <Button className="mx-auto max-w-[180px] bg-accent py-3 font-medium text-white">
                            Добавить участок
                        </Button>
                    </Link>
                </Flex>
            )}
        </Flex>
    )
}
