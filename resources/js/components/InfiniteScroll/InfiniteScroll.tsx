import { IInfiniteScrollProps } from '@/components/InfiniteScroll/IInfiniteScrollProps'
import { useInfiniteScroll } from '@/components/InfiniteScroll/useInfiniteScroll'
import React from 'react'

export const InfiniteScroll: React.FC<IInfiniteScrollProps> = ({ enabled = true, onLoadMore, children, isFetchingNextPage = false }) => {
  const { sentinelRef, t } = useInfiniteScroll({
    enabled,
    onLoadMore
  })

  return (
    <div style={{ height: '80vh', overflowY: 'auto' }}>
      {children}
      <div ref={sentinelRef} style={{ height: '20px' }} />;{isFetchingNextPage && <p>{t('load_more')}</p>}
    </div>
  )
}
