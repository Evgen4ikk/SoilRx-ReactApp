import { FC } from 'react'
import { Skeleton as AntSkeleton, SkeletonProps } from 'antd'

export const Skeleton: FC<SkeletonProps> = ({ ...props }) => {
    return <AntSkeleton {...props} active/>
}
