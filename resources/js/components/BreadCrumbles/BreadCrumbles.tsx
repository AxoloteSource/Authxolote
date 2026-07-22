import React from 'react'

export const BreadCrumbles = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => {
  return (
    <div className={`hidden sm:block ${className}`}>
      <ul className="flex space-x-2 rtl:space-x-reverse">
        {React.Children.map(children, (child, index) => {
          return (
            <>
              {index !== 0 && <li>/</li>}
              {child}
            </>
          )
        })}
      </ul>
    </div>
  )
}
