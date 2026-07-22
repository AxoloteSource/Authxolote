import {
  autoUpdate,
  flip,
  offset as floatingOffset,
  FloatingPortal,
  Placement,
  shift,
  useDismiss,
  useFloating,
  useFocus,
  useHover,
  useInteractions,
  useRole
} from '@floating-ui/react'
import clsx from 'clsx'
import { ReactNode, useState } from 'react'

interface TooltipProps {
  children: ReactNode
  content: ReactNode
  placement?: Placement
  offset?: number
  className?: string
}

export const Tooltip = ({ children, content, placement = 'top', offset = 5, className = '' }: TooltipProps) => {
  const [isOpen, setIsOpen] = useState(false)

  const {
    refs: { setFloating, setReference },
    floatingStyles,
    context
  } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    placement,
    // Asegurar que el tooltip permanezca en la pantalla
    whileElementsMounted: autoUpdate,
    middleware: [
      floatingOffset(offset),
      flip({
        fallbackAxisSideDirection: 'start'
      }),
      shift()
    ]
  })

  // Event listeners para cambiar el estado de apertura
  const hover = useHover(context, { move: false })
  const focus = useFocus(context)
  const dismiss = useDismiss(context)
  // Props de rol para lectores de pantalla
  const role = useRole(context, { role: 'tooltip' })

  // Fusionar todas las interacciones en getters de propiedades
  const { getReferenceProps, getFloatingProps } = useInteractions([hover, focus, dismiss, role])

  return (
    <>
      <div ref={setReference} {...getReferenceProps()}>
        {children}
      </div>
      <FloatingPortal>
        {isOpen && (
          <div
            ref={setFloating}
            style={floatingStyles}
            {...getFloatingProps()}
            className={clsx('z-50 rounded bg-black px-2 py-1 text-xs text-white shadow-md', className)}
          >
            {content}
          </div>
        )}
      </FloatingPortal>
    </>
  )
}
