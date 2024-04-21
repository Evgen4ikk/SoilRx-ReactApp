import { type Meta, type StoryFn } from '@storybook/react'
import { ConfirmRemoveForm } from './ConfirmRemoveForm'

export default {
    title: 'features/ConfirmRemoveForm',
    component: ConfirmRemoveForm,
} as Meta

const func = () => {
    console.log('Сделал запрос')
}

const Template: StoryFn = (args: any) => <ConfirmRemoveForm {...args} />
export const Default = Template.bind({})
Default.args = {
    title: 'Вы действительно хотите удалить Участок 2?',
    description:
        'Если вы удалите участок, все рекомендации по нему будут удалены.',
    leftBtnText: 'Отменить',
    rightBtnText: 'Удалить',
    show: true,
    rightAction: func,
}
