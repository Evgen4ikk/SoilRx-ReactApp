import { FC } from 'react'
import Button from '@ui/Button'
import Flex from '@ui/Flex'
import Title from '@ui/Title'

export const ErrorMessage: FC = () => {
    return (
        <Flex
            vertical
            className="absolute left-[50%] top-[50%] max-w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-lg border border-solid border-border-primary p-6 text-center"
        >
            <Title className="!text-4xl !text-gray-800">
                Произошла непредвиденная ошибка
            </Title>
            <Button
                variant="saveField"
                onClick={() => window.location.reload()}
            >
                Обновить страницу
            </Button>
        </Flex>
    )
}
