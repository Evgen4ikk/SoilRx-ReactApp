import { type Meta, type StoryFn } from '@storybook/react'
import StackItem from '..'

export default {
    title: 'features/StackItem',
    component: StackItem,
} as Meta

const Template: StoryFn = (args: any) => (
    <div className="w-[768px]">
        <StackItem {...args} />
    </div>
)
export const Default = Template.bind({})
Default.args = {
    title: 'Пшеничный участок',
    area: 55,
    culture: 'Пшеница',
}
