import { FC } from 'react'
import SelectIcon from '@icons/selectIcon.svg?react'
import { type Error } from '@customTypes/common'
import { useGetCropsQuery } from '@entities/plot/api/api'
import { ESpacing } from '@ui/Enums/Enums'
import Flex from '@ui/Flex/Flex'
import Paragraph from '@ui/Paragraph'
import Select from '@ui/Select'
import Text from '@ui/Text'
import { type ControllerRenderProps } from 'react-hook-form'

interface IProps {
    defaultValue?: string
    error?: Error
}

interface SelectOption {
    label: JSX.Element
    value: number
}

export const CultureSelect: FC<IProps & ControllerRenderProps> = (
    props,
    { defaultValue, error },
) => {
    const { data: cropsData } = useGetCropsQuery(null)
    const crops: Array<SelectOption> = []
    cropsData &&
        cropsData.map((item) => {
            crops.push({
                label: <Text className="px-2">{item.name}</Text>,
                value: item.id,
            })
        })

    return (
        <Flex vertical gap={ESpacing.VALUE1}>
            <Paragraph className="mb-2 max-w-[600px] font-inter text-base font-normal text-info">
                Культура для высадки
            </Paragraph>
            <Select
                placeholder="Любая"
                defaultValue={defaultValue ? defaultValue : undefined}
                {...props}
                className="border-primary h-12 max-w-[600px] rounded-lg border font-inter font-normal text-gray-800"
                suffixIcon={<SelectIcon />}
                error={error?.error ? error.error : undefined}
                options={crops}
            />
        </Flex>
    )
}
