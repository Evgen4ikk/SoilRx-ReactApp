import { cn } from '@lib/dom/classnames'
import Button from '@ui/Button'
import { ESpacing } from '@ui/Enums/Enums'
import Flex from '@ui/Flex'
import Paragraph from '@ui/Paragraph'
import Title from '@ui/Title'

interface IProps {
    title: string
    description: string
    leftBtnText: string
    rightBtnText: string
    isCancel: boolean
    isShow: boolean
    setIsShow: React.Dispatch<React.SetStateAction<boolean>>
    actions: {
        leftAction?: () => void
        rightAction: () => void
    }
}
export const ConfirmRemoveForm = (props: IProps) => {
    const {
        title,
        description,
        leftBtnText,
        rightBtnText,
        actions,
        isShow,
        setIsShow,
        isCancel,
    } = props

    const { leftAction, rightAction } = actions

    return (
        <Flex
            align="center"
            justify="center"
            className={cn(
                'fixed inset-x-0 inset-y-0 h-full w-full bg-gray-800-thirty !font-normal z-[999]',
                !isShow && 'hidden',
            )}
        >
            <Flex
                vertical
                gap={ESpacing.VALUE8}
                align="flex-start"
                className="max-w-[480px] rounded-2xl border-border-form bg-white p-6"
            >
                <Flex vertical gap={ESpacing.VALUE2}>
                    <Title variant="h1" className="!mb-0">
                        {title}
                    </Title>
                    <Paragraph className="!mb-0 text-base font-medium text-gray-600">
                        {description}
                    </Paragraph>
                </Flex>
                <Flex className="w-full">
                    <Button
                        variant="lastAction"
                        className="!w-1/2"
                        htmlType={isCancel ? 'button' : 'submit'}
                        onClick={() => {
                            leftAction && leftAction()
                            setIsShow(false)
                        }}
                    >
                        {leftBtnText}
                    </Button>
                    <Button
                        className="!w-1/2"
                        variant={isCancel ? 'removeAction' : 'saveField'}
                        htmlType={isCancel ? 'button' : 'submit'}
                        onClick={rightAction}
                    >
                        {rightBtnText}
                    </Button>
                </Flex>
            </Flex>
        </Flex>
    )
}
