import { ButtonTypeEnum } from '@/components/Buttons/enums/buttonType.enum'
import { ButtonVariantEnum } from '@/components/Buttons/enums/buttonVariant.enum'
import { SizeEnum } from '@/enums/SizeEnum'
import React from 'react'
import { IRoutes } from "@/routes/routes.interface";

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
