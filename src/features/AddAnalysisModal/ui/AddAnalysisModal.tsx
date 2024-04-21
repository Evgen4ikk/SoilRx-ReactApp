import { useEffect, useState } from 'react'
import { useUploadFileMutation } from '@entities/plot'
import { AnalysisFormData, AnalysisSchema } from '@entities/recomendation'
import UploadField from '@features/UploadField'
import { zodResolver } from '@hookform/resolvers/zod'
import { Message } from '@lib/ui/message'
import Button from '@ui/Button'
import { ESpacing } from '@ui/Enums/Enums'
import Flex from '@ui/Flex'
import Paragraph from '@ui/Paragraph'
import Title from '@ui/Title'
import { UploadFile } from 'antd'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { useParams } from 'react-router'

interface IProps {
    isShow: boolean
    setIsShow: React.Dispatch<React.SetStateAction<boolean>>
}
export const AddAnalysisModal = (props: IProps) => {
    const { isShow, setIsShow } = props
    const [fileList, setFileList] = useState(Array<UploadFile>)
    const [isFirstLoading, setFirstLoading] = useState(true)
    const params = useParams()
    const id = Number(params.plotId)

    const {
        handleSubmit,
        control,
        setValue,
        formState: { isDirty, isValid },
        reset,
    } = useForm<AnalysisFormData>({
        resolver: zodResolver(AnalysisSchema),
        mode: 'onBlur',
    })

    useEffect(() => {
        !isFirstLoading &&
            setValue('chemicalAnalysis', fileList, { shouldValidate: true })
        setFirstLoading(false)
    }, [fileList])

    const [fileUpload, { isLoading }] = useUploadFileMutation()

    const onSubmit: SubmitHandler<AnalysisFormData> = async (data) => {
        try {
            const file = data.chemicalAnalysis[0].originFileObj
                ? data.chemicalAnalysis[0].originFileObj
                : undefined
            file &&
                (await fileUpload({
                    id: id,
                    pdf: file,
                }))
        } catch {
            return Message({ type: 'error', content: 'Анализ не был загружен' })
        }
        reset()
        setIsShow(false)
    }

    return (
        <Flex
            align="center"
            justify="center"
            className={`fixed inset-x-0 inset-y-0 z-[999] h-full w-full bg-gray-800-thirty !font-normal ${!isShow && 'hidden'}`}
        >
            <Flex
                vertical
                gap={ESpacing.VALUE8}
                align="flex-start"
                className="max-w-[600px] rounded-2xl border-border-form bg-white p-6"
            >
                <Flex vertical gap={ESpacing.VALUE2}>
                    <Title variant="h1" className="!mb-0">
                        Добавление химического анализа
                    </Title>
                    <Paragraph className="!mb-0 text-base font-medium text-gray-600">
                        После загрузки анализа наша система обработает его и
                        выдаст вам рекомендации
                    </Paragraph>
                </Flex>
                <form
                    className="flex w-full flex-col gap-6"
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <Controller
                        name="chemicalAnalysis"
                        control={control}
                        render={({ field: { value } }) => (
                            <UploadField value={value} setValue={setFileList} />
                        )}
                    />
                    <Flex className="w-full">
                        <Button
                            variant="lastAction"
                            className="!w-1/2"
                            onClick={() => {
                                setIsShow(false)
                            }}
                        >
                            Отменить
                        </Button>
                        <Button
                            className="!w-1/2"
                            variant="saveField"
                            htmlType="submit"
                            disabled={!isValid || !isDirty || isLoading}
                        >
                            Добавить
                        </Button>
                    </Flex>
                </form>
            </Flex>
        </Flex>
    )
}
