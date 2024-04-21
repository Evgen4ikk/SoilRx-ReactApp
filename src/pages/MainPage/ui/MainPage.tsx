import { FC } from 'react'
import FieldsIcon from '@app/icons/fields.svg?react'
import FileIcon from '@app/icons/file.svg?react'
import FlaskIcon from '@app/icons/flask.svg?react'
import MedalIcon from '@app/icons/medal.svg?react'
import PencilIcon from '@app/icons/pencil.svg?react'
import SmileIcon from '@app/icons/smile.svg?react'
import WheatIcon from '@app/icons/wheat.svg?react'
import { cn } from '@lib/dom/classnames'
import { routeMap } from '@model/api'
import Button from '@ui/Button'
import { ESpacing } from '@ui/Enums/Enums'
import Flex from '@ui/Flex'
import Link from '@ui/Link'
import Paragraph from '@ui/Paragraph'
import Title from '@ui/Title'

const stepsData = [
    {
        step: 'Шаг 1.',
        description: 'Берёте пробу почвы на своём участке',
        Icon: <PencilIcon />,
    },
    {
        step: 'Шаг 2.',
        description: 'Относите пробу на анализ в лабораторию',
        Icon: <FlaskIcon />,
    },
    {
        step: 'Шаг 3.',
        description: 'Забираете протокол с результатами анализа',
        Icon: <FileIcon />,
    },
    {
        step: 'Шаг 4.',
        description: 'Регистрируетесь на платформе',
        Icon: <WheatIcon />,
    },
    {
        step: 'Шаг 5.',
        description: 'Создаете хотя бы одно поле и один участок',
        Icon: <FieldsIcon />,
    },
    {
        step: 'Шаг 6.',
        description: 'Загружаете результаты анализов на нашу платформу',
        Icon: <SmileIcon />,
    },
    {
        step: 'Шаг 7.',
        description:
            'Получаете рекомендации по использованию и удобрению земельного участка, а также по высадке культур в формате Топ-7',
        Icon: <MedalIcon />,
    },
]

export const MainPage: FC = () => {
    return (
        <>
            <div className="mb-10 bg-main-bg bg-fixed bg-clip-text bg-right-bottom text-center font-inter text-[418px] font-bold uppercase text-transparent">
                soil-rx
            </div>
            <Title className="!mb-6 !text-[54px] !font-semibold uppercase !leading-[67.77px] !text-gray-800">
                Цифровая платформа для получения консультаций о состоянии почвы
                и произрастанию культур
            </Title>
            <Flex gap="130px" className="mb-[315px]">
                <Paragraph className="max-w-[610px] text-2xl text-gray-600">
                    Наша платформа позволяет получать бесплатные рекомендации по
                    удобрению почвы и посадке культур на основании химического
                    анализа
                </Paragraph>
                <img src="/images/image-cards.png" alt="image-cards" />
            </Flex>
            <Flex justify="space-between" className="mb-40">
                <Title className="max-w-[300px] !text-2xl !font-semibold !text-gray-800">
                    Зачем это вам?
                </Title>
                <Flex vertical className="max-w-[1328px]" gap={ESpacing.VALUE6}>
                    <Title className="!m-0 !text-5xl !font-semibold uppercase !text-gray-800">
                        Рекомендации в нашем сервисе основаны на агрохимическом
                        анализе почвы
                    </Title>
                    <Flex justify="space-between" className="mb-4">
                        <Paragraph className="max-w-[570px] text-2xl !font-semibold !leading-[29.05px] text-gray-800">
                            Сейчас мы учитываем основные полезные характеристики
                            почвы.
                            <br />
                            <br />
                            Система уже может оценить содержание натрия (N),
                            фосфора (P), калия (K) и состояние
                            кислотно-щелочного баланса (pH) в почве.
                        </Paragraph>
                        <Paragraph className="max-w-[644px] text-2xl !font-semibold !leading-[29.05px] text-gray-800">
                            Эти показатели являются базой плодородия и
                            необходимы для быстрого роста и развития семян,
                            набора биомассы растением и поддержке природного
                            иммунитета растений.
                            <br />
                            <br />
                            Рекомендации можно использовать для планирования
                            использования земельного участка.
                        </Paragraph>
                    </Flex>
                    <img
                        src="/images/recomendation-peview.png"
                        alt="recomendation-peview"
                        className="shadow-xl"
                    />
                </Flex>
            </Flex>
            <Flex justify="space-between">
                <Title className="max-w-[300px] !text-2xl !font-semibold !text-gray-800">
                    Как это работает?
                </Title>
                <Flex vertical gap={ESpacing.VALUE4}>
                    <div className="grid max-w-[1328px] grid-cols-4 gap-4">
                        {stepsData.map((step, index) => (
                            <Flex
                                gap={ESpacing.VALUE4}
                                vertical
                                key={index}
                                className={cn(
                                    'bg-gray-100 p-6',
                                    index === stepsData.length - 1
                                        ? 'w-[656px]'
                                        : 'w-[320px]',
                                )}
                            >
                                {step.Icon}
                                <Title className="!m-0 !text-4xl !text-gray-800">
                                    {step.step}
                                </Title>
                                <Paragraph className="text-2xl !font-semibold !leading-[29px] text-gray-600">
                                    {step.description}
                                </Paragraph>
                            </Flex>
                        ))}
                    </div>
                    <Link to={routeMap.login}>
                        <Button
                            variant="secondAction"
                            className="w-full py-[136px] text-5xl font-medium uppercase enabled:hover:!bg-accent enabled:hover:!text-white"
                        >
                            Попробовать SOIL-RX бесплатно
                        </Button>
                    </Link>
                </Flex>
            </Flex>
        </>
    )
}
