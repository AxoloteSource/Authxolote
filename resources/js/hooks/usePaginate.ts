import { useState } from 'react'

/**
 * @deprecated use usePaginate
 */
export const usePaginate = (
  service: (params: Record<string, unknown>) => { data: unknown; isLoading: boolean; isError: boolean },
  payload?: Record<string, unknown>
) => {
  const [page, setPage] = useState(1)
  const pageSize = [10, 20, 30, 50, 100]
  const [limit, setLimit] = useState(pageSize[0])
  const { data, isLoading, isError } = service({ ...payload, page, limit })

  return {
    page,
    setPage,
    setLimit,
    pageSize,
    data,
    isLoading,
    isError
  }
}
