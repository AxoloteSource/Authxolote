import IRoute from '@/interfaces/IRoute'
import { lazy } from 'react'

const Login = lazy(() => import('@/pages/Auth/LoginPage/LoginPage'))

export enum AuthRoutes {
  Login = '/login'
}

export const authRoutes: IRoute[] = [
  {
    path: AuthRoutes.Login,
    element: <Login />,
    layout: 'blank'
  }
]
