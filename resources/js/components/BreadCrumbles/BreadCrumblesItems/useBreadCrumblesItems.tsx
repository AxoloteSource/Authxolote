import React from 'react'

export const useBreadCrumblesItems = ({ children }: { children: React.ReactNode }) => {
  return {
    childrenResult: typeof children === 'string' ? children.charAt(0).toUpperCase() + children.slice(1) : children
  }
}
