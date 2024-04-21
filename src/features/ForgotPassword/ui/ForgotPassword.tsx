import { FC, useState } from 'react'
import { useCountdownTimer } from '@hooks/useCountdownTimer'
import { ESpacing } from '@ui/Enums/Enums'
import { Flex } from 'antd'
import { ForgotPasswordForm } from './ForgotPasswordForm'
import { VerificationMessage } from './VerificationMessage'

export const ForgotPassword: FC = () => {
    const [isVerifying, setVerifying] = useState(false)
    const [email, setEmail] = useState('')

    const timer = useCountdownTimer(60)

    return (
        <Flex vertical gap={ESpacing.VALUE6}>
            {isVerifying ? (
                <VerificationMessage
                    email={email}
                    setVerifying={setVerifying}
                    timer={timer}
                />
            ) : (
                <ForgotPasswordForm
                    setEmail={setEmail}
                    setVerifying={setVerifying}
                    timer={timer}
                />
            )}
        </Flex>
    )
}
