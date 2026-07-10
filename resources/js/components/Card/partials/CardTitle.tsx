import React from 'react'

export interface ICardTitleProps {
  actionButton?: React.ReactNode
  children: React.ReactNode
}

const CardTitle = ({ children, actionButton }: ICardTitleProps) => {
  return (
    <div className="mb-5 flex items-center justify-between">
      <h5 className="dark:text-white-light text-lg font-semibold">{children}</h5>
      {actionButton}
    </div>
  )
}

export default CardTitle
