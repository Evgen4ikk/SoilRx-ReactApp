import { type Meta, type StoryFn } from '@storybook/react'
import { EGradeText } from '@ui/Enums/Enums'
import { PlotData } from '../types/types'
import { PlotList } from './PlotList'

export default {
    title: 'features/PlotList/PlotList',
    component: PlotList,
} as Meta

const data: PlotData[] = [
    {
        id: 1,
        fieldName: 'Участок 1 первого поля',
        grade: EGradeText.HIGH_FERTILE,
        culture: 'Пшеница',
        area: '100',
        soil: 'Глиняный',
        chemicalAnalysis: '04.00.2023',
    },
    {
        id: 2,
        fieldName: 'Участок 2 первого поля',
        grade: EGradeText.FERTILE,
        culture: 'Пшеница',
        area: '60',
        soil: 'Глиняный',
        chemicalAnalysis: '04.05.2023',
    },
    {
        id: 3,
        fieldName: 'Участок 3 первого поля',
        grade: EGradeText.HIGH_FERTILE,
        culture: 'Рис',
        area: '120',
        soil: 'Глиняный',
        chemicalAnalysis: '23.05.2023',
    },
    {
        id: 4,
        fieldName: 'Участок 4 первого поля',
        grade: EGradeText.LOW_FERTILE,
        culture: 'Кукуруза',
        area: '120',
        soil: 'Песчаный',
        chemicalAnalysis: '23.05.2023',
    },
]

const Template: StoryFn = (args: any) => <PlotList {...args} />
export const Default = Template.bind({})
Default.args = {
    data,
}
