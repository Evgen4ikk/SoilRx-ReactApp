import { FC } from 'react'
import { ForgotPassword } from '@features/ForgotPassword'

export const ForgotPasswordPage: FC = () => {
    return (
        <div className="mx-auto mt-[120px] w-[480px] rounded-[20px] border border-solid border-border-primary bg-white px-10 py-6">
            <ForgotPassword />
        </div>
    )
}
