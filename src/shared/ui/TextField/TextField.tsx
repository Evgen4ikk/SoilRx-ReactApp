import { FC, useRef } from 'react'
import { type Error } from '@customTypes/common'
import Flex from '@ui/Flex/Flex'
import Input from '@ui/Input/Input'
import Paragraph from '@ui/Paragraph/Paragraph'
import PasswordInput from '@ui/PasswordInput'
import { cva, VariantProps } from 'class-variance-authority'

interface ITextField {
    title?: string
    placeholder?: string
    error?: Error
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
    className?: string
    isPass?: boolean
    type?: 'text' | 'number'
    value?: string | number
}

const fieldVariants = cva('', {
    variants: {
        variant: {
            primary: 'mb-4',
        },
        defaultVariants: {
            variant: 'primary',
        },
    },
})

export const TextField: FC<
    ITextField &
        VariantProps<typeof fieldVariants> &
        React.RefAttributes<HTMLElement>
> = ({ variant, ...props }) => {
    const {
        title,
        placeholder,
        className,
        error,
        isPass,
        onChange,
        type,
        value,
    } = props

    const ref = useRef<HTMLInputElement>(null)
    
    return (
        <Flex {...props} vertical className={className} ref={ref}>
            {title && (
                <Paragraph
                    variant="textField"
                    className="!mb-2 max-w-[600px] !text-base !font-normal text-info"
                >
                    {title}
                </Paragraph>
            )}
            {isPass ? (
                <PasswordInput
                    onChange={onChange}
                    placeholder={placeholder}
                    customVariant="single"
                    type={type}
                    value={value}
                    error={error?.error ? error.error : undefined}
                />
            ) : (
                <Input
                    onChange={onChange}
                    placeholder={placeholder}
                    customVariant="single"
                    type={type}
                    value={value}
                    error={error?.error ? error.error : undefined}
                />
            )}
        </Flex>
    )
}
