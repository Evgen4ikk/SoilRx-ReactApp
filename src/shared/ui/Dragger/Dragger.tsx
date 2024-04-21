import { type FC } from 'react'
import { cn } from '@lib/dom/classnames'
import { Upload as AntDragger, type UploadProps } from 'antd'
import { cva, VariantProps } from 'class-variance-authority'

const draggerVariants = cva('', {
    variants: {
        variant: {
            primary: '',
        },
        defaultVariants: {
            variant: 'primary',
        },
    },
})

const Dragger: FC<
    UploadProps &
        VariantProps<typeof draggerVariants> &
        React.RefAttributes<HTMLElement>
> = ({ className, variant, ...props }) => (
    <AntDragger
        {...props}
        className={cn(draggerVariants({ variant }), className)}
    />
)
export default Dragger
