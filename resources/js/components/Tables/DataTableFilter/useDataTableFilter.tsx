import { IFilterData, IFilterItem } from '@/components/Filters/ModalFilter/types'
import { IDataTableFilterProps } from '@/components/Tables/DataTableFilter/IDataTableFilterProps'
import { useDataTable } from '@/hooks/useDataTable'
import { useModal } from '@/hooks/useModal'
import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'

export const useDataTableFilter = <Values,>(props: IDataTableFilterProps<Values>) => {
  const { onClickNew, renderersMap, rowExpansion, service, children, filters, withoutFilters = false, showNewButton = true, payload = {} } = props

  const { t } = useTranslation()
  const [search, setSearch] = useState<string>('')
  const [appliedFilters, setAppliedFilters] = useState<IFilterItem<Values>[]>([])
  const { isOpen, open, close } = useModal(false)

  const combinedFilters = useMemo(() => {
    return [...appliedFilters]
  }, [appliedFilters])

  const { dataTableProps, isLoading, refetch } = useDataTable({
    service,
    payload: {
      ...payload,
      filters: combinedFilters,
      search: search
    },
    renderersMap
  })

  const onFilter = (filters: IFilterData<Values>) => {
    setAppliedFilters(filters.filters)
    refetch()
  }

  return {
    t,
    filters,
    isOpen,
    search,
    dataTableProps,
    isLoading,
    rowExpansion,
    children,
    withoutFilters,
    open,
    close,
    onFilter,
    setSearch,
    onClickNew,
    showNewButton
  }
}
