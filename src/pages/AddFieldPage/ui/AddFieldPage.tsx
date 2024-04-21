import { FC } from 'react'
import { AddFieldForm } from '@features/AddField'
import { ESpacing } from '@ui/Enums/Enums'
import Flex from '@ui/Flex/Flex'
import Paragraph from '@ui/Paragraph/Paragraph'
import Title from '@ui/Title/Title'

export const AddFieldPage: FC = () => {
    return (
        <Flex
            vertical
            gap={ESpacing.VALUE8}
            className="mx-auto mt-10 w-[1408px] pb-20"
        >
            <Title className="!text-4xl !text-gray-800">Создание поля</Title>
            <Flex vertical gap={ESpacing.VALUE6} className="max-w-[600px]">
                <Flex vertical gap={ESpacing.VALUE2}>
                    <Title className="!m-0 !text-2xl !text-gray-800">
                        Общая информация
                    </Title>
                    <Paragraph className="text-lg text-gray-600">
                        Важно заполнить все поля, чтобы работа с сервисом была
                        наиболее комфортной
                    </Paragraph>
                </Flex>
                <AddFieldForm />
            </Flex>
        </Flex>
    )
}
