import { FC, useState } from 'react'
import {
    PersonalInformationData,
    useEditUserEmailMutation,
} from '@entities/user'
import { useCountdownTimer } from '@hooks/useCountdownTimer'
import { useOutside } from '@hooks/useOutside'
import { cn } from '@lib/dom/classnames'
import Button from '@ui/Button'
import { ESpacing } from '@ui/Enums/Enums'
import Flex from '@ui/Flex'
import Input from '@ui/Input'
import { Modal } from '@ui/Modal/Modal'
import Paragraph from '@ui/Paragraph'
import Title from '@ui/Title'
import { Controller, useForm } from 'react-hook-form'

interface IProps {
    email?: string
    userId: number
}

export const EmailForm: FC<IProps> = ({ email, userId }) => {
    const { control, handleSubmit } = useForm<PersonalInformationData>()

    const [editEmail] = useEditUserEmailMutation()

    const [newEmail, setNewEmail] = useState(email)

    const [currentEmail] = useState(email)
    const [isOpenModal, setIsOpenModal] = useState(false)
    const timer = useCountdownTimer(60)

    const {
        isShow: IsShowButton,
        ref,
        setIsShow: setIsShowButton,
    } = useOutside(false)

    const onSubmitEmail = async (data: PersonalInformationData) => {
        if (data.email !== undefined && currentEmail) {
            setIsShowButton(false)
            setIsOpenModal(true)
            await editEmail({ data, id: userId })
            setNewEmail(data.email)
            timer.reset()
        }
    }

    const handleClick = async () => {
        await editEmail({ email: newEmail, id: userId })
        timer.reset()
    }

    return (
        <>
            <form onSubmit={handleSubmit(onSubmitEmail)}>
                <Flex gap={ESpacing.VALUE1} ref={ref}>
                    <Controller
                        name="email"
                        control={control}
                        render={({ field }) => (
                            <Input
                                {...field}
                                defaultValue={currentEmail}
                                placeholder="Почта"
                                className={cn(
                                    'px-4 py-2.5',
                                    IsShowButton ? 'w-[318px]' : 'w-[432px]',
                                )}
                                onClick={() => setIsShowButton(true)}
                            />
                        )}
                    />
                    {IsShowButton && (
                        <Button
                            htmlType="submit"
                            variant="secondAction"
                            className="px-4 py-2.5 text-sm font-medium"
                        >
                            Применить
                        </Button>
                    )}
                </Flex>
            </form>
            <Modal
                isOpen={isOpenModal}
                onClose={() => setIsOpenModal(false)}
                className="p-6"
            >
                <Flex vertical gap={ESpacing.VALUE6} className="max-w-[432px]">
                    <Flex vertical gap={ESpacing.VALUE1}>
                        <Title className="!m-0 !text-2xl !text-gray-800">
                            Подтвердите изменение почты
                        </Title>
                        <Paragraph className="text-base !font-normal text-gray-600">
                            Перейдите по ссылке в письме для подтверждения смены
                            почты, а после войдите заново.
                            <br />
                            <br />
                            Если вы ничего не нашли, проверьте папку Спам.
                        </Paragraph>
                    </Flex>
                    <Button
                        onClick={handleClick}
                        disabled={!timer.isCountdownEnded}
                        variant="saveField"
                    >
                        {!timer.isCountdownEnded
                            ? `Отправить повторно через ${timer.timeLeft} секунд`
                            : 'Отправить повторно'}
                    </Button>
                </Flex>
            </Modal>
        </>
    )
}
