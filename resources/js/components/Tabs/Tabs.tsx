import { Badge } from '@/components/Badge/Badge'
import { cn } from '@/lib/utils'
import { X } from 'lucide-react'
import { ITabsProps } from './ITabsProps'
import { useTabs } from './useTabs'

export const Tabs = ({
  items,
  defaultActive = 0,
  activeIndex: controlledIndex,
  onChange,
  onClose,
  variant = 'underline',
  className = '',
  panelClassName = ''
}: ITabsProps) => {
  const { activeIndex, setActiveIndex, handleKeyDown } = useTabs({
    items,
    defaultActive,
    activeIndex: controlledIndex,
    onChange
  })

  const activeItem = items[activeIndex]

  if (!items.length) return null

  return (
    <div className={cn('w-full', className)}>
      <div
        role="tablist"
        aria-orientation="horizontal"
        onKeyDown={handleKeyDown}
        className={cn('flex overflow-x-auto border-b border-[var(--border)]', variant === 'pills' && 'gap-1 border-b-0')}
      >
        {items.map((item, index) => {
          const isActive = index === activeIndex
          const tabId = `tab-${item.id}`
          const panelId = `tabpanel-${item.id}`

          return (
            <button
              key={item.id}
              type="button"
              role="tab"
              id={tabId}
              aria-selected={isActive}
              aria-controls={panelId}
              aria-disabled={item.disabled}
              tabIndex={isActive ? 0 : -1}
              disabled={item.disabled}
              onClick={() => setActiveIndex(index)}
              className={cn(
                'relative flex items-center gap-2 px-4 py-2.5 text-sm font-medium whitespace-nowrap transition-all duration-200 outline-none',
                variant === 'underline' && [
                  '-mb-px border-b-2',
                  isActive
                    ? 'border-[var(--primary)] text-[var(--primary)]'
                    : 'border-transparent text-[var(--text-muted)] hover:border-[var(--border)] hover:text-[var(--text)]'
                ],
                variant === 'pills' && [
                  'rounded-md',
                  isActive ? 'bg-[var(--primary)] text-white' : 'text-[var(--text-muted)] hover:bg-[var(--muted)] hover:text-[var(--text)]'
                ],
                item.disabled && 'cursor-not-allowed opacity-50'
              )}
            >
              {item.icon && <span className="h-4 w-4 shrink-0">{item.icon}</span>}
              <span>{item.label}</span>
              {item.badge !== undefined && (
                <Badge
                  variant={isActive ? 'primary' : 'dark'}
                  type={isActive ? 'solid' : 'outline'}
                  shape="pill"
                  className="!my-0 text-[10px] leading-none"
                >
                  {item.badge}
                </Badge>
              )}
              {item.closable && onClose && (
                <span
                  role="button"
                  tabIndex={0}
                  aria-label={`Cerrar pestaña ${item.label}`}
                  onClick={(e) => {
                    e.stopPropagation()
                    onClose(index)
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault()
                      e.stopPropagation()
                      onClose(index)
                    }
                  }}
                  className="ml-0.5 rounded-full p-0.5 opacity-60 transition-opacity hover:opacity-100 focus-visible:ring-2 focus-visible:ring-[var(--ring)] focus-visible:outline-none"
                >
                  <X className="h-3 w-3" />
                </span>
              )}
            </button>
          )
        })}
      </div>
      {activeItem && (
        <div
          key={activeItem.id}
          role="tabpanel"
          id={`tabpanel-${activeItem.id}`}
          aria-labelledby={`tab-${activeItem.id}`}
          className={cn('pt-4', panelClassName)}
        >
          {activeItem.content}
        </div>
      )}
    </div>
  )
}
