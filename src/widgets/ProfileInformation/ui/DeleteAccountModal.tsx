import { FC } from 'react'
import Button from '@ui/Button'
import { ESpacing } from '@ui/Enums/Enums'
import Flex from '@ui/Flex'
import { Modal } from '@ui/Modal/Modal'
import Paragraph from '@ui/Paragraph'
import Title from '@ui/Title'

interface IProps {
    isShowDelete: boolean
    onCloseDeleteModal: () => void
    handleDeleteAccount: () => Promise<void>
}

export const DeleteAccountModal: FC<IProps> = ({ ...props }) => {
    const { isShowDelete, handleDeleteAccount, onCloseDeleteModal } = props
    
    return (
        <Modal
            onClose={onCloseDeleteModal}
            isOpen={isShowDelete}
            className="max-w-[480px]"
        >
            <Flex vertical className="p-6" gap={ESpacing.VALUE6}>
                <Flex vertical gap={ESpacing.VALUE2}>
                    <Title className="!m-0 !text-2xl !text-gray-800">
                        Вы действительно хотите удалить аккаунт?
                    </Title>
                    <Paragraph className="text-base font-medium text-gray-600">
                        Все данные аккаунта будут безвозвратно удалены
                    </Paragraph>
                </Flex>
                <Flex gap={ESpacing.VALUE2}>
                    <Button
                        onClick={onCloseDeleteModal}
                        variant="lastAction"
                        className="w-1/2"
                    >
                        Отменить
                    </Button>
                    <Button
                        onClick={handleDeleteAccount}
                        variant="removeAction"
                        className="w-1/2"
                    >
                        Удалить
                    </Button>
                </Flex>
            </Flex>
        </Modal>
    )
}
