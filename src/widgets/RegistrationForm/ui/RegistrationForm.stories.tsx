import { type Meta, type StoryFn } from '@storybook/react'
import { RegistrationForm } from '..'

export default {
    title: 'widgets/RegistrationForm',
    component: RegistrationForm,
} as Meta

const Template: StoryFn = () => <RegistrationForm />

export const Default = Template.bind({})
