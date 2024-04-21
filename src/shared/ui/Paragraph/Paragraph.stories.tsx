import { type Meta, type StoryFn } from '@storybook/react'
import Paragraph from './Paragraph'

export default {
    title: 'shared/Paragraph',
    component: Paragraph,
} as Meta

const Template: StoryFn = (args: any) => <Paragraph {...args} />

export const Default = Template.bind({})
Default.args = {
    children: 'example',
}
