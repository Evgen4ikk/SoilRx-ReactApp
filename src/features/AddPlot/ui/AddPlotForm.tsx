import { FC, useEffect, useState } from 'react'
import { useGetFieldByIdQuery } from '@entities/field'
import {
    AddPlotFormData,
    AddPlotSchema,
    useCreatePlotMutation,
    useEditPlotMutation,
} from '@entities/plot'
import {
    useGetSoilTypeQuery,
    useUploadFileMutation,
} from '@entities/plot/api/api'
import ConfirmRemoveForm from '@features/ConfirmRemoveForm'
import { CultureSelect } from '@features/CultureSelect'
import UploadField from '@features/UploadField'
import { zodResolver } from '@hookform/resolvers/zod'
import SelectIcon from '@icons/selectIcon.svg?react'
import { Message } from '@lib/ui/message'
import { routeMap } from '@model/api'
import Button from '@ui/Button'
import { ESpacing } from '@ui/Enums/Enums'
import Flex from '@ui/Flex'
import Paragraph from '@ui/Paragraph'
import Select from '@ui/Select'
import Text from '@ui/Text'
import TextField from '@ui/TextField'
import Title from '@ui/Title'
import { UploadFile } from 'antd'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router'
import { z } from 'zod'

type DefaultValues = {
    nameValue: string
    areaValue: number
    plantValue: number
    soilValue: number
}

interface IProps {
    number?: number
    fieldId: number
    plotsSize: number
    defaultValues?: DefaultValues
}

interface SelectOption {
    label: JSX.Element
    value: number
}

export const AddPlotForm: FC<IProps> = (props) => {
    const { number, defaultValues, fieldId, plotsSize } = props
    const { nameValue, areaValue, plantValue, soilValue } = defaultValues
        ? defaultValues
        : {
              nameValue: '',
              areaValue: 0,
              plantValue: 0,
              soilValue: 0,
          }
    const [isShow, setIsShow] = useState(false)
    const [fileList, setFileList] = useState(Array<UploadFile>)
    const navigate = useNavigate()
    const [createPlot, { isLoading: createLoading }] = useCreatePlotMutation()
    const [updatePlot, { isLoading: updateLoading }] = useEditPlotMutation()
    const [uploadFile, { isLoading: fileLoading }] = useUploadFileMutation()
    const { data: soilTypesData } = useGetSoilTypeQuery(null)
    const { data } = useGetFieldByIdQuery(fieldId)
    const soilTypes: Array<SelectOption> = []
    soilTypesData &&
        soilTypesData.map((item) => {
            soilTypes.push({
                label: <Text className="px-2">{item.name}</Text>,
                value: item.id,
            })
        })

    const leftSize = Number(data?.size) - plotsSize
    const sizeValidate = z.object({
        plotArea: z.coerce
            .number({
                required_error: 'Обязательные поля должны быть заполнены',
            })
            .min(1, 'Необходимо заполнить все обязательные поля')
            .refine(
                (value) => value <= leftSize,
                'Размер участке не может превышать размер поля',
            ),
    })

    const MergedAddPlotSchema = AddPlotSchema.merge(sizeValidate)

    const {
        handleSubmit,
        control,
        setValue,
        formState: { errors, isDirty, isValid },
        reset,
    } = useForm<AddPlotFormData>({
        resolver: zodResolver(MergedAddPlotSchema),
        mode: 'onBlur',
        defaultValues: defaultValues
            ? {
                  plotName: nameValue,
                  plotArea: areaValue,
                  cultureSelect: plantValue,
                  soilType: soilValue,
              }
            : undefined,
    })

    useEffect(() => {
        if (defaultValues) {
            setValue('plotArea', areaValue)
            setValue('plotName', nameValue)
            setValue('cultureSelect', plantValue)
            setValue('soilType', soilValue)
        }
    }, [defaultValues])

    useEffect(() => {
        fileList.length > 0
            ? setValue('chemicalAnalysis', fileList)
            : setValue('chemicalAnalysis', undefined)
    }, [fileList])

    const onSubmit: SubmitHandler<AddPlotFormData> = async (data) => {
        try {
            const file = data.chemicalAnalysis
                ? data.chemicalAnalysis[0].originFileObj
                : undefined

            number
                ? await updatePlot({
                      id: number,
                      name: data.plotName,
                      size: String(data.plotArea),
                      field_id: fieldId,
                      soil_type_id: Number(data.soilType),
                      culture_id: Number(data.cultureSelect),
                  })
                : await createPlot({
                      name: data.plotName,
                      size: data.plotArea,
                      field_id: fieldId,
                      soil_type_id: data.soilType,
                      culture_id: data.cultureSelect,
                      pdf: file,
                  })
            number && file
                ? await uploadFile({
                      id: number,
                      pdf: file,
                  })
                : null
        } catch {
            return Message({
                type: 'error',
                content: number ? 'Участок не изменен' : 'Участок не создан',
            })
        }
        reset()
    }

    const { plotName, plotArea, cultureSelect, soilType } = errors

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Flex vertical className="mb-8">
                    <Title level={3} variant="h4">
                        {number ? nameValue : 'Добавление участков'}
                    </Title>
                    <Paragraph className="!mb-0 text-base font-medium text-gray-600">
                        Вы можете оставить поле без разделения на участки, либо
                        настроить участки для своего поля.
                    </Paragraph>
                </Flex>
                <Flex vertical gap={ESpacing.VALUE6}>
                    <Controller
                        name="plotName"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                title="Название участка"
                                placeholder="Например, участок первый"
                                error={
                                    plotName && {
                                        error: {
                                            message: plotName.message,
                                            variant: 'error',
                                        },
                                    }
                                }
                            />
                        )}
                    />
                    <Controller
                        name="plotArea"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                type="number"
                                title="Площадь участка, кв.м"
                                placeholder="Например, 600"
                                error={
                                    plotArea && {
                                        error: {
                                            message: plotArea.message,
                                            variant: 'error',
                                        },
                                    }
                                }
                            />
                        )}
                    />
                    <Controller
                        name="soilType"
                        control={control}
                        render={({ field }) => (
                            <Flex vertical gap={ESpacing.VALUE1}>
                                <Paragraph className="mb-2 max-w-[600px] font-inter text-base font-normal text-info">
                                    Тип почвы
                                </Paragraph>
                                <Select
                                    {...field}
                                    placeholder="Любой"
                                    defaultValue={
                                        defaultValues ? soilValue : undefined
                                    }
                                    className="border-primary h-12 max-w-[600px] rounded-lg border font-inter font-normal text-gray-800"
                                    suffixIcon={<SelectIcon />}
                                    error={
                                        soilType && {
                                            message: soilType.message,
                                            variant: 'error',
                                        }
                                    }
                                    options={soilTypes}
                                />
                            </Flex>
                        )}
                    />
                    <Controller
                        name="cultureSelect"
                        control={control}
                        render={({ field }) => (
                            <CultureSelect
                                {...field}
                                error={
                                    cultureSelect && {
                                        error: {
                                            message: cultureSelect.message,
                                            variant: 'error',
                                        },
                                    }
                                }
                            />
                        )}
                    />
                    <Controller
                        name="chemicalAnalysis"
                        control={control}
                        render={({ field: { value } }) => (
                            <Flex vertical>
                                <Paragraph
                                    variant="textField"
                                    className="!mb-2 max-w-[600px] !text-base !font-normal text-info"
                                >
                                    Данные анализа
                                </Paragraph>
                                <UploadField
                                    value={value}
                                    setValue={setFileList}
                                />
                            </Flex>
                        )}
                    />
                    <Flex gap={ESpacing.VALUE2}>
                        <Button
                            variant="lastAction"
                            className="font-medium text-accent"
                            onClick={() => setIsShow(true)}
                        >
                            {number
                                ? 'Отменить'
                                : 'Завершить добавление участков'}
                        </Button>
                        <Button
                            disabled={
                                !isDirty ||
                                !isValid ||
                                createLoading ||
                                updateLoading ||
                                fileLoading
                            }
                            htmlType="submit"
                            variant="saveField"
                            className={
                                number
                                    ? '!max-w-[153px] !font-medium'
                                    : '!min-w-[153px] !font-medium'
                            }
                        >
                            {number
                                ? 'Сохранить изменения'
                                : 'Добавить участок'}
                        </Button>
                    </Flex>
                </Flex>
            </form>
            <ConfirmRemoveForm
                title="Отменить добавление участков?"
                description="Если вы отмените создание участков, все внесённые данные будут удалены."
                leftBtnText="Назад"
                rightBtnText="Отменить добавление"
                isCancel={true}
                isShow={isShow}
                setIsShow={setIsShow}
                actions={{
                    rightAction: () =>
                        number
                            ? navigate(-1)
                            : navigate(routeMap.fieldDetail(fieldId)),
                }}
            />
        </>
    )
}
