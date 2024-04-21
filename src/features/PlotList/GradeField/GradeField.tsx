import { FC } from 'react'
import { useGetFertileQuery } from '@entities/recomendation'
import { cn } from '@lib/dom/classnames'
import Text from '@ui/Text'

interface IProps {
    id: number
}

export const GradeField: FC<IProps> = (props) => {
    const { id } = props
    const { data: fertile } = useGetFertileQuery(id)

    const getColor = (status: string) => {
        switch (status) {
            case 'Высокоплодородная':
                return 'bg-success-secondary text-success-primary'
            case 'Плодородная':
                return 'bg-error-secondary text-error'
            case 'не плодородная':
                return 'bg-warning-secondary text-warning-primary'
            default:
                return ''
        }
    }

    return (
        <Text
            className={cn(
                'rounded px-2 py-1 text-sm font-medium capitalize text-white',
                fertile && getColor(fertile.soil),
            )}
        >
            {fertile && fertile.soil}
        </Text>
    )
}
