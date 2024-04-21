import { forwardRef } from 'react'
import { Flex as AntFlex, FlexProps } from 'antd'

interface IProps extends FlexProps {
    className?: string
}

const Flex = forwardRef<HTMLDivElement, IProps>(
    ({ className, ...props }, ref) => (
        <AntFlex {...props} className={className} ref={ref} />
    ),
)

export default Flex
