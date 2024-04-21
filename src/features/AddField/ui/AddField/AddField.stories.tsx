import { type Meta, type StoryFn } from '@storybook/react'
import { AddField } from './AddField'

export default {
    title: 'features/AddField',
    component: AddField,
} as Meta

const Template: StoryFn = (args: any) => <AddField {...args} />
export const Default = Template.bind({})
Default.args = {
    onClick: () => {},
}
