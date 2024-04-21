import { FC, useState } from 'react'
import { useGetPlotsQuery } from '@/entities/plot'
import DeleteIcon from '@app/icons/delete.svg?react'
import EditIcon from '@app/icons/edit.svg?react'
import PlusIcon from '@app/icons/plusWhite.svg?react'
import { FieldData, useDeleteFieldMutation } from '@entities/field'
import ConfirmRemoveForm from '@features/ConfirmRemoveForm'
import { routeMap } from '@model/api'
import { ESpacing } from '@ui/Enums/Enums'
import Flex from '@ui/Flex'
import Link from '@ui/Link'
import Paragraph from '@ui/Paragraph'
import Title from '@ui/Title'
import { useNavigate } from 'react-router'

interface IProps {
    field: FieldData
}

export const FieldDetailCard: FC<IProps> = ({ ...props }) => {
    const { field } = props
    const navigate = useNavigate()

    const { data: plots } = useGetPlotsQuery(null)
    const plotsArr = plots?.filter((item) => item.field_id === field.id)

    const [isShowModal, setIsShowModal] = useState(false)
    const [deleteField] = useDeleteFieldMutation()

    const handleDelete = async () => {
        field && (await deleteField(field.id))
        navigate(routeMap.fields)
    }

    return (
        <>
            {isShowModal && (
                <>
                    <ConfirmRemoveForm
                        title={`Вы действительно хотите удалить ${field?.name}?`}
                        description="Вместе с полем удалятся все участки и рекомендации, относящиеся к нему."
                        leftBtnText="Назад"
                        rightBtnText="Удалить"
                        setIsShow={setIsShowModal}
                        isShow={isShowModal}
                        isCancel
                        actions={{
                            leftAction: () => setIsShowModal(false),
                            rightAction: handleDelete,
                        }}
                    />
                </>
            )}
            <Flex
                justify="space-between"
                className="mb-10 rounded-lg border border-solid border-border-primary p-4"
            >
                <Flex gap={ESpacing.VALUE4}>
                    <img
                        src="/images/field-image.png"
                        alt="field-image"
                        className="h-[165px] w-[340px] rounded-xl object-cover"
                    />
                    <Flex vertical gap={ESpacing.VALUE4}>
                        <Title className="!mb-0 !text-lg !text-gray-800">
                            Общая информация
                        </Title>
                        <Flex justify="space-between" gap={ESpacing.VALUE2}>
                            <Paragraph className="w-[180px] !text-base !font-medium text-gray-600">
                                Площадь, м2
                            </Paragraph>
                            <Paragraph className="w-[160px] !text-base !font-medium text-gray-800">
                                {field?.size}
                            </Paragraph>
                        </Flex>
                        <div className="h-[1px] w-full bg-border-primary" />
                        <Flex justify="space-between" gap={ESpacing.VALUE2}>
                            <Paragraph className="w-[180px] !text-base !font-medium text-gray-600">
                                Количество участков
                            </Paragraph>
                            <Paragraph className="w-[160px] !text-base !font-medium text-gray-800">
                                {field?.plots_number}
                            </Paragraph>
                        </Flex>
                        <div className="h-[1px] w-full bg-border-primary" />
                        <Flex justify="space-between" gap={ESpacing.VALUE2}>
                            <Paragraph className="w-[180px] !text-base  !font-medium text-gray-600">
                                Кадастровый номер
                            </Paragraph>
                            <Paragraph className="w-[160px] !text-base !font-medium text-gray-800">
                                {field?.cadastre_number}
                            </Paragraph>
                        </Flex>
                    </Flex>
                </Flex>
                {plotsArr && (
                    <Flex gap={ESpacing.VALUE1} vertical>
                        {plotsArr.length > 0 && (
                            <>
                                <Link
                                    to={routeMap.plotCreate(field.id)}
                                    className="h-fit cursor-pointer rounded-lg bg-accent p-3"
                                >
                                    <PlusIcon />
                                </Link>
                            </>
                        )}
                        <Link
                            to={routeMap.fieldEdit(field.id)}
                            className="h-fit w-fit cursor-pointer rounded-lg bg-secondary px-3.5 py-3"
                        >
                            <EditIcon />
                        </Link>
                        <div
                            className="h-fit w-fit cursor-pointer rounded-lg bg-beige px-3.5 py-3"
                            onClick={() => setIsShowModal(true)}
                        >
                            <DeleteIcon />
                        </div>
                    </Flex>
                )}
            </Flex>
        </>
    )
}
