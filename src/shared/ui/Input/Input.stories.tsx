import { type Meta, type StoryFn } from '@storybook/react'
import Input from './Input'

export default {
    title: 'shared/Input',
    component: Input,
} as Meta

const Template: StoryFn = (args: any) => <Input {...args} />

export const Default = Template.bind({})
Default.args = {
    placeholder: 'Например, 600',
    variant: 'primary',
}
