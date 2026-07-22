import { AlertTextTypeEnum } from '@/enums/types/AlertTextTypeEnum'
import clsx from 'clsx'
import React, { memo } from 'react'
import { useAlertIcon } from './useAlertIcon'

interface AlertIconProps {
  children: React.ReactNode
  icon: React.ReactNode
  type?: AlertTextTypeEnum
  className?: string
}

const AlertIcon: React.FC<AlertIconProps> = ({ children, icon, type = AlertTextTypeEnum.Warning, className = '' }) => {
  const baseClasses = 'relative flex items-center border p-3.5 rounded ltr:border-l-[64px] rtl:border-r-[64px]'

  const computedClasses = clsx(baseClasses, useAlertIcon(type), className)

  return (
    <div className={computedClasses}>
      <span className="absolute inset-y-0 m-auto h-6 w-6 text-gray-500 ltr:-left-11 rtl:-right-11 dark:text-gray-100">{icon}</span>
      <span className="ltr:pr-2 rtl:pl-2">{children}</span>
    </div>
  )
}

export default memo(AlertIcon)
