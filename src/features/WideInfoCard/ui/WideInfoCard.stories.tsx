import { type Meta, type StoryFn } from '@storybook/react'
import { WideInfoCard } from './WideInfoCard'

export default {
    title: 'features/WideInfoCard',
    component: WideInfoCard,
} as Meta

const Template: StoryFn = (args: any) => <WideInfoCard {...args} />
export const Default = Template.bind({})
Default.args = {
    area: 111,
    culture: 'Пшеница',
}
