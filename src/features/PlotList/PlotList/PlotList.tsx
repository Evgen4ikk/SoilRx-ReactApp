import { FC, useState } from 'react'
import DeleteIcon from '@app/icons/delete.svg?react'
import EditIcon from '@app/icons/edit.svg?react'
import { useDeletePlotMutation } from '@entities/plot'
import { PlotData } from '@entities/plot/model/types'
import ConfirmRemoveForm from '@features/ConfirmRemoveForm'
import { routeMap } from '@model/api'
import { ESpacing } from '@ui/Enums/Enums'
import Flex from '@ui/Flex'
import Link from '@ui/Link'
import Paragraph from '@ui/Paragraph'
import Table from '@ui/Table'
import Title from '@ui/Title'
import { type TableProps } from 'antd'
import { useNavigate } from 'react-router'
import { AnalysisDate } from '../AnalysisDate/AnalysisDate'
import { GradeField } from '../GradeField/GradeField'

interface IProps {
    data: PlotData[]
    fieldId: number
}

export const PlotList: FC<IProps> = ({ ...props }) => {
    const { data, fieldId } = props

    const [hoveredRow, setHoveredRow] = useState<null | number | undefined>(
        null,
    )
    const [isShowModal, setIsShowModal] = useState(false)
    const [plotDelete] = useDeletePlotMutation()

    const handleDelete = async (id: number) => {
        setIsShowModal(false)
        await plotDelete(id)
    }

    const navigate = useNavigate()

    const columns: TableProps<PlotData>['columns'] = [
        {
            title: (
                <Title className="!text-sm !text-gray-800">
                    Название участка
                </Title>
            ),
            dataIndex: 'name',
            render: (text) => (
                <Paragraph className="!text-sm !font-medium !text-gray-800">
                    {text}
                </Paragraph>
            ),
            width: '384px',
        },
        {
            title: <Title className="!text-sm !text-gray-800">Оценка</Title>,
            dataIndex: 'grade',
            render: (_, record) => <GradeField id={record.id} />,
            width: '250px',
        },
        {
            title: <Title className="!text-sm !text-gray-800">Культура</Title>,
            dataIndex: 'culture_id',
            render: (text) => (
                <Paragraph className="!text-sm !font-medium !text-gray-800">
                    {text}
                </Paragraph>
            ),
            width: '200px',
        },
        {
            title: <Title className="!text-sm !text-gray-800">Тип почвы</Title>,
            dataIndex: 'soil_type_id',
            render: (text) => (
                <Paragraph className="!text-sm !font-medium !text-gray-800">
                    {text}
                </Paragraph>
            ),
            width: '200px',
        },
        {
            title: (
                <Title className="!text-sm !text-gray-800">
                    Площадь, м<sup className="!text-xxs !text-gray-800">2</sup>
                </Title>
            ),
            dataIndex: 'size',
            render: (text) => (
                <Paragraph className="!m-0 self-center !text-sm !font-medium !text-gray-800">
                    {text}
                </Paragraph>
            ),
            width: '200px',
        },
        {
            title: (
                <Title className="!text-sm !text-gray-800">
                    Химический анализ
                </Title>
            ),
            dataIndex: 'chemicalAnalysis',
            render: (_, record) => <AnalysisDate id={record.id} />,
            width: '200px',
        },
        {
            title: () => <></>,
            dataIndex: 'details',
            render: (_, record) => {
                return (
                    <Flex gap={ESpacing.VALUE1}>
                        {hoveredRow === record.id ? (
                            <>
                                <Link
                                    to={routeMap.plotEdit(fieldId, record.id)}
                                    className="cursor-pointer rounded-lg bg-secondary px-4.5 py-3 opacity-100"
                                >
                                    <EditIcon />
                                </Link>
                                <div
                                    className="cursor-pointer rounded-lg bg-beige px-4.5 py-3 opacity-100"
                                    onClick={() => setIsShowModal(true)}
                                >
                                    <DeleteIcon />
                                </div>
                            </>
                        ) : (
                            <>
                                <Link
                                    to=""
                                    className="cursor-pointer rounded-lg bg-secondary px-4.5 py-3 opacity-0"
                                >
                                    <EditIcon />
                                </Link>
                                <div className="cursor-pointer rounded-lg bg-beige px-4.5 py-3 opacity-0">
                                    <DeleteIcon />
                                </div>
                            </>
                        )}
                        {isShowModal && (
                            <ConfirmRemoveForm
                                title={`Вы действительно хотите удалить ${record.name}?`}
                                description="Все данные участка будут безвозвратно удалены"
                                leftBtnText="Отмена"
                                rightBtnText="Удалить"
                                setIsShow={setIsShowModal}
                                isShow={isShowModal}
                                isCancel
                                actions={{
                                    leftAction: () => setIsShowModal(false),
                                    rightAction: () => handleDelete(record.id),
                                }}
                            />
                        )}
                    </Flex>
                )
            },
            align: 'center',
            width: '130px',
        },
    ]

    return (
        <>
            <Table
                columns={columns.map((col, index) => ({
                    ...col,
                    className: 'align-middle',
                    onCell: (record: PlotData) => ({
                        onClick: () => {
                            if (index !== columns.length - 1) {
                                navigate(
                                    routeMap.plotDetail(fieldId, record.id),
                                )
                            }
                        },
                    }),
                }))}
                dataSource={data}
                onRow={(record: PlotData) => ({
                    className: 'cursor-pointer',
                    onMouseEnter: () => {
                        setHoveredRow(record.id)
                    },
                    onMouseLeave: () => setHoveredRow(null),
                })}
            />
        </>
    )
}
