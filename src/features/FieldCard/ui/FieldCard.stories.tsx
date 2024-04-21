import { type Meta, type StoryFn } from '@storybook/react'
import FieldCard from './FieldCard'

export default {
    title: 'features/FieldCard',
    component: FieldCard,
} as Meta

const Template: StoryFn = (args: any) => <FieldCard {...args} />
export const Default = Template.bind({})
Default.args = {
    fieldName: 'Поле 1',
    filedArea: 600,
    cadastralNumber: '70:10:0100019:241',
}
