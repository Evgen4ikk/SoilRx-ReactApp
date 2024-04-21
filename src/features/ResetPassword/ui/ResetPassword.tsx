import { FC, useState } from 'react'
import { ESpacing } from '@ui/Enums/Enums'
import Flex from '@ui/Flex'
import { ExpiredMessage } from './ExpiredMessage'
import { PasswordChangedMessage } from './PasswordChangedMessage'
import { ResetPasswordForm } from './ResetPasswordForm'

export const ResetPassword: FC = () => {
    const [isSuccess, setIsSuccess] = useState(false)
    const [isExpired, setIsExpired] = useState(false)

    return (
        <Flex vertical gap={ESpacing.VALUE6}>
            {isExpired ? (
                <ExpiredMessage />
            ) : isSuccess ? (
                <PasswordChangedMessage />
            ) : (
                <ResetPasswordForm
                    setIsSuccess={setIsSuccess}
                    setIsExpired={setIsExpired}
                />
            )}
        </Flex>
    )
}
