import { type Meta, type StoryFn } from '@storybook/react'
import { CultureSelect } from '../'

export default {
    title: 'features/CultureSelect',
    component: CultureSelect,
} as Meta

const Template: StoryFn = (args: any) => <CultureSelect {...args} />
export const Default = Template.bind({})
Default.args = {}
