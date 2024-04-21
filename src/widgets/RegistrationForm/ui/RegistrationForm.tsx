import { useState } from 'react'
import { FirstStage } from '../components/FirstStage'
import { SecondStage } from '../components/SecondStage'

export const RegistrationForm = () => {
    const [isVerifying, setVerifying] = useState(false)
    const [email, setEmail] = useState('')
    return isVerifying ? (
        <SecondStage email={email} />
    ) : (
        <FirstStage setVerifying={setVerifying} setEmail={setEmail} />
    )
}
