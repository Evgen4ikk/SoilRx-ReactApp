import { FC } from 'react'
import { cn } from '@lib/dom/classnames'
import { ESpacing } from '@ui/Enums/Enums'
import Flex from '@ui/Flex/Flex'
import Progress from '@ui/Progress/Progress'
import Text from '@ui/Text/Text'
import { cva, VariantProps } from 'class-variance-authority'

interface IData {
    name: string
    uv: number
}

interface IProps {
    data: IData[]
    colors: string[]
    className: string
    strokeColors: string[]
}

const radialBarVariants = cva('', {
    variants: {
        variant: {},
        defaultVariants: {
            variant: 'primary',
        },
    },
})

const RadialBarChartMultiple: FC<
    IProps &
        VariantProps<typeof radialBarVariants> &
        React.RefAttributes<HTMLElement>
> = ({ variant, ...props }) => {
    const { data, colors, className } = props

    const progressBar = data.map((item, index) => {
        const size = 150 - 25 * index
        const width = 6 - index
        return (
            <Progress
                percent={item.uv}
                type="circle"
                showInfo={false}
                status="normal"
                strokeLinecap="round"
                size={size}
                strokeWidth={width}
                strokeColor={colors[index].substring(
                    4,
                    colors[index].length - 1,
                )}
                trailColor={index === 2 ? 'transparent' : 'var(--gray200)'}
                variant="reverse"
            />
        )
    })

    const legend = data.map((item, index) => (
        <Flex gap={ESpacing.VALUE2} align="center">
            <div
                className={cn(
                    `h-2 w-2 rounded-full content-[""]`,
                    colors[index],
                )}
            />
            <Text variant="radialBar">
                {item.name} - {item.uv}%
            </Text>
        </Flex>
    ))

    return (
        <Flex
            gap={ESpacing.VALUE6}
            vertical
            align="center"
            className={cn(radialBarVariants({ variant }), className)}
        >
            <Flex
                align="center"
                justify="center"
                className="relative h-[150px] w-[150px]"
            >
                {progressBar}
            </Flex>
            <Flex gap={ESpacing.VALUE4}>{legend}</Flex>
        </Flex>
    )
}

export default RadialBarChartMultiple
