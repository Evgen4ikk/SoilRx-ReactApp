import { type FC } from 'react'
import { cn } from '@lib/dom/classnames'
import {
    Checkbox as AntCheckbox,
    ConfigProvider,
    type CheckboxProps,
} from 'antd'
import { cva, type VariantProps } from 'class-variance-authority'
import { type FieldValues } from 'react-hook-form'

const checkboxVariants = cva('flex content-start', {
    variants: {
        variant: {
            primary: '[&>span]:self-start',
        },
        defaultVariants: {
            variant: 'primary',
        },
    },
})

interface ICheckbox {
    field?: FieldValues
}

const Checkbox: FC<
    CheckboxProps &
        ICheckbox &
        VariantProps<typeof checkboxVariants> &
        React.RefAttributes<HTMLElement>
> = ({ className, variant, children, field }) => {
    return (
        <ConfigProvider
            theme={{
                token: {
                    colorBorder: 'var(--accent)',
                    lineWidth: 2,
                    fontSize: 15,
                    fontFamily: 'Inter',
                    colorText: 'var(--gray500)',
                },
            }}
        >
            <AntCheckbox
                {...field}
                className={cn(checkboxVariants({ variant }), className)}
            >
                {children}
            </AntCheckbox>
        </ConfigProvider>
    )
}

export default Checkbox
