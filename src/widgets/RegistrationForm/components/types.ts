import { Dispatch, SetStateAction } from 'react'

export type TState = {
    setVerifying: Dispatch<SetStateAction<boolean>>
    setEmail: Dispatch<SetStateAction<string>>
}
