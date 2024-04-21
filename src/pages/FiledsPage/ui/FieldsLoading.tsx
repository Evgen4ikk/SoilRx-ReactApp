import { ESpacing } from '@ui/Enums/Enums'
import Flex from '@ui/Flex'
import { Skeleton } from '@ui/Skeleton/Skeleton'
import { SkeletonImage } from '@ui/Skeleton/SkeletonImage'

export const FieldsLoading = () => {
    return (
        <Flex
            vertical
            gap={ESpacing.VALUE8}
            className="mx-auto mt-10 w-[1408px]"
        >
            <Skeleton
                avatar={false}
                paragraph={false}
                title={{
                    width: '172px',
                    className: '!h-[40px]',
                }}
            />
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
                {Array.from({ length: 4 }, (_, index) => (
                    <Flex vertical className="h-[480px] w-[340px]" key={index}>
                        <SkeletonImage className="!h-[240px] !w-[338px] !rounded-t-2xl" />
                        <Flex vertical className="p-6" gap={ESpacing.VALUE4}>
                            <Skeleton
                                avatar={false}
                                title={{
                                    width: '172px',
                                    className: '!h-[32px] !mb-4',
                                }}
                                paragraph={{
                                    rows: 3,
                                    width: [290, 290, 290],
                                }}
                            />
                        </Flex>
                    </Flex>
                ))}
            </div>
        </Flex>
    )
}
