import { RegistrationError, useRegisterMutation } from '@entities/Auth/login'
import { SignUpSchema, signUpSchema } from '@entities/Auth/Registration'
import { BadRequestError } from '@entities/common'
import { zodResolver } from '@hookform/resolvers/zod'
import { getApiError } from '@lib/dom/getApiError'
import { routeMap } from '@shared/model/api'
import Button from '@ui/Button'
import Checkbox from '@ui/Checkbox'
import { ESpacing } from '@ui/Enums/Enums'
import Flex from '@ui/Flex'
import Input from '@ui/Input'
import Link from '@ui/Link'
import PasswordInput from '@ui/PasswordInput'
import Title from '@ui/Title'
import { Controller, useForm } from 'react-hook-form'
import { TState } from './types'

export const FirstStage = ({ setVerifying, setEmail }: TState) => {
    const {
        handleSubmit,
        formState: { errors, isDirty, isValid },
        control,
        reset,
    } = useForm<SignUpSchema>({
        resolver: zodResolver(signUpSchema),
        mode: 'onBlur',
    })

    const [register, { error }] = useRegisterMutation()

    const errorStatus = error && getApiError(error)
    const badRequestError = new BadRequestError()

    const onSubmit = async (data: SignUpSchema) => {
        const registrationResult = await register({
            email: data.email,
            password: data.password,
            password_confirmation: data.confirmPassword,
            name: data.username,
        })

        if ('error' in registrationResult) {
            console.error('Ошибка при регистрации:', registrationResult.error)
        } else {
            setVerifying(true)
            setEmail(data.email)
            reset()
        }
    }

    const { confirmPassword, email, password, username } = errors

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="mx-auto my-auto max-w-[480px] flex-col content-center rounded-2sxl border border-solid border-border-form px-10 py-6"
        >
            <Flex vertical gap={ESpacing.VALUE6}>
                <Title level={3} variant="h1" className="!mb-0 text-center">
                    Регистрация
                </Title>
                <Flex vertical gap={ESpacing.VALUE4}>
                    <Controller
                        name="email"
                        control={control}
                        render={({ field }) => (
                            <Input
                                {...field}
                                title="Почта"
                                placeholder="Введите почту"
                                autoComplete="email"
                                customVariant="single"
                                error={{
                                    message:
                                        errorStatus === badRequestError.code
                                            ? RegistrationError(
                                                  Number(errorStatus),
                                              )
                                            : email?.message || '',
                                    variant: 'error',
                                    className: '!mb-0',
                                }}
                                className={
                                    (email?.message && 'border-error') ||
                                    (errorStatus === badRequestError.code
                                        ? 'border-error'
                                        : '')
                                }
                            />
                        )}
                    />
                    <Controller
                        name="username"
                        control={control}
                        render={({ field }) => (
                            <Input
                                {...field}
                                title="Имя"
                                placeholder="Введите ваше имя"
                                autoComplete="username"
                                customVariant="single"
                                error={
                                    username && {
                                        message: username.message,
                                        variant: 'error',
                                        className: '!mb-0',
                                    }
                                }
                                className={username?.message && 'border-error'}
                            />
                        )}
                    />
                    <Controller
                        name="password"
                        control={control}
                        render={({ field }) => (
                            <PasswordInput
                                {...field}
                                title="Придумайте пароль"
                                placeholder="Пароль"
                                customVariant="single"
                                error={
                                    password && {
                                        message: password.message,
                                        variant: 'error',
                                        className: '!mb-0',
                                    }
                                }
                                className={password?.message && 'border-error'}
                            />
                        )}
                    />
                    <Controller
                        name="confirmPassword"
                        control={control}
                        render={({ field }) => (
                            <PasswordInput
                                {...field}
                                title="Повторите пароль"
                                placeholder="Подтвердите пароль"
                                customVariant="single"
                                error={
                                    confirmPassword && {
                                        message: confirmPassword.message,
                                        variant: 'error',
                                        className: '!mb-0',
                                    }
                                }
                                className={
                                    confirmPassword?.message && 'border-error'
                                }
                            />
                        )}
                    />
                </Flex>
                <Controller
                    name="laws"
                    control={control}
                    render={({ field }) => (
                        <Checkbox
                            field={field}
                            variant="primary"
                            className="text-sm font-normal"
                        >
                            Осуществляя регистрацию вы подтверждаете, своё
                            согласие с Политикой конфиденциальности
                        </Checkbox>
                    )}
                />
                <Flex vertical gap={ESpacing.VALUE2}>
                    <Button
                        htmlType="submit"
                        variant="saveField"
                        disabled={!isValid || !isDirty}
                    >
                        Зарегистрироваться
                    </Button>
                    <Link
                        to={routeMap.login}
                        variant="primary"
                        className="mb-4 mt-6 self-center"
                    >
                        Назад
                    </Link>
                </Flex>
            </Flex>
        </form>
    )
}
