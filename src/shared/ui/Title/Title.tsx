import { type FC } from 'react'
import { cn } from '@lib/dom/classnames'
import { Typography } from 'antd'
import { type TitleProps } from 'antd/es/typography/Title'
import { cva, VariantProps } from 'class-variance-authority'

const { Title: AntdTitle } = Typography

const titleVariants = cva('!font-bold font-inter', {
    variants: {
        variant: {
            primary: '!text-gray-800 text-lg !my-0',
            h1: '!text-gray-800 !text-2xl !mb-6',
            h4: '!mb-2 text-gray-800',
        },
        defaultVariants: {
            variant: 'primary',
        },
    },
})

const Title: FC<
    TitleProps &
        VariantProps<typeof titleVariants> &
        React.RefAttributes<HTMLElement>
> = ({ className, variant, ...props }) => (
    <AntdTitle
        {...props}
        className={cn(titleVariants({ variant }), className)}
    />
)

export default Title
