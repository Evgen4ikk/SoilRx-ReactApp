import { Meta, StoryFn } from '@storybook/react'
import Table from './Table'

export default {
    title: 'shared/Table',
    component: Table,
} as Meta

const Template: StoryFn = (args: any) => <Table {...args} />
export const Default = Template.bind({})
Default.args = {
    variant: 'primary',
}
