import { FormikProps } from 'formik'
import { ReactNode } from 'react'
import { ObjectSchema } from 'yup'

export type operators = '=' | '>' | '<' | '>=' | '<=' | '!=' | 'like'

export interface IFilters<Values> {
  property: Extract<keyof Values, string>
  operator?: operators
  initialValue: unknown
}

export interface IFilterItem<Values> {
  property: Extract<keyof Values, string>
  value: unknown
  operator?: operators
}

export interface IFilterData<Values> {
  filters: IFilterItem<Values>[]
}

export interface IModalFilterProps<Values> {
  isOpen: boolean
  close: () => void
  title?: string
  validationSchema?: ObjectSchema<Record<string, unknown>> | (() => ObjectSchema<Record<string, unknown>>)
  onSubmit: (filterData: IFilterData<Values>, values: Values) => void | Promise<void>
  children: ((formik: FormikProps<Values>) => ReactNode) | ReactNode
  icon?: ReactNode
  filters: IFilters<Values>[]
}
