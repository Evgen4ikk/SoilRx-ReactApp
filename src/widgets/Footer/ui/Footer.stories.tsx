import { type Meta, type StoryFn } from '@storybook/react'
import { Footer } from './Footer'

export default {
    title: 'widgets/Footer',
    component: Footer,
} as Meta

const Template: StoryFn = () => <Footer />

export const Default = Template.bind({})
