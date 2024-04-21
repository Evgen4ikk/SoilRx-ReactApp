import { FC } from 'react'
import { cn } from '@lib/dom/classnames.ts'
import { Table as AntTable, type TableProps } from 'antd'
import { cva, VariantProps } from 'class-variance-authority'

interface IProps {
    containerClassName?: string
}

// TODO: fix font problem
const tableVariants = cva('w-[1408px] !font-inter', {
    variants: {
        variant: {
            primary: 'rounded-xl',
            fontBold: 'font-bold',
        },
        defaultVariants: {
            variant: 'primary',
        },
    },
})

const Table: FC<TableProps & IProps & VariantProps<typeof tableVariants>> = ({
    variant,
    containerClassName,
    className,
    ...props
}) => {
    return (
        <div className={cn(tableVariants({ variant }), containerClassName)}>
            <AntTable
                {...props}
                size="large"
                pagination={false}
                bordered
                className={className}
            />
        </div>
    )
}

export default Table
