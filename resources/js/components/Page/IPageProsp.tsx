import { IBreadCrumblesItemsProps } from '@/components/BreadCrumbles/BreadCrumblesItems/IBreadCrumblesItemsProps'
import { ReactNode } from 'react'

export interface IPageProps {
  children?: ReactNode
  titleTranslation?: string
  breadCrumblesItems?: IBreadCrumblesItemsProps[]
}
