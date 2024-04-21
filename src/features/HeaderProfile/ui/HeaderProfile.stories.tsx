import { type Meta, type StoryFn } from '@storybook/react'
import { HeaderProfile } from '../'

export default {
    title: 'features/HeaderProfile',
    component: HeaderProfile,
} as Meta

const Template: StoryFn = (args: any) => <HeaderProfile {...args} />
export const Default = Template.bind({})
Default.args = {
    name: 'Петров Виктор Валерьевич',
    role: 'Фермер',
}
