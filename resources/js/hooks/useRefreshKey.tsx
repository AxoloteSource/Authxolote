import { useState } from 'react'
interface IUseRefreshKeyProps {
  module?: string
  service: (params: Record<string, unknown>) => { data: unknown; isLoading: boolean; refetch: () => void }
  close?: () => void
  payload?: Record<string, unknown>
}

export const useRefreshKey = ({ module = '', service, close, payload = {} }: IUseRefreshKeyProps) => {
  const [key, setKey] = useState<number>(0)
  const { refetch } = service({
    ...payload,
    page: 1,
    filters: []
  })
  const handleRefetch = async () => {
    setKey((prev) => prev + 1)
    await refetch()
  }
  const refreshKey = `${module}-table-${key}`

  const handleSuccess = () => {
    if (close) {
      close()
    }
    handleRefetch()
  }
  return {
    refreshKey,
    handleRefetch,
    handleSuccess
  }
}
