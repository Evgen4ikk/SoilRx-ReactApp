import { FC, useState } from 'react'
import DownloadIcon from '@app/icons/download.svg?react'
import HistoryIcon from '@app/icons/history.svg?react'
import { useGeneratePdfQuery } from '@entities/recomendation/api/api'
import { CultureRecommendation } from '@features/CultureRecommendation'
import { SoilRecommendation } from '@features/SoilRecommendation'
import { ESpacing } from '@ui/Enums/Enums'
import Flex from '@ui/Flex'
import Paragraph from '@ui/Paragraph'
import Title from '@ui/Title'
import { RecomendationSidebar } from '@widgets/RecomendationSidebar'
import { useParams } from 'react-router'

export const CurrentRecommendation: FC = () => {
    const params = useParams()
    const id = Number(params.plotId)
    const [showSidebar, setShowSidebar] = useState(false)
    const { data } = useGeneratePdfQuery(id)
    return (
        <>
            <Flex
                vertical
                className="relative h-full rounded-lg border border-solid border-border-primary p-6"
                gap={ESpacing.VALUE6}
            >
                <Flex gap={ESpacing.VALUE1} className="absolute right-6 top-6">
                    <a
                        className="cursor-pointer rounded-md bg-secondary p-[9px]"
                        href={data}
                        download="analysis.pdf"
                    >
                        <DownloadIcon width={14} />
                    </a>
                    <div
                        className="cursor-pointer rounded-md bg-secondary p-[9px]"
                        onClick={() => setShowSidebar(true)}
                    >
                        <HistoryIcon width={14} />
                    </div>
                </Flex>
                <Flex vertical className="max-w-[380px]" gap={ESpacing.VALUE2}>
                    <Title className="!m-0 !text-lg !text-gray-800">
                        Рекомендации
                    </Title>
                    <Paragraph className="text-sm font-medium text-gray-600">
                        Ознакомьтесь с рекомендациями по удобрению почвы и
                        высадке культур, которые мы подготовили
                    </Paragraph>
                </Flex>
                <div className="h-[1px] w-full bg-border-primary" />
                <SoilRecommendation />
                <div className="h-[1px] w-full bg-border-primary" />
                <CultureRecommendation />
            </Flex>
            {showSidebar && <RecomendationSidebar setShow={setShowSidebar} />}
        </>
    )
}
