import { DropdownVariantEnum } from '@/components/Dropdown/DropdownVariantEnum'
import React from 'react'

export interface IDropdownProps {
  className?: string
  variant?: DropdownVariantEnum
  color?: string
  children: React.ReactNode
  title: string
}
