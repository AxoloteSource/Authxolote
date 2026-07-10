import React, { useCallback, useMemo, useState } from 'react'

export interface IAccordionItem {
  id: string
  header: React.ReactNode
  content: React.ReactNode
  leftIcon?: React.ReactNode
}

export interface IAccordionProps {
  items: IAccordionItem[]
  className?: string
  itemClassName?: string
  headerClassName?: string
  contentClassName?: string
  // When true, more than one panel can remain open
  allowMultiple?: boolean
  // Uncontrolled default active id(s)
  defaultActiveId?: string | null
  defaultActiveIds?: string[]
  // Controlled mode
  activeId?: string | null
  activeIds?: string[]
  onChange?: (nextOpen: string[] | null) => void
  showChevron?: boolean
}

const ChevronIcon = ({ rotated = false }: { rotated?: boolean }) => (
  <div className={`${rotated ? 'rotate-180' : ''} transition-transform duration-200 ltr:ml-auto rtl:mr-auto`}>
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M19 9L12 15L5 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  </div>
)

import useAccordion from './useAccordion'

const Collapsible: React.FC<{ open: boolean; duration?: number; className?: string; children: React.ReactNode }> = ({
  open,
  duration = 300,
  className,
  children
}) => {
  const { contentRef, containerStyle } = useAccordion({ open, duration })
  return (
    <div style={containerStyle} className={`overflow-hidden ${className || ''}`}>
      <div ref={contentRef}>{children}</div>
    </div>
  )
}

export const Accordion: React.FC<IAccordionProps> = ({
  items,
  className = '',
  itemClassName = 'border border-[#d3d3d3] dark:border-[#1b2e4b] rounded',
  headerClassName = 'p-4 w-full flex items-center text-white-dark dark:bg-[#1b2e4b] hover:text-primary transition-colors',
  contentClassName = 'p-4 text-[13px] border-t border-[#d3d3d3] dark:border-[#1b2e4b]',
  allowMultiple = false,
  defaultActiveId = null,
  defaultActiveIds,
  activeId,
  activeIds,
  onChange,
  showChevron = true
}) => {
  const isControlled = useMemo(() => Array.isArray(activeIds) || typeof activeId !== 'undefined', [activeId, activeIds])

  const initialOpen = useMemo<string[]>(() => {
    if (isControlled) {
      if (Array.isArray(activeIds)) return activeIds
      if (typeof activeId === 'string' && activeId) return [activeId]
      return []
    }
    if (defaultActiveIds && defaultActiveIds.length) return defaultActiveIds
    if (defaultActiveId) return [defaultActiveId]
    return []
  }, [isControlled, activeId, activeIds, defaultActiveId, defaultActiveIds])

  const [openIds, setOpenIds] = useState<string[]>(initialOpen)

  const effectiveOpenIds = useMemo(
    () => (isControlled ? (Array.isArray(activeIds) ? activeIds : typeof activeId === 'string' && activeId ? [activeId] : []) : openIds),
    [isControlled, activeId, activeIds, openIds]
  )

  const toggle = useCallback(
    (id: string) => {
      let next: string[]
      if (allowMultiple) {
        next = effectiveOpenIds.includes(id) ? effectiveOpenIds.filter((x) => x !== id) : [...effectiveOpenIds, id]
      } else {
        next = effectiveOpenIds[0] === id ? [] : [id]
      }

      if (!isControlled) setOpenIds(next)
      onChange?.(next.length ? next : null)
    },
    [allowMultiple, effectiveOpenIds, isControlled, onChange]
  )

  return (
    <div className={className}>
      {items.map((it) => {
        const isOpen = effectiveOpenIds.includes(it.id)
        return (
          <div key={it.id} className={`${itemClassName} ${!allowMultiple ? 'mb-2 last:mb-0' : 'mb-2 last:mb-0'}`}>
            <button type="button" className={`${headerClassName} ${isOpen ? '!text-primary' : ''}`} onClick={() => toggle(it.id)}>
              {it.leftIcon}
              <div className={it.leftIcon ? 'ltr:mr-2 rtl:ml-2' : ''}>{it.header}</div>
              {showChevron && <ChevronIcon rotated={isOpen} />}
            </button>
            <Collapsible open={isOpen}>
              <div className={contentClassName}>{it.content}</div>
            </Collapsible>
          </div>
        )
      })}
    </div>
  )
}

export default Accordion
