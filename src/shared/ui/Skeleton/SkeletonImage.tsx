import { FC } from 'react'
import { Skeleton } from 'antd'
import { SkeletonImageProps } from 'antd/es/skeleton/Image'

const AntSkeletonImage = Skeleton.Image

export const SkeletonImage: FC<SkeletonImageProps> = ({ ...props }) => {
    return <AntSkeletonImage {...props} active/>
}