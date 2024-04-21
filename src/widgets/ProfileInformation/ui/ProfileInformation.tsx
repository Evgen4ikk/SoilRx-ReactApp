import { FC, useContext, useState } from 'react'
import { AuthContext } from '@app/providers/AuthProvider/AuthContext'
import { useGetMeQuery, useLogoutMutation } from '@entities/Auth/login'
import { useDeleteUserMutation, useGetUserInfoQuery } from '@entities/user'
import { PersonalInformation } from '@features/PersonalInformationForm'
import { PersonalSafety } from '@features/PersonalSafety'
import Button from '@ui/Button'
import { ESpacing } from '@ui/Enums/Enums'
import Flex from '@ui/Flex'
import { DeleteAccountModal } from './DeleteAccountModal'
import { LogoutModal } from './LogoutModal'
import { ProfileInformationLoading } from './ProfileInformationLoading'

export const ProfileInformation: FC = () => {
    const { data: getMe, isLoading: isGetMeLoading } = useGetMeQuery(null)
    const userId = Number(getMe?.id)

    const { setAccessToken } = useContext(AuthContext)

    const [isShowDelete, setIsShowDelete] = useState(false)
    const [isShowLogout, setIsShowLogout] = useState(false)

    const { data: user, isLoading: isUserLoading } = useGetUserInfoQuery(userId)
    const [logout] = useLogoutMutation()
    const [deleteAccount] = useDeleteUserMutation()

    const handleDeleteAccount = async () => {
        await deleteAccount(userId)
        setIsShowDelete(false)
        setAccessToken(null)
    }

    const handleLogout = async () => {
        await logout(null)
        setIsShowLogout(false)
        setAccessToken(null)
    }

    if (isUserLoading || isGetMeLoading) {
        return <ProfileInformationLoading />
    }

    return (
        <>
            {user && (
                <>
                    <PersonalInformation user={user} userId={userId} />
                    <PersonalSafety userId={userId} email={getMe?.email} />
                    <Flex gap={ESpacing.VALUE2}>
                        <Button
                            onClick={() => setIsShowDelete(true)}
                            className="px-4 py-2.5 text-sm font-medium !text-error enabled:hover:!text-error"
                            variant="lastAction"
                        >
                            Удалить аккаунт
                        </Button>
                        <Button
                            onClick={() => setIsShowLogout(true)}
                            variant="lastAction"
                            className="px-4 py-2.5 text-sm font-medium"
                        >
                            Выйти
                        </Button>
                    </Flex>
                </>
            )}
            <DeleteAccountModal
                handleDeleteAccount={handleDeleteAccount}
                isShowDelete={isShowDelete}
                onCloseDeleteModal={() => setIsShowDelete(false)}
            />

            <LogoutModal
                handleLogout={handleLogout}
                isShowLogout={isShowLogout}
                onCloseLogoutModal={() => setIsShowLogout(false)}
            />
        </>
    )
}
