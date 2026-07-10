import { IPaginate } from '@/interfaces/IPaginate'
import { IPaginateServiceProps } from '@/interfaces/IPaginateServiceProps'
import { useServiceUserLists } from './useServiceUserLists'
import { useMemo } from 'react'

export const useServiceUserListsSelect = ({ enabled = true }: IPaginateServiceProps & { enabled?: boolean }) => {
  const query = useServiceUserLists()

  const paginatedData = useMemo(() => {
    if (!query.data) return undefined

    const rawData = query.data as Record<string, unknown>
    const items = Array.isArray(rawData) ? rawData : ((rawData?.data as Array<Record<string, unknown>>) ?? [])

    return {
      current_page: 1,
      data: items,
      first_page_url: '',
      from: 1,
      last_page: 1,
      last_page_url: '',
      links: [],
      next_page_url: null,
      path: '',
      per_page: items.length,
      prev_page_url: null,
      to: items.length,
      total: items.length,
      columns: []
    } as IPaginate<Record<string, unknown>>
  }, [query.data])

  return {
    ...query,
    data: paginatedData
  }
}
