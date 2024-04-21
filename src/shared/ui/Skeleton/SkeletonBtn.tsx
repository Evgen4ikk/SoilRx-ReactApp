import { FC } from 'react'
import { Skeleton } from 'antd'
import { SkeletonButtonProps } from 'antd/es/skeleton/Button'

const AntSkeletonBtn = Skeleton.Button

export const SkeletonBtn: FC<SkeletonButtonProps> = ({ ...props }) => {
    return <AntSkeletonBtn {...props} active />
}
