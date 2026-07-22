import React, { memo } from 'react'
import { ButtonTypeEnum } from './enums/buttonType.enum'
import { ButtonVariantEnum } from './enums/buttonVariant.enum'
import { IButtonProps } from './interfaces/buttonProps.interface'
import { useButton } from './useButton'

const Button = ({
  disabled = false,
  type = ButtonTypeEnum.Button,
  variant = ButtonVariantEnum.Solid,
  children,
  className,
  color = 'primary',
  loading = false,
  size,
  to,
  onClick
}: IButtonProps) => {
  const { tag, tagProps, customChildren } = useButton({
    variant,
    type,
    color,
    to,
    className,
    loading,
    children,
    disabled,
    size
  })

  return (
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    <>{React.createElement(tag, { ...tagProps, onClick }, customChildren)}</>
  )
}

export default memo(Button)
