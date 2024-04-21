import { useGetFertileQuery } from '@entities/recomendation'
import Paragraph from '@ui/Paragraph'

interface IProps {
    id: number
}

export const AnalysisDate = ({ id }: IProps) => {
    const { data } = useGetFertileQuery(id)
    const date = data && new Date(data.Data)
    return (
        <Paragraph className="!text-sm !font-medium !text-gray-800">
            {date && `${date.toLocaleDateString('ru-RU')}`}
        </Paragraph>
    )
}
