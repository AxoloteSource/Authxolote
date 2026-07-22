import { ReactNode } from 'react'

export type TabsVariant = 'underline' | 'pills'

export interface ITabItem {
  /** Identificador único de la pestaña */
  id: string
  /** Texto visible en la pestaña */
  label: string
  /** Contenido que se renderiza en el panel */
  content: ReactNode
  /** Icono opcional junto al label */
  icon?: ReactNode
  /** Badge/contador opcional (número o texto) */
  badge?: number | string
  /** Si es true, muestra botón de cerrar (requiere onClose en Tabs) */
  closable?: boolean
  /** Deshabilita la pestaña */
  disabled?: boolean
}

export interface ITabsProps {
  /** Array de pestañas a renderizar */
  items: ITabItem[]
  /** Índice activo por defecto (modo no controlado) */
  defaultActive?: number
  /** Índice activo controlado desde el padre */
  activeIndex?: number
  /** Callback al cambiar de pestaña */
  onChange?: (index: number) => void
  /** Callback al cerrar una pestaña (requerido si algún tab es closable) */
  onClose?: (index: number) => void
  /** Variante visual: 'underline' (defecto) o 'pills' */
  variant?: TabsVariant
  /** Clases CSS adicionales para el contenedor principal */
  className?: string
  /** Clases CSS adicionales para el panel de contenido */
  panelClassName?: string
}
