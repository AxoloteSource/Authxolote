import { FieldInputProps, FieldMetaProps, FormikProps } from 'formik/dist/types'

export interface PhoneFieldProps<V = unknown, FormValues = Record<string, unknown>> {
  field: FieldInputProps<V>
  form: FormikProps<FormValues>
  meta: FieldMetaProps<V>
  nameCode: string
  country: string
}
