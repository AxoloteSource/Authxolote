import { FormikProps } from 'formik'

export interface ISwitchProps<T extends object> {
  name: string
  label?: string
  formik: FormikProps<T>
  disabled?: boolean
  id?: string
  className?: string
  size?: 'sm' | 'md' | 'lg'
}
