import { type FC } from 'react'
import { cn } from '@lib/dom/classnames'
import { cva, VariantProps } from 'class-variance-authority'
import { Link as RouterLink, type LinkProps } from 'react-router-dom'

const linkVariants = cva('font-inter', {
    variants: {
        variant: {
            primary: 'text-accent font-bold text-base',
            grey: 'text-xs font-medium text-gray-800',
            simpleMarginBlack: 'text-sm font-normal !text-black mb-4',
        },
        defaultVariants: {
            variant: 'primary',
        },
    },
})

const Link: FC<LinkProps & VariantProps<typeof linkVariants>> = ({
    className,
    variant,
    children,
    ...props
}) => (
    <RouterLink {...props} className={cn(linkVariants({ variant }), className)}>
        {children}
    </RouterLink>
)

export default Link
