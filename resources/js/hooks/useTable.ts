import { useState } from 'react'

/**
 * @deprecated use usePaginate
 */
export const useTable = (service: (params: Record<string, unknown>) => { data: unknown; isLoading: boolean; refetch: () => void }) => {
  const [page, setPage] = useState(1)
  const pageSize = [10, 20, 30, 50, 100]
  const [limit, setLimit] = useState(pageSize[0])
  const { data, isLoading, refetch } = service({ page, limit })

  return {
    page,
    setPage,
    setLimit,
    pageSize,
    data,
    isLoading,
    refetch
  }
}
