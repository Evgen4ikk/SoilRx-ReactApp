import LogoutIcon from '@app/icons/logout.svg?react'
import PersonIcon from '@app/icons/person.svg?react'
import { UserObject } from '@entities/Auth/login'
import { useLogoutMutation } from '@entities/Auth/login/api/api'
import { routeMap } from '@model/api'
import { ESpacing } from '@ui/Enums/Enums'
import Flex from '@ui/Flex/Flex'
import Link from '@ui/Link'
import Text from '@ui/Text/Text'

interface IProps {
    user: UserObject
    className?: string
    setAccessToken: (accessToken: string | null) => void
}

export const HeaderProfile = (props: IProps) => {
    const { user, className, setAccessToken } = props

    const [logout] = useLogoutMutation()

    const onClick = async () => {
        await logout(null)
        setAccessToken(null)
    }

    return (
        <Flex align="center" gap={ESpacing.VALUE2} className={className}>
            <Link to={routeMap.profile}>
                <Flex
                    align="center"
                    gap={ESpacing.VALUE2}
                    className="cursor-pointer px-1.5 py-1 hover:bg-gray-100"
                >
                    <div className="rounded bg-gray-300 p-1.5">
                        <PersonIcon />
                    </div>
                    <Flex vertical className="w-[180px]">
                        <Text className="h-4 overflow-hidden !text-sm !font-medium !text-gray-800">
                            {user.name}
                        </Text>
                        <Text className="h-4 overflow-hidden text-xs font-normal text-gray-600">
                            {user.email}
                        </Text>
                    </Flex>
                </Flex>
            </Link>
            <div
                className="ml-1 cursor-pointer rounded-lg bg-gray-300 p-4"
                onClick={onClick}
            >
                <LogoutIcon />
            </div>
        </Flex>
    )
}
