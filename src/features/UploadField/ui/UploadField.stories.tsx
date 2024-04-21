import {
    type Meta,
    type StoryFn,
} from '@storybook/react'
import UploadField from './UploadField'

export default {
    title: 'features/UploadField',
    component: UploadField,
} as Meta

const Template: StoryFn = (args: any) => <UploadField {...args} />
export const Default = Template.bind({})
Default.args = {
    name: 'file',
    action: '#',
}
