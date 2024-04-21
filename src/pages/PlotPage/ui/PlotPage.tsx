import { useState } from 'react'
import BackIcon from '@app/icons/back.svg?react'
import DeleteIcon from '@app/icons/delete.svg?react'
import EditIcon from '@app/icons/edit.svg?react'
import { useDeletePlotMutation, useGetPlotByIdQuery } from '@entities/plot'
import { useGetAnalysisQuery } from '@entities/recomendation/api/api'
import { ResultItem } from '@entities/recomendation/model/types'
import AnalysResult from '@features/AnalysResult'
import { ChemicalAnalysisCard } from '@features/ChemicalAnalysisCard'
import ConfirmRemoveForm from '@features/ConfirmRemoveForm'
import { CurrentRecommendation } from '@features/CurrentRecommendation'
import { HydrogenUnloadingCard } from '@features/HydrogenUnloadingCard'
import WideInfoCard from '@features/WideInfoCard'
import { Message } from '@lib/ui/message'
import { routeMap } from '@model/api'
import { ESpacing } from '@ui/Enums/Enums'
import Flex from '@ui/Flex'
import Link from '@ui/Link'
import Title from '@ui/Title'
import { useNavigate, useParams } from 'react-router'

export const PlotPage = () => {
    const [isShowModal, setIsShowModal] = useState(false)

    const params = useParams()
    const fieldId = Number(params.fieldId)
    const plotId = Number(params.plotId)

    const navigate = useNavigate()

    const { data, isLoading } = useGetPlotByIdQuery(plotId)
    const { data: analysis } = useGetAnalysisQuery(plotId)
    const [deletePlot] = useDeletePlotMutation()
    let analysisData: Array<ResultItem> = []
    for (const [_, value] of Object.entries(analysis ? analysis : {})) {
        analysisData.push({
            n: parseFloat(value.nitric_oxide),
            p: parseFloat(value.phosphorus_oxide),
            k: parseFloat(value.potassium_oxide),
            date: new Date(value.created_at),
        })
    }

    const handleDelete = async () => {
        try {
            await deletePlot(plotId)
        } catch {
            return Message({
                type: 'error',
                content: 'Участок не был удален',
            })
        }
        navigate(routeMap.fieldDetail(fieldId))
    }

    if (isLoading) {
        return <div className="mt-10">Загрузка...</div>
    }

    return (
        <Flex gap={ESpacing.VALUE8} vertical className="mt-8">
            <ConfirmRemoveForm
                title={`Вы действительно хотите удалить ${data?.name}?`}
                description="Вместе с полем удалятся все участки и рекомендации, относящиеся к нему."
                leftBtnText="Назад"
                rightBtnText="Удалить"
                isCancel={true}
                isShow={isShowModal}
                setIsShow={setIsShowModal}
                actions={{
                    rightAction: () => handleDelete(),
                }}
            />
            <Flex align="center" justify="space-between">
                <Flex gap={ESpacing.VALUE2} align="center">
                    <Link to={routeMap.fieldDetail(fieldId)}>
                        <div className="cursor-pointer rounded-lg border border-solid border-border-primary p-2.5">
                            <BackIcon />
                        </div>
                    </Link>
                    <Title className="!mb-0 !text-4xl !text-gray-800">
                        {data?.name}
                    </Title>
                </Flex>
                <Flex gap={ESpacing.VALUE2} align="center">
                    <Link
                        to={routeMap.plotEdit(fieldId, plotId)}
                        className="flex h-fit cursor-pointer content-center justify-center rounded-lg bg-secondary p-3.5"
                    >
                        <EditIcon />
                    </Link>
                    <div
                        className="flex h-fit cursor-pointer content-center justify-center rounded-lg bg-beige p-3.5"
                        onClick={() => setIsShowModal(true)}
                    >
                        <DeleteIcon />
                    </div>
                </Flex>
            </Flex>
            <Flex gap={ESpacing.VALUE4}>
                <Flex vertical gap={ESpacing.VALUE4}>
                    <Flex gap={ESpacing.VALUE4}>
                        {data && (
                            <WideInfoCard
                                area={Number(data.size)}
                                culture={data.culture_id}
                                soil={data.soil_type_id}
                            />
                        )}
                        <ChemicalAnalysisCard id={plotId} />
                    </Flex>
                    {analysisData.length !== 0 && (
                        <>
                            <Flex>
                                <HydrogenUnloadingCard />
                            </Flex>
                            <AnalysResult results={analysisData} />
                        </>
                    )}
                </Flex>
                {analysisData.length !== 0 && (
                    <Flex vertical>
                        <CurrentRecommendation />
                    </Flex>
                )}
            </Flex>
        </Flex>
    )
}
