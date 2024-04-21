import { type FC } from 'react'
import { type Error } from '@/shared/types/common'
import { cn } from '@lib/dom/classnames'
import Flex from '@ui/Flex'
import Text from '@ui/Text'
import { Select as AntSelect, type SelectProps } from 'antd'
import { cva, VariantProps } from 'class-variance-authority'

const selectVariants = cva('', {
    variants: {
        customVariant: {
            primary:
                'border-primary h-12 max-w-[600px] rounded-lg border font-inter text-base font-normal text-info',
        },
        defaultVariants: {
            variant: 'primary',
        },
    },
})

const Select: FC<SelectProps & Error & VariantProps<typeof selectVariants>> = ({
    className,
    customVariant,
    error,
    ...props
}) => (
    <Flex vertical gap={0}>
        <AntSelect
            {...props}
            className={cn(selectVariants({ customVariant }), className)}
        />
        {error && (
            <Text variant={error.variant} className={error.className}>
                {error.message}
            </Text>
        )}
    </Flex>
)

export default Select
