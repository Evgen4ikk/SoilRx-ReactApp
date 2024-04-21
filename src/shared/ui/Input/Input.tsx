import React, { FC, forwardRef } from 'react'
import { cn } from '@lib/dom/classnames'
import { type Error } from '@shared/types/common'
import Text from '@ui/Text'
import { Input as AntInput, type InputProps, type InputRef } from 'antd'
import { cva, VariantProps } from 'class-variance-authority'
import Flex from '../Flex'

const inputVariants = cva(
    'text-base font-inter focus:border-primary hover:border-primary focus:shadow-none shadow-none',
    {
        variants: {
            customVariant: {
                primary:
                    'placeholder-info font-inter py-3.5 px-4.5 border-primary border rounded-lg text-gray-800 h-12 max-w-[600px] font-normal',
                single: 'placeholder-info py-3.5 px-4 h-12 border-primary border rounded-lg text-gray-800 max-w-[600px] font-normal border-solid',
            },
            defaultVariants: {
                variant: 'primary',
            },
        },
    },
)

const Input: FC<
    InputProps &
        Error &
        VariantProps<typeof inputVariants> &
        React.RefAttributes<InputRef>
> = forwardRef<
    InputRef,
    InputProps & Error & VariantProps<typeof inputVariants>
>((props, ref) => {
    const { className, placeholder, customVariant, error, ...rest } = props
    return (
        <Flex vertical gap={0}>
            <AntInput
                ref={ref}
                placeholder={placeholder}
                className={cn(inputVariants({ customVariant }), className)}
                {...rest}
            />
            {error && (
                <Text variant={error.variant} className={error.className}>
                    {error.message}
                </Text>
            )}
        </Flex>
    )
})

export default Input
