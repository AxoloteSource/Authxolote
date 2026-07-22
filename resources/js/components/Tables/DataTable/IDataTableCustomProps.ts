import { DataTableProps } from 'mantine-datatable'
import { ReactNode } from 'react'

export interface IDataTableCustomProps {
  isLoading?: boolean
  className?: string
  rowExpansion?: {
    content: ({ record }: { record: Record<string, unknown> }) => ReactNode
  }
  datatablePros: DataTableProps<Record<string, unknown>>
}
