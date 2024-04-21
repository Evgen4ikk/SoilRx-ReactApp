import { FC, ReactNode } from 'react'
import { useOutside } from '@hooks/useOutside'
import { cn } from '@lib/dom/classnames'

interface IProps {
    children: ReactNode
    className?: string
    isOpen: boolean
    onClose: () => void
}

export const Modal: FC<IProps> = ({ children, className, isOpen, onClose }) => {
    const { isShow, ref } = useOutside(isOpen, onClose)

    return (
        <>
            {isShow ||
                (isOpen && (
                    <div className="fixed left-0 top-0 z-[9999] h-full w-full bg-[#2D3748] bg-opacity-30">
                        <div
                            ref={ref}
                            className={cn(
                                'fixed left-[50%] top-[50%] -translate-x-1/2 -translate-y-1/2 bg-white',
                                className,
                            )}
                        >
                            {children}
                        </div>
                    </div>
                ))}
        </>
    )
}
