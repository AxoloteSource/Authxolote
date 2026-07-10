import { IInfiniteScrollProps } from '@/components/InfiniteScroll/IInfiniteScrollProps'
import { useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'

export const useInfiniteScroll = ({ enabled = true, onLoadMore }: IInfiniteScrollProps) => {
  const sentinelRef = useRef<HTMLDivElement | null>(null)
  const { t } = useTranslation()

  useEffect(() => {
    if (!enabled || !sentinelRef.current) return

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries
        if (entry.isIntersecting && enabled) {
          onLoadMore()
        }
      },
      { threshold: 1.0 }
    )

    observer.observe(sentinelRef.current)

    return () => {
      observer.disconnect()
    }
  }, [enabled, onLoadMore])

  return { sentinelRef, t }
}
