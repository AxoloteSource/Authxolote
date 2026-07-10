import IRoute from '@/interfaces/IRoute'
import { lazy } from 'react'

const NotFoundPage = lazy(() => import('@/pages/Errors/NotFoundPage/NotFoundPage'))
const ForbiddenPage = lazy(() => import('@/pages/Errors/ForbiddenPage/ForbiddenPage'))

export enum ErrorRoutes {
  Forbidden = '/forbidden'
}

export const errorRoutes: IRoute[] = [
  {
    path: ErrorRoutes.Forbidden,
    element: <ForbiddenPage />,
    layout: 'blank'
  },
  {
    path: '*',
    element: <NotFoundPage />,
    layout: 'blank'
  }
]
