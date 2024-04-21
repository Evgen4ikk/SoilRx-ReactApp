import { FC, useEffect, useState } from 'react'
import {
    AddFieldFormData,
    AddFieldSchema,
    useCreateFiledMutation,
} from '@entities/field'
import ConfirmRemoveForm from '@features/ConfirmRemoveForm'
import { zodResolver } from '@hookform/resolvers/zod'
import { Message } from '@lib/ui/message'
import { routeMap } from '@shared/model/api'
import Button from '@ui/Button'
import { ESpacing } from '@ui/Enums/Enums'
import Flex from '@ui/Flex'
import TextField from '@ui/TextField'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router'

export const AddFieldForm: FC = () => {
    const {
        handleSubmit,
        control,
        formState: { errors, isDirty, isValid },
        reset,
    } = useForm<AddFieldFormData>({
        resolver: zodResolver(AddFieldSchema),
        mode: 'onBlur',
    })

    const [createField, { data: field, isSuccess, isLoading }] =
        useCreateFiledMutation()

    const navigate = useNavigate()
    const [modalShow, setModalShow] = useState(false)
    const [confirmShow, setConfirmShow] = useState(false)
    const [isContinue, setIsContinue] = useState(false)

    const onSubmit: SubmitHandler<AddFieldFormData> = async (data) => {
        try {
            await createField(data)
        } catch {
            return Message({
                type: 'error',
                content: 'Поле не было создано',
            })
        }
        reset()
    }

    useEffect(() => {
        if (isSuccess) {
            !isContinue
                ? navigate(routeMap.fieldDetail(field && field.data.id))
                : navigate(routeMap.plotCreate(field && field.data.id))
        }
    }, [isSuccess])

    const { cadastre_number, size, name } = errors

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Flex vertical gap={ESpacing.VALUE6}>
                    <Controller
                        name="name"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
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
                        render={({ field }) => (
                            <TextField
                                {...field}
                                onChange={(e) => {
                                    const parsedValue = parseInt(e.target.value)
                                    field.onChange(
                                        isNaN(parsedValue)
                                            ? undefined
                                            : parsedValue,
                                    )
                                }}
                                value={field.value}
                                type="number"
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
                        render={({ field }) => (
                            <TextField
                                {...field}
                                title="Кадастровый номер"
                                placeholder="Например, 70:10:010001:34"
                                error={
                                    cadastre_number && {
                                        error: {
                                            message: cadastre_number.message,
                                            variant: 'error',
                                        },
                                    }
                                }
                            />
                        )}
                    />
                    <Flex gap={ESpacing.VALUE2}>
                        <Button
                            variant="lastAction"
                            className="w-[133px] font-medium text-accent"
                            onClick={() => {
                                setModalShow(true)
                            }}
                        >
                            Отменить
                        </Button>
                        <Button
                            disabled={!isValid || !isDirty || isLoading}
                            onClick={() => setConfirmShow(true)}
                            variant="saveField"
                            className="!w-[153px] !min-w-[153px] !font-medium"
                        >
                            Продолжить
                        </Button>
                    </Flex>
                </Flex>
                <ConfirmRemoveForm
                    title="Хотите создать участки на поле?"
                    description="Вы можете оставить поле без разделения на участки, но тогда мы не сможем давать рекомендации по данному полю."
                    leftBtnText="Без участков"
                    rightBtnText="Создать участки"
                    actions={{
                        rightAction: () => setIsContinue(true),
                        leftAction: () => setIsContinue(false),
                    }}
                    isShow={confirmShow}
                    isCancel={false}
                    setIsShow={setConfirmShow}
                />
            </form>
            <ConfirmRemoveForm
                title="Отменить создание поля?"
                description="Если вы отмените создание поля, все внесённые данные будут удалены."
                leftBtnText="Назад"
                rightBtnText="Отменить создание"
                actions={{
                    rightAction: () => navigate(routeMap.fields),
                }}
                isShow={modalShow}
                isCancel={true}
                setIsShow={setModalShow}
            />
        </>
    )
}
