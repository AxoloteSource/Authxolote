import { Placement } from '@floating-ui/react'
import { ReactNode } from 'react'

export type BadgeVariant = 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'dark'
export type BadgeType = 'solid' | 'outline'
export type BadgeShape = 'default' | 'pill' | 'square'

interface IBadgeProps {
  /** Contenido del badge */
  children: ReactNode

  /** Variante de color */
  variant?: BadgeVariant

  /** Tipo de badge: solid o outline */
  type?: BadgeType

  /** Forma del badge: default, pill (redondeado) o square (sin bordes) */
  shape?: BadgeShape

  /** Clases CSS adicionales */
  className?: string

  /** Propiedades para el tooltip/popover */
  tooltip?: {
    /** Contenido del tooltip */
    content: ReactNode
    /** Posición del tooltip (opcional) */
    placement?: Placement
    /** Offset del tooltip en píxeles (opcional) */
    offset?: number
    /** Clase CSS adicional para el tooltip (opcional) */
    className?: string
  }
}

export default IBadgeProps
