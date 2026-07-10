import { KeyboardEvent, useCallback, useState } from 'react'
import { ITabItem } from './ITabsProps'

interface UseTabsParams {
  items: ITabItem[]
  defaultActive?: number
  activeIndex?: number
  onChange?: (index: number) => void
}

export const useTabs = ({ items, defaultActive = 0, activeIndex: controlledIndex, onChange }: UseTabsParams) => {
  const [internalIndex, setInternalIndex] = useState(defaultActive)

  const isControlled = controlledIndex !== undefined
  const activeIndex = isControlled ? controlledIndex : internalIndex

  const setActiveIndex = useCallback(
    (index: number) => {
      if (index < 0 || index >= items.length) return
      if (items[index]?.disabled) return
      if (!isControlled) setInternalIndex(index)
      onChange?.(index)
    },
    [isControlled, items, onChange]
  )

  const findNextEnabled = useCallback(
    (fromIndex: number, direction: 1 | -1): number => {
      let i = fromIndex
      const len = items.length
      for (let attempt = 0; attempt < len; attempt++) {
        i = (i + direction + len) % len
        if (!items[i]?.disabled) return i
      }
      return fromIndex
    },
    [items]
  )

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLDivElement>) => {
      let newIndex = activeIndex

      switch (e.key) {
        case 'ArrowLeft':
          e.preventDefault()
          newIndex = findNextEnabled(activeIndex, -1)
          break
        case 'ArrowRight':
          e.preventDefault()
          newIndex = findNextEnabled(activeIndex, 1)
          break
        case 'Home':
          e.preventDefault()
          newIndex = findNextEnabled(-1, 1)
          break
        case 'End':
          e.preventDefault()
          newIndex = findNextEnabled(items.length, -1)
          break
        default:
          return
      }

      setActiveIndex(newIndex)
    },
    [activeIndex, findNextEnabled, setActiveIndex, items.length]
  )

  return {
    activeIndex,
    setActiveIndex,
    handleKeyDown
  }
}
