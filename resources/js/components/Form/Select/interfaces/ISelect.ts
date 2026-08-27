import { FormikProps } from 'formik/dist/types'
import { ComponentType, ReactNode } from 'react'
import { MultiValue, OptionProps, SingleValue, SingleValueProps } from 'react-select'
import { IOptions } from './IOptions'

export interface ISelect<T> {
  label?: string
  name: Extract<keyof T, string>
  formik: FormikProps<T>
  disabled?: boolean
  options: Array<IOptions>
  isMulti?: boolean
  defaultValue?: Array<IOptions> | IOptions
  onChange?: (props: SingleValue<IOptions> | MultiValue<IOptions>) => void
  onInputChange?: (value: string) => void
  className?: string | undefined
  isSearchable?: boolean
  filterOption?: boolean | ((option: IOptions, inputValue: string) => boolean)
  isClearable?: boolean
  isLoading?: boolean
  OptionComponent?: ComponentType<OptionProps<IOptions, false>>
  SingleValueComponent?: ComponentType<SingleValueProps<IOptions, false>>
  noOptionsMessage?: string
}
