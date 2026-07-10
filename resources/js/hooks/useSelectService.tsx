import { IOptions } from '@/components/Form/Select/interfaces/IOptions'
import { IPaginate } from '@/interfaces/IPaginate'
import { IFilterProps } from '@/interfaces/IPaginateServiceProps'
import { useSelectOptionsStore } from '@/store/useSelectOptionsStore'
import { debounce } from '@tanstack/pacer'
import { UseQueryResult } from '@tanstack/react-query'
import { useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'

interface ISelectService<T extends Record<string, unknown>> {
  useService: (data: Record<string, unknown>) => UseQueryResult<IPaginate<T>>
  value?: string
  label?: string
  search?: string
  filters?: Array<IFilterProps> | null
  storeKey?: string
  useCache?: boolean
  debounceWait?: number
  selectedOption?: IOptions | null
}

export const useSelectService = <T extends Record<string, unknown>>(props: ISelectService<T>) => {
  const { useService, value = 'id', label = 'name', search, filters = [], storeKey, useCache, debounceWait = 400, selectedOption } = props

  const { t } = useTranslation()
  const { setOptions, getOptions, hasOptions } = useSelectOptionsStore()

  const [internalSearch, setInternalSearch] = useState<string>('')
  const effectiveSearch = typeof search === 'string' ? search : internalSearch
  const effectiveUseCache = typeof useCache === 'boolean' ? useCache : effectiveSearch.length === 0

  const hasCachedOptions = storeKey ? hasOptions(storeKey) : false
  const shouldFetchData = !effectiveUseCache || !hasCachedOptions

  const { isLoading, data } = useService({
    search: effectiveSearch,
    filters,
    enabled: shouldFetchData
  })

  const processedOptions = useMemo(() => {
    if (!isLoading && data?.data) {
      return data.data.map((item) => ({
        value: item[value] as string | number,
        label: item[label] as string
      }))
    }
    return null
  }, [data, isLoading, value, label])

  useEffect(() => {
    if (processedOptions && storeKey) {
      setOptions(storeKey, processedOptions)
    }

    const exists = processedOptions?.some((option) => option.value === selectedOption?.value)
    if (!exists && storeKey && selectedOption && processedOptions) {
      setOptions(storeKey, [...processedOptions, selectedOption])
    }
  }, [processedOptions, storeKey, setOptions, selectedOption])

  const options: Array<IOptions> = useMemo(() => {
    if (isLoading && shouldFetchData) {
      return []
    }

    if (storeKey && effectiveUseCache && hasCachedOptions) {
      return getOptions(storeKey)
    }

    if (processedOptions) {
      return processedOptions
    }

    return []
  }, [storeKey, effectiveUseCache, hasCachedOptions, processedOptions, isLoading, shouldFetchData, getOptions])

  const handleInputChange = useMemo(
    () =>
      debounce(
        (inputValue: string) => {
          setInternalSearch(inputValue)
        },
        { wait: debounceWait }
      ),
    [debounceWait]
  )

  return {
    isLoading,
    options,
    t,
    data,
    handleInputChange
  }
}
