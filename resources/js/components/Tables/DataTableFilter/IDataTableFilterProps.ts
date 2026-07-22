import { IFilters } from '@/components/Filters/ModalFilter/types'
import { DataTableRenderersMap } from '@/hooks/useDataTable'
import { FormikProps } from 'formik'
import { ReactNode } from 'react'

export interface IDataTableFilterProps<Values> {
  filters: IFilters<Values>[]
  propertyInputSearch?: string
  onClickNew: () => void
  service: (params: Record<string, unknown>) => { data?: Record<string, unknown>; isLoading: boolean; refetch: () => void }
  renderersMap?: DataTableRenderersMap | undefined
  rowExpansion?: {
    content: ({ record }: { record: Record<string, unknown> }) => ReactNode
  }
  children?: ((formik: FormikProps<Values>) => ReactNode) | ReactNode
  withoutFilters?: boolean
  showNewButton?: boolean
  payload?: Record<string, unknown>
}
