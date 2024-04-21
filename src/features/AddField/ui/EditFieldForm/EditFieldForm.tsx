import { FC, useState } from 'react'
import {
    AddFieldSchema,
    EditFieldFormData,
    FieldData,
    useEditFieldMutation,
} from '@entities/field'
import { zodResolver } from '@hookform/resolvers/zod'
import { routeMap } from '@shared/model/api'
import Button from '@ui/Button'
import { ESpacing } from '@ui/Enums/Enums'
import Flex from '@ui/Flex'
import TextField from '@ui/TextField'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router'

interface IProps {
    field?: FieldData
    setIsShow: React.Dispatch<React.SetStateAction<boolean>>
}

export const EditFieldForm: FC<IProps> = ({ ...props }) => {
    const { setIsShow, field } = props
    const {
        handleSubmit,
        control,
        formState: { errors, isDirty },
    } = useForm<EditFieldFormData>({
        resolver: zodResolver(AddFieldSchema),
    })

    const [isFormDirty, setIsFormDirty] = useState(false)
    const [editField, { isLoading }] = useEditFieldMutation()
    const navigate = useNavigate()

    const onSubmit: SubmitHandler<EditFieldFormData> = async (data) => {
        await editField({
            id: field?.id,
            cadastre_number: data.cadastre_number,
            name: data.name,
            size: data.size,
        })
        setIsFormDirty(false)
        field && navigate(routeMap.fieldDetail(field.id))
    }

    const { cadastre_number, size, name } = errors

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Flex vertical gap={ESpacing.VALUE6}>
                <Controller
                    name="name"
                    control={control}
                    defaultValue={field?.name}
                    render={({ field: { onChange, value } }) => (
                        <TextField
                            onChange={(e) => {
                                onChange(e)
                                setIsFormDirty(true)
                            }}
                            value={value}
                            title="Название поля"
                            placeholder="Например, Полюшко первое"
                            error={
                                name && {
                                    error: {
                                        message: name.message,
                                        variant: 'error',
                                    },
                                }
                            }
                        />
                    )}
                />
                <Controller
                    name="size"
                    control={control}
                    defaultValue={Number(field?.size)}
                    render={({ field: { onChange, value } }) => (
                        <TextField
                            onChange={(e) => {
                                const inputValue = e.target.value.trim()
                                const newValue =
                                    inputValue === ''
                                        ? 0
                                        : parseFloat(inputValue)
                                onChange(newValue)
                                setIsFormDirty(true)
                            }}
                            value={value}
                            title="Площадь поля, кв.м"
                            placeholder="Например, 600"
                            error={
                                size && {
                                    error: {
                                        message: size.message,
                                        variant: 'error',
                                    },
                                }
                            }
                        />
                    )}
                />
                <Controller
                    name="cadastre_number"
                    control={control}
                    defaultValue={field?.cadastre_number}
                    render={({ field: { onChange, value } }) => (
                        <TextField
                            onChange={(e) => {
                                onChange(e)
                                setIsFormDirty(true)
                            }}
                            value={value}
                            title="Кадастровый номер"
                            placeholder="Например, 70:10:010001:34"
                            error={{
                                error: {
                                    message: cadastre_number?.message,
                                    variant: 'error',
                                },
                            }}
                        />
                    )}
                />
                <Flex gap={ESpacing.VALUE2}>
                    <Button
                        variant="lastAction"
                        className="w-[133px] text-sm font-medium text-accent"
                        onClick={() => setIsShow(true)}
                    >
                        Отменить
                    </Button>
                    <Button
                        disabled={!isFormDirty || !isDirty || isLoading}
                        htmlType="submit"
                        variant="saveField"
                        className="w-[218px] text-sm font-medium"
                    >
                        Сохранить изменения
                    </Button>
                </Flex>
            </Flex>
        </form>
    )
}
