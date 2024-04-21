import { FC } from 'react'
import { ESpacing } from '@ui/Enums/Enums'
import Flex from '@ui/Flex'
import { RecommendationItem } from './RecommendationItem'

export const RecommendationList: FC = () => {
    const recommendations = [{ id: 1 }, { id: 2 }, { id: 3 }]
    return (
        <Flex vertical gap={ESpacing.VALUE4}>
            {recommendations.map((data) => (
                <RecommendationItem key={data.id} />
            ))}
        </Flex>
    )
}
