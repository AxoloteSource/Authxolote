import { TypographyVariantEnum } from '@/components/Typography/enums/typographyVariant.enum'
import { useTypography } from '@/components/Typography/useTypography'
import { Color } from '@/enums/Color'
import React from 'react'

export interface TypographyProps {
  variant: TypographyVariantEnum
  children?: React.ReactNode
  color?: string | Color
  className?: string
  fontBold?: boolean
}

const Typography = ({ variant = TypographyVariantEnum.P, children, color, className = '', fontBold = false }: TypographyProps) => {
  const { customClass, tag } = useTypography({ variant, color, fontBold })

  return <>{React.createElement(tag, { className: `${customClass} ${className}` }, children)}</>
}

export default Typography
