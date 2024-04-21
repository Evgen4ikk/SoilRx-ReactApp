import { FC } from 'react'
import { useForgotPasswordMutation } from '@entities/Auth/login/api/api'
import { useCountdownTimer } from '@hooks/useCountdownTimer'
import Button from '@ui/Button'
import { ESpacing } from '@ui/Enums/Enums'
import Paragraph from '@ui/Paragraph'
import Title from '@ui/Title'
import { Flex } from 'antd'

interface VerificationMessageProps {
    email: string
    setVerifying: React.Dispatch<React.SetStateAction<boolean>>
    timer: ReturnType<typeof useCountdownTimer>
}

export const VerificationMessage: FC<VerificationMessageProps> = ({
    ...props
}) => {
    const { email, setVerifying, timer } = props
    const [forgotPassword] = useForgotPasswordMutation()

    const handleClick = async () => {
        await forgotPassword({
            email,
        })
        timer.reset()
    }

    return (
        <Flex vertical gap={ESpacing.VALUE6}>
            <Flex vertical gap={ESpacing.VALUE2}>
                <Title variant="primary" className="text-center !text-2xl">
                    Восстановление пароля
                </Title>
                <Paragraph className="text-base !font-normal text-gray-500">
                    Мы отправили письмо для сброса пароля на указанный почтовый
                    адрес.
                    <br />
                    Если ничего не нашли, проверьте папку Спам.
                </Paragraph>
            </Flex>
            <Flex vertical gap={ESpacing.VALUE2}>
                <Button
                    onClick={handleClick}
                    disabled={!timer.isCountdownEnded}
                    variant="saveField"
                >
                    {!timer.isCountdownEnded
                        ? `Отправить повторно через ${timer.timeLeft} секунд`
                        : 'Отправить повторно'}
                </Button>
                <Button
                    onClick={() => setVerifying(false)}
                    className="rounded-lg border-none bg-none px-5 py-4 text-base font-bold text-accent outline-none"
                >
                    Назад
                </Button>
            </Flex>
        </Flex>
    )
}
