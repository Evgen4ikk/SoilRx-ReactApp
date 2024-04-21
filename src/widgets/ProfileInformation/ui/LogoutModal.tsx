import { FC } from 'react'
import Button from '@ui/Button'
import { ESpacing } from '@ui/Enums/Enums'
import Flex from '@ui/Flex'
import { Modal } from '@ui/Modal/Modal'
import Title from '@ui/Title'

interface IProps {
    isShowLogout: boolean
    onCloseLogoutModal: () => void
    handleLogout: () => Promise<void>
}

export const LogoutModal: FC<IProps> = ({ ...props }) => {
    const { handleLogout, isShowLogout, onCloseLogoutModal } = props
    return (
        <Modal
            onClose={onCloseLogoutModal}
            isOpen={isShowLogout}
            className="max-w-[480px]"
        >
            <Flex vertical className="p-6" gap={ESpacing.VALUE6}>
                <Title className="!m-0 !text-2xl !text-gray-800">
                    Вы действительно хотите выйти из аккаунта?
                </Title>
                <Flex gap={ESpacing.VALUE2}>
                    <Button
                        onClick={onCloseLogoutModal}
                        variant="lastAction"
                        className="w-1/2"
                    >
                        Отменить
                    </Button>
                    <Button
                        onClick={handleLogout}
                        variant="secondAction"
                        className="w-1/2"
                    >
                        Выйти
                    </Button>
                </Flex>
            </Flex>
        </Modal>
    )
}
