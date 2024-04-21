import { FC } from 'react'
import { ESpacing } from '@ui/Enums/Enums'
import Flex from '@ui/Flex'
import { ProfileInformation } from '@widgets/ProfileInformation'

export const ProfilePage: FC = () => {
    return (
        <Flex
            vertical
            gap={ESpacing.VALUE8}
            className="mx-auto mt-10 w-[480px] rounded-lg border border-solid border-gray-300 px-6 py-4"
        >
            <ProfileInformation />
        </Flex>
    )
}
