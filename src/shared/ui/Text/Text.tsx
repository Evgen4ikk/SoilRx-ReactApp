import { type FC } from 'react'
import { cn } from '@lib/dom/classnames'
import { Typography } from 'antd'
import { type TextProps } from 'antd/es/typography/Text'
import { cva, VariantProps } from 'class-variance-authority'

const { Text: AntdText } = Typography

const textVariants = cva('font-inter', {
    variants: {
        variant: {
            primary: 'text-gray-600 font-medium text-sm',
            lg: 'text-gray-600 font-medium text-lg',
            baseGray800: 'text-gray-800 font-medium text-base',
            radialBar: 'text-xs font-medium text-gray-800',
            simpleGray: 'text-sm font-normal text-info',
            simpleMarginBlack: 'text-sm font-normal text-black mb-4',
            error: 'text-sm font-normal text-error',
        },
        defaultVariants: {
            variant: 'primary',
        },
    },
})

const Text: FC<
    TextProps &
        VariantProps<typeof textVariants> &
        React.RefAttributes<HTMLElement>
> = ({ className, variant, ...props }) => (
    <AntdText {...props} className={cn(textVariants({ variant }), className)} />
)

export default Text
