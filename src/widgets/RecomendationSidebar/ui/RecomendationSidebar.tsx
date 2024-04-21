import { FC } from 'react'
import CloseIcon from '@app/icons/close.svg?react'
import { RecommendationList } from '@features/RecommendationList'
import Button from '@ui/Button'
import { ESpacing } from '@ui/Enums/Enums'
import Flex from '@ui/Flex'
import Paragraph from '@ui/Paragraph'
import Title from '@ui/Title'

interface IProps {
    setShow: React.Dispatch<React.SetStateAction<boolean>>
}

export const RecomendationSidebar: FC<IProps> = ({ setShow }) => {
    return (
        <div className="fixed left-0 top-0 z-[999] h-full w-full bg-[#2D3748] bg-opacity-30">
            <Flex
                vertical
                // TODO: make a custom scrollbar
                className="z-100 absolute right-0 top-0 h-full w-[576px] overflow-y-auto bg-white px-8 py-12 "
                gap={ESpacing.VALUE6}
            >
                <Button
                    className="absolute right-8 top-12 p-2"
                    onClick={() => setShow(false)}
                >
                    <CloseIcon />
                </Button>
                <Flex vertical gap={ESpacing.VALUE2} className="max-w-[380px]">
                    <Title className="!m-0 !text-2xl !text-gray-800">
                        История рекомендаций
                    </Title>
                    <Paragraph className="text-sm font-medium text-gray-600">
                        В данном разделе вы можете ознакомиться с полной
                        историей всех рекомендаций по каждому анализу
                    </Paragraph>
                </Flex>
                <div className="h-[1px] w-full bg-border-primary" />
                <RecommendationList />
            </Flex>
        </div>
    )
}
