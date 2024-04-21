import { FC, useEffect } from 'react'
import { useResetPasswordMutation } from '@entities/Auth/login'
import {
    ResetPasswordInputs,
    ResetPasswordSchema,
} from '@entities/Auth/ResetPassword'
import { zodResolver } from '@hookform/resolvers/zod'
import { routeMap } from '@shared/model/api'
import Button from '@ui/Button/Button'
import { ESpacing } from '@ui/Enums/Enums'
import Flex from '@ui/Flex'
import Link from '@ui/Link'
import PasswordInput from '@ui/PasswordInput'
import Title from '@ui/Title'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { useLocation } from 'react-router'

interface ResetPasswordFormProps {
    setIsSuccess: React.Dispatch<React.SetStateAction<boolean>>
    setIsExpired: React.Dispatch<React.SetStateAction<boolean>>
}

export const ResetPasswordForm: FC<ResetPasswordFormProps> = ({ ...props }) => {
    const { setIsExpired, setIsSuccess } = props
    const location = useLocation()

    const queryParams = new URLSearchParams(location.search)
    const token = queryParams.get('token')
    const email = queryParams.get('email')
    const expires = queryParams.get('expires')

    useEffect(() => {
        if (expires) {
            const expiresTimestamp = parseInt(expires, 10)
            const currentTime = Math.floor(Date.now() / 1000)
            if (expiresTimestamp < currentTime) {
                setIsExpired(true)
            }
        }
    }, [expires])

    const [resetPassword] = useResetPasswordMutation()

    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<ResetPasswordInputs>({
        resolver: zodResolver(ResetPasswordSchema),
    })

    const onSubmit: SubmitHandler<ResetPasswordInputs> = async (data) => {
        await resetPassword({
            email,
            token,
            password: data.password,
            password_confirmation: data.confirmPassword,
        })
        setIsSuccess(true)
    }

    const { password, confirmPassword } = errors

    return (
        <>
            <Title variant="h1" className="text-center">
                Восстановление пароля
            </Title>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Flex vertical gap={ESpacing.VALUE6}>
                    <Flex vertical gap={ESpacing.VALUE4}>
                        <Controller
                            name="password"
                            control={control}
                            render={({ field: { onChange } }) => (
                                <PasswordInput
                                    onChange={onChange}
                                    placeholder="Придумайте новый пароль"
                                    customVariant="single"
                                    className={
                                        password?.message && 'border-error'
                                    }
                                    error={
                                        password && {
                                            message: password.message,
                                            variant: 'error',
                                        }
                                    }
                                />
                            )}
                        />
                        <Controller
                            name="confirmPassword"
                            control={control}
                            render={({ field: { onChange } }) => (
                                <PasswordInput
                                    onChange={onChange}
                                    placeholder="Подтвердите пароль"
                                    customVariant="single"
                                    className={
                                        confirmPassword?.message &&
                                        'border-error'
                                    }
                                    error={
                                        confirmPassword && {
                                            message: confirmPassword.message,
                                            variant: 'error',
                                            className: '',
                                        }
                                    }
                                />
                            )}
                        />
                    </Flex>
                    <Flex vertical gap={ESpacing.VALUE2}>
                        <Button
                            htmlType="submit"
                            variant="saveField"
                            disabled={!!password}
                        >
                            Сохранить изменения
                        </Button>
                        <Button variant="lastAction">
                            <Link to={routeMap.home}>Отменить</Link>
                        </Button>
                    </Flex>
                </Flex>
            </form>
        </>
    )
}
