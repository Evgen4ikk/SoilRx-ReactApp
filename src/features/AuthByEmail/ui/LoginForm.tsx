import { useContext, useEffect } from 'react'
import { AuthContext } from '@app/providers/AuthProvider/AuthContext'
import {
    LoginError,
    LoginFormData,
    LoginSchema,
    useConfirmEmailMutation,
    useLoginMutation,
} from '@entities/Auth/login'
import {
    ForbiddenError,
    NotFoundError,
    UnauthorizedError,
} from '@entities/common'
import { zodResolver } from '@hookform/resolvers/zod'
import { getApiError } from '@lib/dom/getApiError'
import { routeMap } from '@shared/model/api'
import Button from '@ui/Button'
import { ESpacing } from '@ui/Enums/Enums'
import Flex from '@ui/Flex'
import Input from '@ui/Input'
import Link from '@ui/Link'
import PasswordInput from '@ui/PasswordInput'
import Title from '@ui/Title'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'

export const LoginForm = () => {
    const { accessToken, setAccessToken } = useContext(AuthContext)

    const {
        handleSubmit,
        control,
        formState: { errors, isDirty, isValid },
        getValues,
    } = useForm<LoginFormData>({
        resolver: zodResolver(LoginSchema),
        mode: 'onBlur',
    })

    const [login, { error, data: loginResponse }] = useLoginMutation()
    const [confirmEMail] = useConfirmEmailMutation()

    const errorStatus = error && getApiError(error)
    const unauthorizedError = new UnauthorizedError()
    const notFoundError = new NotFoundError()
    const forbiddenError = new ForbiddenError()

    const onSubmit: SubmitHandler<LoginFormData> = async (data) => {
        await login(data)
    }

    const { email, password } = errors

    useEffect(() => {
        if (loginResponse) {
            setAccessToken(loginResponse.access_token)
        }
    }, [loginResponse, accessToken])

    const handleForbiddenError = async () => {
        if (errorStatus === forbiddenError.code) {
            const emailValue = getValues('email')
            if (emailValue) {
                await confirmEMail({ email: emailValue })
            }
        }
    }

    useEffect(() => {
        handleForbiddenError()
    }, [errorStatus])

    return (
        <Flex vertical gap={ESpacing.VALUE6} className="max-w-[400px]">
            <Title variant="primary" className="text-center !text-2xl">
                Авторизация
            </Title>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Flex vertical gap={ESpacing.VALUE4}>
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
                                    (errorStatus === notFoundError.code ||
                                    errorStatus === unauthorizedError.code ||
                                    errorStatus === forbiddenError.code
                                        ? 'border-error'
                                        : '')
                                }
                                error={{
                                    message:
                                        errorStatus === notFoundError.code ||
                                        errorStatus === forbiddenError.code
                                            ? LoginError(Number(errorStatus))
                                            : email?.message || '',
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
                                placeholder="Введите пароль"
                                customVariant="single"
                                className={
                                    (password?.message && 'border-error') ||
                                    (errorStatus === unauthorizedError.code
                                        ? 'border-error'
                                        : '')
                                }
                                error={{
                                    message:
                                        errorStatus === unauthorizedError.code
                                            ? LoginError(Number(errorStatus))
                                            : password?.message || '',
                                    variant: 'error',
                                }}
                            />
                        )}
                    />
                    <Flex vertical gap={ESpacing.VALUE2}>
                        <Button
                            htmlType="submit"
                            variant="saveField"
                            disabled={!isDirty || !isValid}
                        >
                            Войти
                        </Button>

                        <Button variant="secondAction">
                            <Link to={routeMap.register}>
                                Зарегистрироваться
                            </Link>
                        </Button>

                        <Button variant="lastAction">
                            <Link to={routeMap.forgotPassword}>
                                Забыли пароль?
                            </Link>
                        </Button>
                    </Flex>
                </Flex>
            </form>
        </Flex>
    )
}
