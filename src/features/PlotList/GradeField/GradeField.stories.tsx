import { type Meta, type StoryFn } from '@storybook/react'
import { EGradeText } from '@ui/Enums/Enums'
import { GradeField } from './GradeField'

export default {
    title: 'features/PlotList/StatusField',
    component: GradeField,
} as Meta

const Template: StoryFn = (args: any) => <GradeField {...args} />
export const HIGH_FERTILE = Template.bind({})
HIGH_FERTILE.args = {
    status: EGradeText.HIGH_FERTILE,
}

export const FERTILE = Template.bind({})
FERTILE.args = {
    status: EGradeText.FERTILE,
}
export const LOW_FERTILE = Template.bind({})
LOW_FERTILE.args = {
    status: EGradeText.LOW_FERTILE,
}
