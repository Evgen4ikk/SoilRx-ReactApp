import { type FC } from 'react'
import { cn } from '@lib/dom/classnames'
import { Button as AntButton, type ButtonProps } from 'antd'
import { cva, type VariantProps } from 'class-variance-authority'

const buttonVariants = cva('font-inter !h-fit shadow-none', {
    variants: {
        variant: {
            settings:
                '!p-2 border rounded-lg box-content !w-fit leading-none border-accent font-medium ',
            icon: 'h-fit cursor-pointer rounded-lg bg-accent p-3 hover:!bg-accent-hover active:!bg-accent-dark disabled:!bg-gray-300 border-none',
            header: 'mr-16 rounded border-none px-3 py-4 font-inter text-s7 font-medium text-accent',
            remove: 'h-fit cursor-pointer rounded-lg p-3 border-none',
            iconText:
                'px-4 py-1.5 flex gap-2 bg-secondary !text-accent text-xs rounded-lg border-none hover:bg-secondary box-content font-medium enabled:active:!bg-accent-dark enabled:hover:!bg-accent-hover enabled:hover:!text-white disabled:bg-grey-300',
            lastAction:
                'rounded-lg border-none bg-none px-5 py-4 text-base font-bold text-accent outline-none enabled:hover:!text-accent-hover enabled:active:!text-accent-dark disabled:text-grey-500 disabled:bg-transparent',
            secondAction:
                'rounded-lg bg-secondary px-5 py-4 text-base font-bold text-accent border-none disabled:text-grey-500 disabled:bg-grey-300 enabled:active:!bg-press-secondary enabled:hover:!text-accent enabled:hover:!bg-secondary-hover',
            fieldAction:
                'w-full max-w-[153px] px-4.5 py-4 text-sm rounded-lg text-white disabled:text-grey-500 bg-accent border-none enabled:active:!bg-accent-dark enabled:hover:!bg-accent-hover enabled:hover:!text-white disabled:bg-grey-300 font-medium',
            saveField:
                'w-full min-w-[260px] px-4.5 py-4 text-base rounded-lg text-white disabled:text-grey-500 bg-accent border-none enabled:active:!bg-accent-dark enabled:hover:!bg-accent-hover enabled:hover:!text-white disabled:bg-grey-300 font-bold ',
            removeAction:
                'w-full max-w-[212px] px-4.5 py-4 text-base rounded-lg text-error bg-warning-bg border-none font-medium enabled:active:!bg-warning-bg enabled:hover:!bg-warning-bg enabled:hover:!text-error',
        },
        defaultVariants: {
            variant: 'settings',
        },
    },
})

const Button: FC<
    ButtonProps &
        VariantProps<typeof buttonVariants> &
        React.RefAttributes<HTMLElement>
> = ({ className, variant, ...props }) => (
    <AntButton
        {...props}
        className={cn(buttonVariants({ variant }), className)}
    />
)

export default Button
