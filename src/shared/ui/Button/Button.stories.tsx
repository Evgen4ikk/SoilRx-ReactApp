import BackIcon from '@app/icons/back.svg?react'
import GearIcon from '@app/icons/gear.svg?react'
import PlusIcon from '@app/icons/plus.svg?react'
import { type Meta, type StoryFn } from '@storybook/react'
import Button from './Button'

export default {
    title: 'shared/Button',
    component: Button,
} as Meta

const Template: StoryFn = (args: any) => <Button {...args} />

export const IconSettingButton = Template.bind({})
IconSettingButton.args = {
    icon: <GearIcon />,
    variant: 'settings',
    click: () => {
        console.log('clicked')
    },
}

export const IconBackButton = Template.bind({})
IconBackButton.args = {
    icon: <BackIcon />,
    variant: 'back',
    click: () => {
        console.log('clicked')
    },
}

export const IconTextButton = Template.bind({})
IconTextButton.args = {
    icon: <PlusIcon />,
    variant: 'iconText',
    children: 'Добавить участок',
    click: () => {
        console.log('clicked')
    },
}

export const AddSite = Template.bind({})
AddSite.args = {
    children: 'Добавить участок',
    variant: 'addSite',
    click: () => {
        console.log('clicked')
    },
}

export const MoreDetails = Template.bind({})
MoreDetails.args = {
    children: 'Подробнее',
    variant: 'moreDetails',
    click: () => {
        console.log('clicked')
    },
}

export const SaveField = Template.bind({})
SaveField.args = {
    children: 'Сохранить поле',
    variant: 'saveField',
    click: () => {
        console.log('clicked')
    },
    disabled: true,
}
