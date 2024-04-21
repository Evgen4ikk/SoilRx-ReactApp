import { FC } from 'react'
import { routeMap } from '@model/api'
import Button from '@ui/Button'
import Link from '@ui/Link'
import Title from '@ui/Title'

export const PasswordChangedMessage: FC = () => {
    return (
        <>
            <Title variant="primary" className="text-center !text-2xl">
                Пароль успешно изменён
            </Title>
            <Link to={routeMap.login}>
                <Button
                    variant="saveField"
                    className="rounded-lg bg-accent px-5 py-4 text-base font-bold text-white"
                >
                    Перейти к авторизации
                </Button>
            </Link>
        </>
    )
}
