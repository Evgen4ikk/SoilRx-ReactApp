import { FC, useState } from 'react'
import { UnauthorizedError } from '@entities/common'
import {
    EditPasswordError,
    editPasswordSchema,
    useEditUserPasswordMutation,
} from '@entities/user'
import { zodResolver } from '@hookform/resolvers/zod'
import { getApiError } from '@lib/dom/getApiError'
import Button from '@ui/Button'
import { ESpacing } from '@ui/Enums/Enums'
import Flex from '@ui/Flex'
import Input from '@ui/Input'
import { Modal } from '@ui/Modal/Modal'
import Paragraph from '@ui/Paragraph'
import PasswordInput from '@ui/PasswordInput'
import Title from '@ui/Title'
import { Controller, useForm } from 'react-hook-form'

type ChangePassword = {
    old_password: string
    password: string
    password_confirmation: string
}

interface IProps {
    userId: number
}

export const PasswordForm: FC<IProps> = ({ userId }) => {
    const {
        control,
        handleSubmit,
        formState: { errors, isDirty, isValid },
        reset,
    } = useForm<ChangePassword>({
        resolver: zodResolver(editPasswordSchema),
        mode: 'onBlur',
    })

    const { old_password, password, password_confirmation } = errors

    const [isOpenModal, setIsOpenModal] = useState(false)

    const [editPassword, { error }] = useEditUserPasswordMutation()

    const errorStatus = error && getApiError(error)
    const unauthorizedError = new UnauthorizedError()

    const onSubmitPassword = async (data: ChangePassword) => {
        const result = await editPassword({ data, id: userId })

        'error' in result ? null : (reset(), setIsOpenModal(false))
    }

    return (
        <>
            <Input
                placeholder="***********"
                className="px-4 py-2.5"
                onClick={() => {
                    reset()
                    setIsOpenModal(true)
                }}
            />
            <form onSubmit={handleSubmit(onSubmitPassword)}>
                <Modal
                    isOpen={isOpenModal}
                    onClose={() => setIsOpenModal(false)}
                    className="p-6"
                >
                    <Flex
                        vertical
                        gap={ESpacing.VALUE6}
                        className="max-w-[600px]"
                    >
                        <Flex vertical gap={ESpacing.VALUE1}>
                            <Title className="!m-0 !text-2xl !text-gray-800">
                                Смена пароля
                            </Title>
                            <Paragraph className="text-base !font-normal text-gray-600">
                                Чтобы изменить пароль, заполните все поля.
                            </Paragraph>
                        </Flex>
                        <Flex vertical gap={ESpacing.VALUE2}>
                            <Controller
                                name="old_password"
                                control={control}
                                render={({ field }) => (
                                    <PasswordInput
                                        {...field}
                                        placeholder="Введите старый пароль"
                                        className={
                                            old_password?.message ||
                                            errorStatus ===
                                                unauthorizedError.code
                                                ? 'w-[552px] border-error px-4 py-2.5'
                                                : 'w-[552px] px-4 py-2.5'
                                        }
                                        error={{
                                            message:
                                                errorStatus ===
                                                unauthorizedError.code
                                                    ? EditPasswordError(
                                                          Number(errorStatus),
                                                      )
                                                    : old_password?.message ||
                                                      '',
                                            className: 'max-w-[552px]',
                                            variant: 'error',
                                        }}
                                    />
                                )}
                            />
                            <Controller
                                name="password"
                                control={control}
                                render={({ field }) => (
                                    <PasswordInput
                                        {...field}
                                        placeholder="Придумайте новый пароль"
                                        className={
                                            password?.message
                                                ? 'w-[552px] border-error px-4 py-2.5'
                                                : 'w-[552px] px-4 py-2.5'
                                        }
                                        error={{
                                            message: password?.message || '',
                                            className: 'max-w-[552px]',
                                            variant: 'error',
                                        }}
                                    />
                                )}
                            />
                            <Controller
                                name="password_confirmation"
                                control={control}
                                render={({ field }) => (
                                    <PasswordInput
                                        {...field}
                                        placeholder="Подтвердите пароль"
                                        className={
                                            password_confirmation?.message
                                                ? 'w-[552px] border-error px-4 py-2.5'
                                                : 'w-[552px] px-4 py-2.5'
                                        }
                                        error={{
                                            message:
                                                password_confirmation?.message ||
                                                '',
                                            className: 'max-w-[552px]',
                                            variant: 'error',
                                        }}
                                    />
                                )}
                            />
                        </Flex>
                        <Flex gap={ESpacing.VALUE1}>
                            <Button
                                onClick={() => setIsOpenModal(false)}
                                className="w-1/2 py-3.5 text-base font-medium"
                                variant="lastAction"
                            >
                                Отменить
                            </Button>
                            <Button
                                disabled={!isValid || !isDirty}
                                htmlType="submit"
                                className="w-1/2"
                                variant="saveField"
                            >
                                Подтвердить
                            </Button>
                        </Flex>
                    </Flex>
                </Modal>
            </form>
        </>
    )
}
