import { IDataTableCustomProps } from '@/components/Tables/DataTable/IDataTableCustomProps'
import { DataTable as MantineDataTable } from 'mantine-datatable'
import { FC, useMemo } from 'react'

export const DataTable: FC<IDataTableCustomProps> = ({ isLoading = false, rowExpansion, className = '', datatablePros }) => {
  const tableProps = useMemo(() => {
    if (rowExpansion) {
      return {
        ...datatablePros,
        rowExpansion: {
          content: rowExpansion.content
        }
      }
    }
    return datatablePros
  }, [datatablePros, rowExpansion])

  if (isLoading) {
    return (
      <div className={`datatables ${className}`}>
        <div className="flex items-center justify-center p-6">
          <div className="h-12 w-12 animate-spin rounded-full border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </div>
    )
  }

  return (
    <div className={`datatables ${className}`}>
      <MantineDataTable {...tableProps} />
    </div>
  )
}
