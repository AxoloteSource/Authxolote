import { ButtonTypeEnum } from '@/components/Buttons/enums/buttonType.enum'
import { ButtonVariantEnum } from '@/components/Buttons/enums/buttonVariant.enum'
import { SizeEnum } from '@/enums/SizeEnum'
import { IRoutes } from '@/router/routes.interface'
import React from 'react'

export interface IUseButtonProps {
  variant: ButtonVariantEnum
  color?: string
  type: ButtonTypeEnum
  className?: string
  to?: IRoutes
  disabled?: boolean
  loading?: boolean
  size?: SizeEnum
  children: React.ReactNode
}
