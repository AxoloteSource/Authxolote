import React from 'react'

export interface IInfiniteScrollProps {
  children?: React.ReactNode
  enabled?: boolean
  isFetchingNextPage?: boolean
  onLoadMore: () => void
}
