import clsx from 'clsx'
import { BadgeShape, BadgeType, BadgeVariant } from './IBadgeProps'

interface UseBadgeParams {
  variant?: BadgeVariant
  type?: BadgeType
  shape?: BadgeShape
  className?: string
}

export const useBadge = ({ variant = 'primary', type = 'solid', shape = 'default', className = '' }: UseBadgeParams) => {
  /**
   * Genera las clases CSS para el Badge basadas en sus propiedades
   */
  const getBadgeClasses = () => {
    const baseClasses = 'badge'

    let typeClasses = ''
    if (type === 'solid') {
      switch (variant) {
        case 'primary':
          typeClasses = 'btn-primary'
          break
        case 'secondary':
          typeClasses = 'btn-secondary'
          break
        case 'success':
          typeClasses = 'btn-success'
          break
        case 'danger':
          typeClasses = 'btn-danger'
          break
        case 'warning':
          typeClasses = 'btn-warning'
          break
        case 'info':
          typeClasses = 'btn-info'
          break
        case 'dark':
          typeClasses = 'btn-dark'
          break
        default:
          typeClasses = 'btn-primary'
      }
    } else {
      typeClasses = `badge-outline-${variant}`
    }

    let shapeClasses = ''
    if (shape === 'pill') {
      shapeClasses = 'rounded-full'
    } else if (shape === 'square') {
      shapeClasses = 'rounded-none'
    }

    return clsx(baseClasses, typeClasses, shapeClasses, className)
  }

  return {
    getBadgeClasses
  }
}
