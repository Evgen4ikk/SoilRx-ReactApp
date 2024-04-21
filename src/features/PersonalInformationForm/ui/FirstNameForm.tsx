import { FC } from 'react'
import {
    PersonalInformationData,
    useEditUserInfoMutation,
} from '@entities/user'
import { useOutside } from '@hooks/useOutside'
import { cn } from '@lib/dom/classnames'
import Button from '@ui/Button'
import { ESpacing } from '@ui/Enums/Enums'
import Flex from '@ui/Flex'
import Input from '@ui/Input'
import { Controller, useForm } from 'react-hook-form'

interface IProps {
    firstName: string
    userId: number
}

export const FirstNameForm: FC<IProps> = ({ firstName, userId }) => {
    const { control, handleSubmit } = useForm<PersonalInformationData>({
        defaultValues: {
            name: firstName,
        },
    })

    const {
        isShow: IsShowButton,
        ref,
        setIsShow: setIsShowButton,
    } = useOutside(false)

    const [editFirstName] = useEditUserInfoMutation()

    const onSubmitFirstName = async (data: PersonalInformationData) => {
        await editFirstName((data = { ...data, id: userId }))
        setIsShowButton(false)
    }

    return (
        <form onSubmit={handleSubmit(onSubmitFirstName)}>
            <Flex gap={ESpacing.VALUE1} ref={ref}>
                <Controller
                    name="name"
                    control={control}
                    render={({ field }) => (
                        <Input
                            {...field}
                            placeholder="Имя"
                            className={cn(
                                'px-4 py-2.5',
                                IsShowButton ? 'w-[318px]' : 'w-[432px]',
                            )}
                            onClick={() => setIsShowButton(true)}
                        />
                    )}
                />
                {IsShowButton && (
                    <Button
                        htmlType="submit"
                        variant="secondAction"
                        className="px-4 py-2.5 text-sm font-medium"
                    >
                        Применить
                    </Button>
                )}
            </Flex>
        </form>
    )
}
