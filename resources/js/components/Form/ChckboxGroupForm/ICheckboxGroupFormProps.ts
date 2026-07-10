import { CheckboxProps } from '@/components/Checkbox/Checkbox'
import { CheckboxOption } from '@/components/Checkbox/CheckboxGroup'
import { FormikProps } from 'formik'

export interface ICheckboxGroupFormProps<T> {
  /**
   * Nombre del campo en formik
   */
  name: Extract<keyof T, string>
  /**
   * Opciones para los checkboxes
   */
  options?: CheckboxOption[]
  /**
   * Props de formik
   */
  formik: FormikProps<T>
  /**
   * Etiqueta para el campo
   */
  label?: string
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
  /**
   * Si el campo está deshabilitado
   */
  disabled?: boolean
  /**
   * Clase CSS para el contenedor del grupo de checkboxes
   * @default 'grid grid-cols-2 gap-2 border-1 rounded-lg border-gray-300 dark:border-gray-600! p-2'
   */
  classContainer?: string
}
