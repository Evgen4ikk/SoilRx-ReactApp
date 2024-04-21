import {
    type MessageArgsProps,
    message,
} from 'antd'

export const Message = (props: MessageArgsProps) => {
    const { content, type } = props

    if (type !== undefined) {
        message[type](content)
    }
}
