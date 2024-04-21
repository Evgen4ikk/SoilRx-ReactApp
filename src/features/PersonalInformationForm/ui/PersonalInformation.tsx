import { FC } from 'react'
import { PersonalInformationData } from '@entities/user'
import { ESpacing } from '@ui/Enums/Enums'
import Flex from '@ui/Flex'
import Title from '@ui/Title'
import { FirstNameForm } from './FirstNameForm'
import { LastNameForm } from './LastNameForm'
import { MiddleNameForm } from './MiddleNameForm'

interface IProps {
    user: PersonalInformationData
    userId: number
}

export const PersonalInformation: FC<IProps> = ({ user, userId }) => {
    return (
        <Flex vertical gap={ESpacing.VALUE4}>
            <Title className="!m-0 !text-lg !text-gray-800">
                Личная информация
            </Title>
            <Flex vertical gap={ESpacing.VALUE2}>
                <FirstNameForm firstName={user.name} userId={userId} />
                <LastNameForm lastName={user.last_name} userId={userId} />
                <MiddleNameForm middleName={user.middle_name} userId={userId} />
            </Flex>
        </Flex>
    )
}
