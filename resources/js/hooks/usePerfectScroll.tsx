import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'

interface IPerfectScrollProps {
  hasNextPage: boolean
  isFetchingNextPage: boolean
  fetchNextPage: () => void
}

const TOP_THRESHOLD = 16
export const usePerfectScroll = ({ hasNextPage, isFetchingNextPage, fetchNextPage }: IPerfectScrollProps) => {
  const scrollElRef = useRef<HTMLElement | null>(null)
  const isAtBottomRef = useRef(true)
  const [isAtTop, setIsAtTop] = useState(false)
  const { t } = useTranslation()

  const scrollToBottom = () => {
    const el = scrollElRef.current
    if (!el) return
    el.scrollTop = el.scrollHeight
  }

  useEffect(() => {
    const el = scrollElRef.current
    if (!el) return
    el.scrollTop = el.scrollHeight
  }, [])

  const handleScrollY = (container: HTMLElement) => {
    const el = scrollElRef.current
    if (!el) return
    const delta = el.scrollHeight - el.scrollTop - el.clientHeight
    isAtBottomRef.current = delta <= TOP_THRESHOLD

    const atTop = (container?.scrollTop ?? 0) <= TOP_THRESHOLD
    if (atTop !== isAtTop) setIsAtTop(atTop)
  }

  const onYReachStart = async () => {
    if (!hasNextPage || isFetchingNextPage) return
    const el = scrollElRef.current
    if (!el) return

    const prevScrollHeight = el.scrollHeight
    const prevScrollTop = el.scrollTop

    await fetchNextPage()

    requestAnimationFrame(() => {
      const newScrollHeight = el.scrollHeight
      el.scrollTop = prevScrollTop + (newScrollHeight - prevScrollHeight)
    })
  }

  const showNoMessages = isAtTop && !isFetchingNextPage && !hasNextPage
  const showLoaderMessages = isAtTop && isFetchingNextPage && hasNextPage

  return {
    handleScrollY,
    scrollElRef,
    scrollToBottom,
    onYReachStart,
    showNoMessages,
    showLoaderMessages,
    t
  }
}
