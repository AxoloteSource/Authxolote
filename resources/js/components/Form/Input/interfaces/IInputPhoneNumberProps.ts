import { FormikProps } from 'formik'

export interface IInputPhoneNumberProps<T> {
  name: Extract<keyof T, string>
  nameCode: Extract<keyof T, string>
  country?: string
  formik: FormikProps<T>
  label?: string
  disabled?: boolean
}
