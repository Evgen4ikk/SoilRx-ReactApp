import { FC } from 'react'
import { Skeleton } from 'antd'
import { SkeletonInputProps } from 'antd/es/skeleton/Input'

const AntSkeletonInput = Skeleton.Input

export const SkeletonInput: FC<SkeletonInputProps> = ({ ...props }) => {
    return <AntSkeletonInput {...props} active/>
}
