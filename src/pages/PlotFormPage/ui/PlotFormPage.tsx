import { FC } from 'react'
import { useGetPlotsQuery } from '@entities/plot'
import { AddPlotForm } from '@features/AddPlot'
import PlotStack from '@features/PlotStack'
import { StackType } from '@features/StackItem'
import { ESpacing } from '@ui/Enums/Enums'
import Flex from '@ui/Flex'
import Title from '@ui/Title'
import { useParams } from 'react-router'

interface IProps {
    isAddingPlot: boolean
}

export const PlotFormPage: FC<IProps> = ({ isAddingPlot }: IProps) => {
    const params = useParams()
    const plotId = Number(params.plotId)
    const fieldId = Number(params.fieldId)

    const { data: plots } = useGetPlotsQuery(null)

    const stackData: StackType[] = []
    let defaultValues = undefined
    let plotSize = 0
    plots?.map((plot) =>
        plot.field_id === fieldId ? (plotSize += Number(plot.size)) : null,
    )
    plots &&
        plots.map((item) => {
            if (fieldId) {
                if (item.field_id === fieldId) {
                    stackData.push({
                        id: item.id,
                        title: item.name,
                        area: Number(item.size),
                        culture: item.culture_id,
                    })
                }
                if (item.field_id === fieldId && item.id === plotId) {
                    defaultValues = {
                        nameValue: item.name,
                        areaValue: Number(item.size),
                        plantValue: String(item.culture_id),
                        soilValue: String(item.soil_type_id),
                    }
                }
            }
        })

    return (
        <Flex
            vertical
            gap={ESpacing.VALUE8}
            className="mx-auto mt-10 w-[1408px] pb-20"
        >
            <Flex align="center">
                <Title className="!mb-0 !text-4xl !text-gray-800">
                    {isAddingPlot ? 'Создание поля' : 'Редактировать участок'}
                </Title>
            </Flex>
            <Flex className="h-[699px]">
                <Flex
                    vertical
                    gap={ESpacing.VALUE8}
                    className="w-[600px] shrink-0"
                >
                    {fieldId && (
                        <AddPlotForm
                            number={!isAddingPlot ? plotId : undefined}
                            fieldId={fieldId}
                            plotsSize={plotSize}
                            defaultValues={defaultValues}
                        />
                    )}
                </Flex>
                {isAddingPlot && (
                    <Flex
                        vertical
                        align="flex-end"
                        gap={ESpacing.VALUE2}
                        className="w-full overflow-scroll "
                    >
                        <PlotStack data={stackData} />
                    </Flex>
                )}
            </Flex>
        </Flex>
    )
}
