import { FC, useState } from 'react'
import { useGetFieldByIdQuery } from '@entities/field'
import { EditFieldForm } from '@features/AddField'
import ConfirmRemoveForm from '@features/ConfirmRemoveForm'
import { ESpacing } from '@ui/Enums/Enums'
import Flex from '@ui/Flex'
import Paragraph from '@ui/Paragraph'
import Title from '@ui/Title'
import { useNavigate, useParams } from 'react-router'
import { EditFieldPageLoading } from './EditFieldPageLoading'

export const EditFieldPage: FC = () => {
    const params = useParams()
    const id = Number(params.id)
    const [isShowModal, setIsShowModal] = useState(false)
    const navigate = useNavigate()

    const { data: field, isLoading } = useGetFieldByIdQuery(id)

    if (isLoading) {
        return <EditFieldPageLoading />
    }

    return (
        <>
            {isShowModal && (
                <>
                    <ConfirmRemoveForm
                        title="Отменить редактирование поля?"
                        description="Если вы отмените редактирование поля, все внесённые изменения не будут сохранены."
                        leftBtnText="Назад"
                        rightBtnText="Отменить редактирование"
                        setIsShow={setIsShowModal}
                        isCancel={false}
                        isShow={isShowModal}
                        actions={{
                            leftAction: () => setIsShowModal(false),
                            rightAction: () => navigate(-1),
                        }}
                    />
                </>
            )}
            <Flex vertical gap={ESpacing.VALUE8} className="pt-10">
                <Title className="!m-0 !text-4xl !text-gray-800">
                    Редактирование поля
                </Title>
                <Flex vertical gap={ESpacing.VALUE6} className="max-w-[600px]">
                    <Flex vertical gap={ESpacing.VALUE2}>
                        <Title className="!m-0 !text-2xl !text-gray-800">
                            {field?.name}
                        </Title>
                        <Paragraph className="text-lg text-gray-600">
                            У этого поля есть 0 участков.
                        </Paragraph>
                    </Flex>
                    <EditFieldForm field={field} setIsShow={setIsShowModal} />
                </Flex>
            </Flex>
        </>
    )
}
