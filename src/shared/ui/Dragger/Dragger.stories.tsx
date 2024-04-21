import {
    type Meta,
    type StoryFn,
} from '@storybook/react'
import Dragger from './Dragger'

export default {
    title: 'shared/Dragger',
    component: Dragger,
} as Meta

const Template: StoryFn = (args: any) => <Dragger {...args} />

export const Default = Template.bind({})
Default.args = {}
