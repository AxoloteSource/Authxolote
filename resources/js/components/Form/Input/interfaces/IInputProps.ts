import { InputTypeEnum } from '@/components/Form/Input/InputType.enum'
import { FormikProps } from 'formik/dist/types'

export interface IInputProps<T> {
  name: Extract<keyof T, string>
  type?: InputTypeEnum
  formik: FormikProps<T>
  label?: string
  placeholder?: string
  disabled?: boolean
  as?: string
  rows?: number
  className?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  onKeyUp?: (e: React.KeyboardEvent<HTMLInputElement>) => void
  required?: boolean
}
