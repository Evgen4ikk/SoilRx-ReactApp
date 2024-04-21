import { FC, useState } from 'react'
import UploadIcon from '@app/icons/upload.svg?react'
import { type Error, type TVoidFn } from '@customTypes/common'
import UploadItem from '@features/UploadItem'
import { cn } from '@lib/dom/classnames'
import Dragger from '@ui/Dragger'
import { ESpacing } from '@ui/Enums/Enums'
import Flex from '@ui/Flex'
import Paragraph from '@ui/Paragraph'
import Text from '@ui/Text'
import { UploadFile, type UploadProps } from 'antd'

interface IProps {
    onDrop?: TVoidFn
    name?: string
    action?: string
    error?: Error
    value?: UploadFile<any>[]
    setValue: React.Dispatch<React.SetStateAction<UploadFile<any>[]>>
}

const UploadField: FC<IProps & React.RefAttributes<HTMLElement>> = ({
    name,
    action,
    onDrop,
    error,
    value,
    setValue,
}) => {
    const { message, variant, className } =
        error && error.error?.message
            ? error.error
            : {
                  message: undefined,
                  variant: '',
                  className: '',
              }

    const [isFileList, setIsFileList] = useState(false)

    const args: UploadProps = {
        name,
        multiple: false,
        action,
        onChange(e) {
            setValue(e.fileList)
        },
        onDrop(e) {
            onDrop && onDrop()
            console.log('Dropped files', e.dataTransfer.files)
        },
    }

    return (
        <Flex
            vertical
            align="flex-start"
            gap={ESpacing.VALUE2}
            className="max-w-[600px]"
        >
            <Dragger
                {...args}
                accept="application/pdf application/docx"
                fileList={value}
                itemRender={(originNode, file, fileList, actions) => {
                    fileList.length > 0
                        ? setIsFileList(true)
                        : setIsFileList(false)
                    return (
                        <UploadItem
                            originNode={originNode}
                            file={file}
                            fileList={fileList}
                            actions={actions}
                            setIsFileList={setIsFileList}
                        />
                    )
                }}
                customRequest={(options) => {
                    options.file
                }}
                className={cn(
                    'flex w-full flex-col content-center justify-center rounded bg-transparent  py-3',
                    isFileList
                        ? 'border-none'
                        : 'border border-dashed border-gray-400 px-6',
                )}
            >
                {!isFileList && (
                    <>
                        <Paragraph className="!mb-[7px] flex justify-center">
                            <UploadIcon />
                        </Paragraph>
                        <Paragraph className="ant-upload-text !mb-0 h-fit text-center text-xs !text-gray-600">
                            Перенесите файл сюда или
                        </Paragraph>
                        <Paragraph className="ant-upload-text !mb-0 h-fit cursor-pointer text-center text-xs !text-accent">
                            Откройте проводник
                        </Paragraph>
                    </>
                )}
            </Dragger>
            {!isFileList && (
                <Paragraph className="ant-upload-hint h-fit font-inter !text-xxs !text-gray-500">
                    Допустимые форматы: pdf, docx
                </Paragraph>
            )}
            {error && (
                <Text variant={variant} className={className}>
                    {message}
                </Text>
            )}
        </Flex>
    )
}

export default UploadField
