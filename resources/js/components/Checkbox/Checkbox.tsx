import clsx from 'clsx'
import React from 'react'

export type CheckboxVariant = 'default' | 'rounded' | 'outline' | 'outlineRounded'
export type CheckboxColor = 'primary' | 'success' | 'secondary' | 'danger' | 'warning' | 'info' | 'dark'

export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  /**
   * Etiqueta que se mostrará junto al checkbox
   */
  children?: React.ReactNode | string
  /**
   * Color del checkbox
   * @default 'primary'
   */
  color?: CheckboxColor
  /**
   * Variante de estilo del checkbox
   * @default 'default'
   */
  variant?: CheckboxVariant
  /**
   * Clase adicional para el contenedor
   */
  className?: string
}

const Checkbox: React.FC<CheckboxProps> = ({ children, color = 'primary', variant = 'default', className, ...rest }) => {
  const getCheckboxClasses = () => {
    const baseClasses = 'form-checkbox'

    // Clases para cada variante
    const variantClasses = {
      default: '',
      rounded: 'rounded-full',
      outline: `outline-${color}`,
      outlineRounded: `outline-${color} rounded-full`
    }

    // Clases para cada color (solo se aplican en default y rounded)
    const colorClasses =
      variant === 'default' || variant === 'rounded'
        ? {
            primary: '',
            success: 'text-success',
            secondary: 'text-secondary',
            danger: 'text-danger',
            warning: 'text-warning',
            info: 'text-info',
            dark: 'text-dark'
          }
        : { primary: '', success: '', secondary: '', danger: '', warning: '', info: '', dark: '' }

    return clsx(baseClasses, variantClasses[variant], colorClasses[color])
  }

  return (
    <label className={clsx('inline-flex items-center', className)}>
      <input type="checkbox" className={getCheckboxClasses()} {...rest} />
      {children && <span className="ml-2">{children}</span>}
    </label>
  )
}

export default Checkbox
