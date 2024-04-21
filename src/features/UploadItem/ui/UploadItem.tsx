import { Dispatch, SetStateAction } from 'react'
import FileIcon from '@app/icons/fileIcon.svg?react'
import RemoveFile from '@app/icons/removeFile.svg?react'
import Button from '@ui/Button'
import { ESpacing } from '@ui/Enums/Enums'
import Flex from '@ui/Flex'
import Text from '@ui/Text'
import { UploadFile } from 'antd'

interface IProps {
    originNode: React.ReactElement<
        unknown,
        string | React.JSXElementConstructor<unknown>
    >
    file: UploadFile<unknown>
    fileList: UploadFile<unknown>[]
    actions: {
        download: () => void
        preview: () => void
        remove: () => void
    }
    setIsFileList: Dispatch<SetStateAction<boolean>>
}

const UploadItem = (props: IProps) => {
    const { file, actions, setIsFileList } = props
    const size = file.size && file.size / 1024 / 1024

    return (
        <Flex
            align="center"
            justify="space-between"
            className="rounded-lg bg-gray-100 p-3"
        >
            <Flex gap={ESpacing.VALUE1} align="center">
                <FileIcon width={24} height={24} />
                <Text variant="radialBar">{file.name}</Text>
            </Flex>
            <Flex gap={ESpacing.VALUE2} align="center">
                <Text className="font-inter text-xxs text-gray-500">
                    {size?.toFixed(1)} MB
                </Text>
                <Button
                    icon={<RemoveFile width={16} height={16} />}
                    onClick={() => {
                        actions.remove()
                        setIsFileList(false)
                    }}
                    variant="remove"
                />
            </Flex>
        </Flex>
    )
}

export default UploadItem
