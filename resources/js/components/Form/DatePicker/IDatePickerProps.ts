import { FormikProps } from 'formik'
import React from 'react'

export interface IDatePickerProps<T extends object> extends React.HTMLAttributes<HTMLDivElement> {
  name: Extract<keyof T, string>
  formik: FormikProps<T>
  label?: string
  allowEmpty?: boolean
  initialValue?: Date
}
