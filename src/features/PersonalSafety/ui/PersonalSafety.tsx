import { FC } from 'react'
import { ESpacing } from '@ui/Enums/Enums'
import Flex from '@ui/Flex'
import Title from '@ui/Title'
import { EmailForm } from './EmailForm'
import { PasswordForm } from './PasswordForm'

interface IProps {
    userId: number
    email?: string
}

export const PersonalSafety: FC<IProps> = ({ userId, email }) => {
    return (
        <Flex vertical gap={ESpacing.VALUE4}>
            <Title className="!m-0 !text-lg !text-gray-800">Безопасность</Title>
            <Flex vertical gap={ESpacing.VALUE2}>
                <EmailForm email={email} userId={userId} />
                <PasswordForm userId={userId} />
            </Flex>
        </Flex>
    )
}
