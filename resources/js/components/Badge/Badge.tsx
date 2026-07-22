import { useBadge } from '@/components/Badge/useBadge'
import { Tooltip } from '@/components/Tooltip/Tooltip'
import IBadgeProps from './IBadgeProps'

export const Badge = ({ children, variant = 'primary', type = 'solid', shape = 'default', className = '', tooltip, ...rest }: IBadgeProps) => {
  const { getBadgeClasses } = useBadge({
    variant,
    type,
    shape,
    className
  })

  const badgeElement = (
    <span className={getBadgeClasses()} {...rest}>
      {children}
    </span>
  )

  // Si tiene tooltip, envolvemos el badge en un componente Tooltip
  if (tooltip) {
    const { content, placement = 'top', offset = 5, className = '' } = tooltip

    return (
      <Tooltip content={content} placement={placement} offset={offset} className={className}>
        {badgeElement}
      </Tooltip>
    )
  }

  return badgeElement
}
