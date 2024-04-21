import { FC } from 'react'
import { Avatar as AntAvatar, AvatarProps } from 'antd'

export const Avatar: FC<AvatarProps> = ({ ...props }) => {
    return <AntAvatar {...props} size={40} />
}
