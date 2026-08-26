import { ButtonTypeEnum } from '@/components/Buttons/enums/buttonType.enum'
import { ButtonVariantEnum } from '@/components/Buttons/enums/buttonVariant.enum'
import { SizeEnum } from '@/enums/SizeEnum'
import { IRoutes } from '@/router/routes.interface'
import React from 'react'

export interface IButtonProps {
  type?: ButtonTypeEnum
  variant?: ButtonVariantEnum
  children: React.ReactNode
  loading?: boolean
  to?: IRoutes
  color?: string
  className?: string
  size?: SizeEnum
  onClick?: (e?: React.MouseEvent<HTMLButtonElement>) => unknown
  disabled?: boolean
}
