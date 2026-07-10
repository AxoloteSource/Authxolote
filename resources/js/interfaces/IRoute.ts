import { IUser } from '@/interfaces/models/User/user.interface'
import React from 'react'

interface IRoute {
  path: string
  element: React.ReactNode
  layout?: string
  private?: boolean
  hasPermission?: (props: IUser) => boolean
}

export default IRoute
