import { FC } from 'react'
import { LoginForm } from '@features/AuthByEmail'

export const LoginPage: FC = () => {
    return (
        <div className="mx-auto mt-[120px] w-[480px] rounded-[20px] border border-solid border-border-primary bg-white px-10 py-6">
            <LoginForm />
        </div>
    )
}
