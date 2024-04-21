import { FC } from 'react'
import {
    ForgotPassData,
    ForgotPasswordSchema,
} from '@entities/Auth/forgotPassword'
import {
    ForgotPasswordError,
    useForgotPasswordMutation,
} from '@entities/Auth/login'
import { zodResolver } from '@hookform/resolvers/zod'
import { useCountdownTimer } from '@hooks/useCountdownTimer'
import { getApiError } from '@lib/dom/getApiError'
import { routeMap } from '@shared/model/api'
import Button from '@ui/Button/Button'
import { ESpacing } from '@ui/Enums/Enums'
import Flex from '@ui/Flex'
import Input from '@ui/Input'
import Link from '@ui/Link'
import Title from '@ui/Title'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'

interface ForgotPasswordFormProps {
    setEmail: React.Dispatch<React.SetStateAction<string>>
    setVerifying: React.Dispatch<React.SetStateAction<boolean>>
    timer: ReturnType<typeof useCountdownTimer>
}

export const ForgotPasswordForm: FC<ForgotPasswordFormProps> = ({
    ...props
}) => {
    const { setEmail, setVerifying, timer } = props
    const [forgotPassword, { error }] = useForgotPasswordMutation()

    const errorStatus = error && getApiError(error)

    const {
        handleSubmit,
        control,
        formState: { errors, isDirty, isValid },
    } = useForm<ForgotPassData>({
        resolver: zodResolver(ForgotPasswordSchema),
        mode: 'onBlur',
    })

    const onSubmit: SubmitHandler<ForgotPassData> = async (data) => {
        const result = await forgotPassword({
            email: data.email,
        })

        if ('error' in result) {
            console.error('Ошибка при регистрации:', result.error)
        } else {
            setVerifying(true)
            setEmail(data.email)
            timer.reset()
        }
    }

    const { email } = errors

    return (
        <>
            <Title variant="h1" className="text-center">
                Восстановление пароля
            </Title>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Flex vertical gap={ESpacing.VALUE6}>
                    <Controller
                        name="email"
                        control={control}
                        render={({ field }) => (
                            <Input
                                {...field}
                                placeholder="Введите почту"
                                customVariant="single"
                                className={
                                    (email?.message && 'border-error') ||
                                    (errorStatus === 500 ? 'border-error' : '')
                                }
                                error={{
                                    message:
                                        errorStatus === 500
                                            ? ForgotPasswordError(
                                                  Number(errorStatus),
                                              )
                                            : email?.message || '',
                                    variant: 'error',
                                }}
                            />
                        )}
                    />
                    <Flex vertical gap={ESpacing.VALUE2}>
                        <Button
                            disabled={!isValid || !isDirty}
                            variant="saveField"
                            htmlType="submit"
                        >
                            Продолжить
                        </Button>
                        <Button variant="lastAction">
                            <Link to={routeMap.login}>Назад</Link>
                        </Button>
                    </Flex>
                </Flex>
            </form>
        </>
    )
}
