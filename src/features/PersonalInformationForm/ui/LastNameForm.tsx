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
    lastName: string | null
    userId: number
}

export const LastNameForm: FC<IProps> = ({ lastName, userId }) => {
    const { control, handleSubmit } = useForm<PersonalInformationData>({
        defaultValues: {
            last_name: lastName || '',
        },
    })

    const {
        isShow: IsShowButton,
        ref,
        setIsShow: setIsShowButton,
    } = useOutside(false)

    const [editLastName] = useEditUserInfoMutation()

    const onSubmitLastName = async (data: PersonalInformationData) => {
        await editLastName((data = { ...data, id: userId }))
        setIsShowButton(true)
    }

    return (
        <form onSubmit={handleSubmit(onSubmitLastName)}>
            <Flex gap={ESpacing.VALUE1} ref={ref}>
                <Controller
                    name="last_name"
                    control={control}
                    render={({ field }) => (
                        <Input
                            {...field}
                            value={field.value || ''}
                            placeholder="Фамилия"
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
