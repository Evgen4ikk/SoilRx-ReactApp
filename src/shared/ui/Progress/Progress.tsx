import { type FC } from 'react'
import { cn } from '@lib/dom/classnames'
import { Progress as AntProgress, type ProgressProps } from 'antd'
import { cva, VariantProps } from 'class-variance-authority'

const progressVariants = cva('', {
    variants: {
        variant: {
            primary: '',
            reverse: 'absolute -scale-x-[1]',
        },
        defaultVariants: {
            variant: 'primary',
        },
    },
})

const Progress: FC<
    ProgressProps &
        VariantProps<typeof progressVariants> &
        React.RefAttributes<HTMLDivElement>
> = ({ className, variant, ...props }) => (
    <AntProgress
        {...props}
        className={cn(progressVariants({ variant }), className)}
    />
)

export default Progress
