import { Meta, StoryFn } from '@storybook/react'
import RadialBarChartMultiple from './RadialBarChartMultiple'

export default {
    title: 'shared/RadialBarChartMultiple',
    component: RadialBarChartMultiple,
} as Meta

const Template: StoryFn = (args: any) => <RadialBarChartMultiple {...args} />
export const Default = Template.bind({})
Default.args = {
    data: [
        {
            name: 'Нитраты',
            uv: 86,
        },
        {
            name: 'Азот',
            uv: 49,
        },
        {
            name: 'Калий',
            uv: 74,
        },
    ],
    colors: [
        'bg-[var(--accent)]',
        'bg-[var(--press-secondary)]',
        'bg-[var(--third)]',
    ],
    variant: 'primary',
}
