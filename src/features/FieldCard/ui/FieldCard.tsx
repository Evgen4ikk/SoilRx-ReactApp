import { FC, useState } from 'react'
import DeleteIcon from '@app/icons/delete.svg?react'
import EditIcon from '@app/icons/edit.svg?react'
import { useDeleteFieldMutation } from '@entities/field'
import ConfirmRemoveForm from '@features/ConfirmRemoveForm'
import { routeMap } from '@model/api'
import { ESpacing } from '@ui/Enums/Enums'
import Flex from '@ui/Flex/Flex'
import Link from '@ui/Link'
import Paragraph from '@ui/Paragraph/Paragraph'
import Title from '@ui/Title/Title'

interface IProps {
    id: number
    name: string
    size: string
    cadastre_number: string
    plots_number: number
}

const FieldCard: FC<IProps> = ({ ...props }) => {
    const { cadastre_number, name, size, id, plots_number } = props
    const [hovered, setHovered] = useState(false)
    const [isShowModal, setIsShowModal] = useState(false)
    const [deleteField] = useDeleteFieldMutation()

    const handleDelete = async () => {
        await deleteField(id)
    }

    return (
        <>
            <ConfirmRemoveForm
                title={`Вы действительно хотите удалить ${name}?`}
                description="Если вы удалите участок, все рекомендации по нему будут удалены."
                leftBtnText="Отменить"
                rightBtnText="Удалить"
                setIsShow={setIsShowModal}
                isShow={isShowModal}
                isCancel={true}
                actions={{
                    rightAction: handleDelete,
                }}
            />
            <div
                className="relative h-[480px] w-[340px] rounded-2xl border border-solid border-border-primary bg-white hover:shadow-sm"
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
            >
                {hovered && (
                    <Flex
                        gap={ESpacing.VALUE1}
                        className="absolute right-3 top-3"
                    >
                        <Link
                            to={routeMap.fieldEdit(id)}
                            className="cursor-pointer rounded-lg bg-secondary p-4"
                        >
                            <EditIcon />
                        </Link>
                        <div
                            className="cursor-pointer rounded-lg bg-beige p-4"
                            onClick={() => setIsShowModal(true)}
                        >
                            <DeleteIcon />
                        </div>
                    </Flex>
                )}
                <Link to={routeMap.fieldDetail(id)}>
                    <div className="h-[240px] w-full">
                        <img
                            src="/images/field-image.png"
                            alt="field-image"
                            className="h-full w-full rounded-t-2xl object-cover"
                        />
                    </div>
                    <Flex vertical className="p-6" gap={ESpacing.VALUE4}>
                        <Title className="!m-0 h-8 overflow-hidden !text-2xl">
                            {name}
                        </Title>
                        <div className="h-[1px] w-full bg-border-primary" />
                        <Flex justify="space-between">
                            <Paragraph className="max-w-[130px] !text-base text-gray-600">
                                Площадь, м2
                            </Paragraph>
                            <Paragraph className="w-[154px] !text-base !font-medium text-gray-800">
                                {size}
                            </Paragraph>
                        </Flex>
                        <Flex justify="space-between">
                            <Paragraph className="max-w-[130px] !text-base text-gray-600">
                                Количество участков
                            </Paragraph>
                            <Paragraph className="w-[154px] !text-base !font-medium text-gray-800">
                                {plots_number === null ? 0 : plots_number}
                            </Paragraph>
                        </Flex>
                        {cadastre_number && (
                            <Flex justify="space-between">
                                <Paragraph className="max-w-[130px] !text-base text-gray-600">
                                    Кадастровый номер
                                </Paragraph>
                                <Paragraph className="w-[154px] !text-base !font-medium text-gray-800">
                                    {cadastre_number}
                                </Paragraph>
                            </Flex>
                        )}
                    </Flex>
                </Link>
            </div>
        </>
    )
}

export default FieldCard
