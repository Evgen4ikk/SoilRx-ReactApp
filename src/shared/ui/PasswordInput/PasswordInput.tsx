import { forwardRef, type FC } from 'react'
import { type Error } from '@customTypes/common'
import { cn } from '@lib/dom/classnames'
import Text from '@ui/Text'
import { Input as AntInput, type InputRef } from 'antd'
import { PasswordProps } from 'antd/es/input'
import { cva, VariantProps } from 'class-variance-authority'
import Flex from '../Flex'

const passwordVariants = cva(
    'text-base font-inter focus:border-primary hover:border-primary focus:shadow-none shadow-none',
    {
        variants: {
            customVariant: {
                primary:
                    '[&>input]:placeholder-info [&>input]:font-inter [&>input]:font-normal py-3.5 px-4.5 border-primary border rounded-lg text-gray-800 h-fit max-w-[600px] font-normal',
                single: '[&>input]:placeholder-info py-3 px-4 border-primary border rounded-lg [&>input]:text-gray-800 [&>input]:h-fit [&>input]:max-w-[600px] [&>input]:font-normal',
            },
            defaultVariants: {
                variant: 'primary',
            },
        },
    },
)

const PasswordInput: FC<
    PasswordProps &
        Error &
        VariantProps<typeof passwordVariants> &
        React.RefAttributes<InputRef>
> = forwardRef<
    InputRef,
    PasswordProps & Error & VariantProps<typeof passwordVariants>
>(({ className, placeholder, customVariant, error, ...props }, ref) => {
    return (
        <Flex vertical gap={0}>
            <AntInput.Password
                ref={ref}
                placeholder={placeholder}
                className={cn(passwordVariants({ customVariant }), className)}
                {...props}
            />
            {error && (
                <Text
                    variant={error.variant}
                    className={error.className}
                >{`${error.message}`}</Text>
            )}
        </Flex>
    )
})

export default PasswordInput
