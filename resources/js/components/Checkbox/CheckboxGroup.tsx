import clsx from 'clsx'
import React, { useMemo, useState } from 'react'
import Checkbox, { CheckboxProps } from './Checkbox'

export interface CheckboxOption {
  id: string | number
  label: string
  value: string
}

export interface CheckboxGroupProps {
  /**
   * Opciones para los checkboxes
   */
  options?: CheckboxOption[]
  /**
   * Valores iniciales seleccionados
   */
  initialValues?: string[]
  /**
   * Valores seleccionados controlados
   */
  value?: string[]
  /**
   * Función llamada cuando cambia el valor
   */
  onChange?: (values: string[]) => void
  /**
   * Variante de los checkboxes
   * @default 'default'
   */
  variant?: CheckboxProps['variant']
  /**
   * Color de los checkboxes
   * @default 'primary'
   */
  color?: CheckboxProps['color']
  /**
   * Clase adicional para el contenedor
   */
  className?: string
  /**
   * Dirección de los checkboxes
   * @default 'vertical'
   */
  direction?: 'vertical' | 'horizontal'
}

const CheckboxGroup: React.FC<CheckboxGroupProps> = ({
  options = [],
  initialValues = [],
  value,
  onChange = () => {},
  variant = 'default',
  color = 'primary',
  className,
  direction = 'vertical'
}) => {
  const [internalValues, setInternalValues] = useState<string[]>(initialValues)

  const selectedValues = useMemo(() => {
    if (value !== undefined) return value
    return internalValues
  }, [value, internalValues])

  const handleChange = (checked: boolean, value: string) => {
    let newValues: string[]

    if (checked) {
      newValues = [...selectedValues, value]
    } else {
      newValues = selectedValues.filter((v) => v !== value)
    }

    if (value === undefined) setInternalValues(newValues)
    onChange(newValues)
  }

  return (
    <div className={clsx('flex', direction === 'vertical' ? 'flex-col space-y-2' : 'flex-row space-x-4', className)}>
      {options.map((option) => (
        <Checkbox
          key={option.id}
          id={option.id.toString()}
          variant={variant}
          color={color}
          checked={selectedValues.includes(option.value)}
          onChange={(e) => handleChange(e.target.checked, option.value)}
        >
          {option.label}
        </Checkbox>
      ))}
    </div>
  )
}

export default CheckboxGroup
