export type TVoidFn = () => void

export type Error = {
    error?: {
        message?: string
        variant: any
        className?: string
    }
}
