import { IBreadCrumblesItemsProps } from '@/components/BreadCrumbles/BreadCrumblesItems/IBreadCrumblesItemsProps'
import { useBreadCrumblesItems } from '@/components/BreadCrumbles/BreadCrumblesItems/useBreadCrumblesItems'
import { memo } from 'react'
import { Link } from 'react-router-dom'

export const BreadCrumblesItems = ({ children, to, className }: IBreadCrumblesItemsProps) => {
  const { childrenResult } = useBreadCrumblesItems({ children })
  return (
    <>
      {to ? (
        <li>
          <Link className={`${className} text-primary hover:underline`} to={to}>
            {childrenResult}
          </Link>
        </li>
      ) : (
        <li className={className}>{childrenResult}</li>
      )}
    </>
  )
}

export default memo(BreadCrumblesItems)
