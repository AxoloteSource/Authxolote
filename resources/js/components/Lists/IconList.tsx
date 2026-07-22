import React, { ReactNode } from 'react'
import IconListItem from './IconListItem'

interface IconListItemTextProps {
  text: string
}

interface IconListProps {
  children?: ReactNode
  items?: IconListItemTextProps[]
  className?: string
}

export const IconList: React.FC<IconListProps> = ({ children, items, className = '' }) => {
  if ((!items || items.length === 0) && !children) {
    return null
  }

  return (
    <ul className={`space-y-2 font-semibold ${className}`}>
      {children}

      {items &&
        items.map((item, index) => (
          <IconListItem key={index}>
            <span className="list-text">{item.text}</span>
          </IconListItem>
        ))}
    </ul>
  )
}

export default IconList
