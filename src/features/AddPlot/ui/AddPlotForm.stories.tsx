import { type Meta, type StoryFn } from '@storybook/react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { AddPlotForm } from '..'

export default {
    title: 'features/PlotForm',
    component: RouterProvider,
} as Meta

export const Router = createBrowserRouter([
    {
        path: '/',
        element: (
            <AddPlotForm
                number={2}
                fieldId={1}
                plotsSize={333}
                defaultValues={{
                    nameValue: 'Название участка',
                    areaValue: 55,
                    plantValue: 1,
                    soilValue: 1,
                }}
            />
        ),
    },
])

const Template: StoryFn = () => <RouterProvider router={Router} />
export const Default = Template.bind({})
