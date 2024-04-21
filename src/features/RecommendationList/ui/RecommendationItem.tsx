import { FC, useState } from 'react'
import DownIcon from '@app/icons/down.svg?react'
import DownloadIcon from '@app/icons/download.svg?react'
import { GradeField } from '@features/PlotList'
import { ESpacing } from '@ui/Enums/Enums'
import Flex from '@ui/Flex'
import Paragraph from '@ui/Paragraph'
import { useParams } from 'react-router'
import { RecommendationInfo } from './RecommendationInfo'

export const RecommendationItem: FC = () => {
    const params = useParams()
    const id = Number(params.plotId)
    const [isShowInfo, setIsShowInfo] = useState(false)
    return (
        <>
            <Flex align="center" justify="space-between">
                <Flex vertical gap={ESpacing.VALUE1}>
                    <Flex gap={ESpacing.VALUE1} align="center">
                        <Paragraph className="text-xs font-normal text-gray-800">
                            Дата исследования:
                        </Paragraph>
                        <Paragraph className="text-xs font-medium text-gray-800">
                            22.03
                        </Paragraph>
                    </Flex>
                    <Flex gap={ESpacing.VALUE1} align="center">
                        <Paragraph className="text-[10px] font-normal text-gray-600">
                            Дата добавления:
                        </Paragraph>
                        <Paragraph className="text-[10px] font-medium text-gray-600">
                            24.03
                        </Paragraph>
                    </Flex>
                </Flex>
                <GradeField id={id} />
                <Flex gap={ESpacing.VALUE2}>
                    <div className="cursor-pointer rounded-[4px] bg-secondary p-[9px]">
                        <DownloadIcon width={14} height={14} />
                    </div>
                    <div
                        className="cursor-pointer rounded-[4px] border border-solid border-border-primary p-[9px]"
                        onClick={() => setIsShowInfo(!isShowInfo)}
                    >
                        <DownIcon
                            width={12}
                            height={12}
                            className={isShowInfo ? 'rotate-180' : ''}
                        />
                    </div>
                </Flex>
            </Flex>
            <div className="h-[1px] w-full bg-border-primary" />
            {isShowInfo && <RecommendationInfo />}
        </>
    )
}
