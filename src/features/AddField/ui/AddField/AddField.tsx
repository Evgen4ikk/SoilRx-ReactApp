import { routeMap } from '@shared/model/api'
import Link from '@ui/Link'
import Paragraph from '@ui/Paragraph'

export const AddField = () => {
    return (
        <Link
            to={routeMap.fieldCreate}
            className="relative h-[480px] w-[338px] cursor-pointer rounded-2xl bg-gray bg-add-field transition-shadow hover:shadow-md"
        >
            <Paragraph className="absolute left-[50%] top-[50%] w-[178px] -translate-x-1/2 -translate-y-1/2 text-center font-inter !text-lg !font-bold text-accent">
                Добавить поле
            </Paragraph>
        </Link>
    )
}
