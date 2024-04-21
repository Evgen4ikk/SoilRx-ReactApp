import { type Meta, type StoryFn } from '@storybook/react'
import AnalysResult from '..'

export default {
    title: 'features/AnalysResult',
    component: AnalysResult,
} as Meta

const Template: StoryFn = (args: any) => <AnalysResult {...args} />
export const Default = Template.bind({})
Default.args = {
    results: [
        {
            k: 150,
            n: 50,
            p: 70,
            date: new Date('December 17, 2021 04:28:00'),
        },
        {
            k: 100,
            n: 50,
            p: 70,
            date: new Date('December 17, 2021 04:28:00'),
        },
        {
            k: 100,
            n: 50,
            p: 70,
            date: new Date('December 17, 2021 04:28:00'),
        },
        {
            k: 100,
            n: 50,
            p: 70,
            date: new Date('December 17, 2021 04:28:00'),
        },
        {
            k: 100,
            n: 50,
            p: 70,
            date: new Date('December 17, 2021 04:28:00'),
        },
    ],
}
