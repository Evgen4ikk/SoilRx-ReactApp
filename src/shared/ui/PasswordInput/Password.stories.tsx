import { type Meta, type StoryFn } from '@storybook/react'
import PasswordInput from './PasswordInput'


export default {
    title: 'shared/PasswordInput',
    component: PasswordInput,
} as Meta

const Template: StoryFn = (args: any) => <PasswordInput {...args} />

export const Default = Template.bind({})
Default.args = {
    placeholder: 'Например, 600',
    variant: 'primary',
}
