import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react'

type TypeOut = {
    ref: React.RefObject<HTMLDivElement>
    isShow: boolean
    setIsShow: Dispatch<SetStateAction<boolean>>
}

export const useOutside = (
    initialIsVisible: boolean,
    onClose?: () => void,
): TypeOut => {
    const [isShow, setIsShow] = useState(initialIsVisible)
    const ref = useRef<HTMLDivElement>(null)

    const handleClickOutside = (event: MouseEvent) => {
        if (ref.current && !ref.current.contains(event.target as Node)) {
            if (onClose) onClose()
            setIsShow(false)
        }
    }

    useEffect(() => {
        document.addEventListener('click', handleClickOutside, true)
        return () => {
            document.removeEventListener('click', handleClickOutside, true)
        }
    }, [])

    return { isShow, ref, setIsShow }
}
