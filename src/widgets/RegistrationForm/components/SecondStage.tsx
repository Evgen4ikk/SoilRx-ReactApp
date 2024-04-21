import { useConfirmEmailMutation } from '@entities/Auth/login'
import { useCountdownTimer } from '@hooks/useCountdownTimer'
import { routeMap } from '@shared/model/api'
import Button from '@ui/Button'
import Flex from '@ui/Flex'
import Link from '@ui/Link'
import Paragraph from '@ui/Paragraph'
import Title from '@ui/Title'

interface IStage {
    email: string
}

export const SecondStage = ({ email }: IStage) => {
    const timer = useCountdownTimer(60)
    const [confirm] = useConfirmEmailMutation()

    const onSubmit = async () => {
        await confirm({
            email: email,
        })
        timer.reset()
    }

    return (
        <form
            onSubmit={onSubmit}
            className="mx-auto my-auto max-w-[480px] flex-col content-center rounded-2sxl border border-solid border-border-form px-10 py-6"
        >
            <Title level={3} variant="h1" className="text-center">
                Регистрация
            </Title>
            <Flex vertical>
                <Paragraph variant="primary" className="!mb-6">
                    Мы отправили письмо на указанный почтовый адрес. Перейдите
                    по ссылке в письме для подтверждения регистарции.
                    <br />
                    Если ничего не нашли, проверьте папку Спам.
                </Paragraph>
                <Button
                    htmlType="submit"
                    variant="saveField"
                    disabled={!timer.isCountdownEnded}
                >
                    {!timer.isCountdownEnded
                        ? `00:${timer.timeLeft < 10 ? `0${timer.timeLeft}` : `${timer.timeLeft}`}`
                        : ''}{' '}
                    Отправить письмо повторно
                </Button>
                <Link
                    to={routeMap.login}
                    variant="primary"
                    className="mb-4 mt-6 self-center"
                >
                    У меня есть аккаунт
                </Link>
            </Flex>
        </form>
    )
}
