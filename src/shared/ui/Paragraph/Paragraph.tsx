import { type FC } from 'react'
import { cn } from '@lib/dom/classnames'
import { Typography } from 'antd'
import { type ParagraphProps } from 'antd/es/typography/Paragraph'
import { cva, type VariantProps } from 'class-variance-authority'

const { Paragraph: AntParagraph } = Typography

const paragraphVariants = cva('!m-0 font-inter', {
    variants: {
        variant: {
            primary: 'text-xs font-medium',
            textField: 'text-info text-base font-normal max-w-[600px] mb-2',
            smGray500: 'text-sm text-gray-500 font-medium',
            smGray600: 'text-sm text-gray-600 font-medium',
            baseGray600: 'text-base text-gray-600 font-medium',
            lgGray600: '!text-lg text-gray-600',
            lgGray800: '!text-lg text-gray-800',
        },
        defaultVariants: {
            variant: 'primary',
        },
    },
})

const Paragraph: FC<
    ParagraphProps &
        VariantProps<typeof paragraphVariants> &
        React.RefAttributes<HTMLElement>
> = ({ className, variant, ...props }) => (
    <AntParagraph
        {...props}
        className={cn(paragraphVariants({ variant }), className)}
    />
)

export default Paragraph
