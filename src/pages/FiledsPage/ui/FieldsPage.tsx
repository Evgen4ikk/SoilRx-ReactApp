import { FC } from 'react'
import { useGetFieldsQuery } from '@entities/field'
import { AddField } from '@features/AddField'
import FieldCard from '@features/FieldCard'
import { routeMap } from '@shared/model/api'
import Button from '@ui/Button'
import { ESpacing } from '@ui/Enums/Enums'
import Flex from '@ui/Flex'
import Link from '@ui/Link'
import Paragraph from '@ui/Paragraph/Paragraph'
import Title from '@ui/Title/Title'
import { FieldsLoading } from './FieldsLoading'

export const FieldsPage: FC = () => {
    const { data: fields, isLoading } = useGetFieldsQuery(null)

    if (isLoading) {
        return <FieldsLoading />
    }

    if (!fields) {
        return null
    }

    return (
        <Flex
            vertical
            gap={ESpacing.VALUE8}
            className="mx-auto mt-10 w-[1408px]"
        >
            {fields.data.length !== 0 ? (
                <>
                    <Title className="!text-4xl !text-gray-800">Мои поля</Title>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
                        {fields.data.map((field) => (
                            <FieldCard
                                key={field.id}
                                id={field.id}
                                cadastre_number={field.cadastre_number}
                                name={field.name}
                                size={field.size}
                                plots_number={field.number_of_plots}
                            />
                        ))}
                        <AddField />
                    </div>
                </>
            ) : (
                <Flex
                    vertical
                    gap={ESpacing.VALUE6}
                    className="mx-auto mt-10 text-center"
                >
                    <img
                        src="/images/no-fields.png"
                        alt="no-fields"
                        width={160}
                        className="mx-auto"
                    />
                    <Flex vertical gap={ESpacing.VALUE2}>
                        <Title className="!text-2xl !text-gray-800">
                            У вас пока нет полей
                        </Title>
                        <Paragraph className="!text-base text-gray-600">
                            Добавьте хотя бы одно поле
                        </Paragraph>
                    </Flex>
                    <Link to={routeMap.fieldCreate}>
                        <Button
                            variant="saveField"
                            className="mx-auto !w-[155px] !min-w-[155px] py-3 !font-medium"
                        >
                            Добавить поле
                        </Button>
                    </Link>
                </Flex>
            )}
        </Flex>
    )
}
