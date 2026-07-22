import React, { ReactNode } from 'react'

interface IconListItemProps {
  children: ReactNode
  className?: string
  onClick?: () => void
}

export const ArrowIcon: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`text-primary inline h-4 w-4 ltr:mr-2 rtl:ml-2 rtl:rotate-180 ${className}`}
    >
      <path d="M4 12H20M20 12L14 6M20 12L14 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export const IconListItem: React.FC<IconListItemProps> = ({ children, className = '', onClick = () => {} }) => {
  return (
    <li className={className} onClick={onClick}>
      <ArrowIcon />
      {children}
    </li>
  )
}

export default IconListItem
