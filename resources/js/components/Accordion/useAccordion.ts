import { useEffect, useRef, useState } from 'react'

interface UseAccordionParams {
  open: boolean
  duration?: number
}

interface UseAccordionReturn {
  contentRef: React.RefObject<HTMLDivElement | null>
  containerStyle: React.CSSProperties
}

/**
 * useAccordion centralizes the expand/collapse height animation logic.
 * It measures the content's scrollHeight when open and animates max-height.
 */
export function useAccordion({ open, duration = 300 }: UseAccordionParams): UseAccordionReturn {
  const contentRef = useRef<HTMLDivElement>(null)
  const [maxHeight, setMaxHeight] = useState(0)

  // Measure when opening or children change
  useEffect(() => {
    const el = contentRef.current
    if (!el) return

    if (open) {
      setMaxHeight(el.scrollHeight)
    } else {
      setMaxHeight(0)
    }
  }, [open])

  // Observe size while open to keep height in sync
  useEffect(() => {
    const el = contentRef.current
    if (!open || !el) return

    const observer = new ResizeObserver(() => {
      setMaxHeight(el.scrollHeight)
    })
    observer.observe(el)
    return () => observer.disconnect()
  }, [open])

  const containerStyle: React.CSSProperties = {
    maxHeight: open ? maxHeight : 0,
    transition: `max-height ${duration}ms ease`
  }

  return { contentRef, containerStyle }
}

export default useAccordion
