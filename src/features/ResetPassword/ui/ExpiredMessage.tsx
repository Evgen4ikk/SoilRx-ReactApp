import { FC } from 'react'
import { routeMap } from '@model/api'
import Button from '@ui/Button'
import { ESpacing } from '@ui/Enums/Enums'
import Flex from '@ui/Flex'
import Link from '@ui/Link'
import Paragraph from '@ui/Paragraph'
import Title from '@ui/Title'

export const ExpiredMessage: FC = () => {
    return (
        <Flex vertical gap={ESpacing.VALUE6}>
            <Flex vertical gap={ESpacing.VALUE2}>
                <Title variant="primary" className="text-center !text-2xl">
                    Срок действия ссылки истек
                </Title>
                <Paragraph className="text-center text-base !font-normal text-gray-500">
                    Ссылка для сброса пароля действует сутки.
                    <br /> Отправьте новую ссылку.
                </Paragraph>
            </Flex>
            <Link to={routeMap.forgotPassword}>
                <Button
                    variant="saveField"
                    className="rounded-lg bg-accent px-5 py-4 text-base font-bold text-white"
                >
                    К восстановлению пароля
                </Button>
            </Link>
        </Flex>
    )
}
