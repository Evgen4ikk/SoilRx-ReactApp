import { type Meta, type StoryFn } from '@storybook/react'
import Title from './Title'

export default {
    title: 'shared/Title',
    component: Title,
} as Meta

const Template: StoryFn = (args: any) => <Title {...args} />

export const Default = Template.bind({})
Default.args = {
    children: <div>600</div>,
    level: 4,
}
