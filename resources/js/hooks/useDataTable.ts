import { DataTableColumn } from 'mantine-datatable'
import { useCallback, useEffect, useState } from 'react'

export interface DataTableRenderersMap {
  [key: string]: (record: Record<string, unknown>) => React.ReactNode
}

interface UseDataTableParams {
  service: (params: Record<string, unknown>) => { data?: Record<string, unknown>; isLoading: boolean; refetch: () => void }
  payload?: Record<string, unknown>
  renderersMap?: DataTableRenderersMap
  dataTableProps?: (props: Record<string, unknown>) => Record<string, unknown>
}

const getUrlParam = (name: string): string | null => {
  const urlParams = new URLSearchParams(window.location.search)
  return urlParams.get(name)
}

const setUrlParam = (name: string, value: string) => {
  const url = new URL(window.location.href)
  url.searchParams.set(name, value)
  window.history.replaceState({}, '', url.toString())
}

export const useDataTable = ({ service, payload = {}, renderersMap = {}, dataTableProps }: UseDataTableParams) => {
  const initialPage = parseInt(getUrlParam('page') || '1', 10)
  const initialLimit = parseInt(getUrlParam('limit') || '10', 10)

  const [page, setPageState] = useState(initialPage)
  const pageSize = [10, 20, 30, 50, 100]
  const [limit, setLimitState] = useState(initialLimit)

  const { data, isLoading, refetch } = service({ page, limit, ...payload })

  const setPage = useCallback((newPage: number) => {
    setPageState(newPage)
    setUrlParam('page', newPage.toString())
  }, [])

  const setLimit = useCallback(
    (newLimit: number) => {
      setLimitState(newLimit)
      setUrlParam('limit', newLimit.toString())
      setPage(1)
    },
    [setPage]
  )

  useEffect(() => {
    setUrlParam('page', page.toString())
    setUrlParam('limit', limit.toString())
  }, [page, limit])

  const applyRenderers = (columns: DataTableColumn<Record<string, unknown>>[]) => {
    return columns.map((column) => {
      const accessor = column.accessor as string

      if (accessor && renderersMap[accessor]) {
        return {
          ...column,
          render: renderersMap[accessor]
        }
      }

      return column
    })
  }

  const defaultDataTableProps = {
    page,
    recordsPerPage: data?.per_page ?? limit,
    totalRecords: data?.total || 0,
    onPageChange: setPage,
    records: data?.data || [],
    columns: data?.columns ? applyRenderers(data.columns) : [],
    onRecordsPerPageChange: setLimit,
    recordsPerPageOptions: pageSize,
    noRecordsText: 'No se encontraron resultados que coincidan con tu búsqueda',
    highlightOnHover: true,
    className: 'whitespace-nowrap table-hover',
    minHeight: 200,
    paginationText: ({ from, to, totalRecords }: { from: number; to: number; totalRecords: number }) =>
      `Mostrando del ${from} al ${to} de ${totalRecords} registros`
  }

  const finalDataTableProps = dataTableProps ? dataTableProps(defaultDataTableProps) : defaultDataTableProps

  return {
    page,
    setPage,
    limit,
    setLimit,
    pageSize,
    data,
    isLoading,
    refetch,
    dataTableProps: finalDataTableProps
  }
}
