import { IRoutes } from '@/router/routes.interface'
import React from 'react'

export interface IBreadCrumblesItemsProps {
  children: React.ReactNode
  to?: IRoutes
  className?: string
}
