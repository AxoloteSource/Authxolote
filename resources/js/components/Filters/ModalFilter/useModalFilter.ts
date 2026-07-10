import { IFilterItem, IModalFilterProps } from '@/components/Filters/ModalFilter/types'
import { FormikProps } from 'formik'
import { useTranslation } from 'react-i18next'

export const useModalFilter = <Values extends Record<string, unknown>>(props: IModalFilterProps<Values>) => {
  const { t } = useTranslation()
  const { isOpen, close, filters, validationSchema, title, children, onSubmit } = props
  const initialValues: Values = filters.reduce<Partial<Values>>(
    (previousValue, filter) => ({
      ...previousValue,
      [filter.property]: filter.initialValue
    }),
    {}
  ) as Values

  const onClear = (formik: FormikProps<Values>) => {
    formik.resetForm({
      values: initialValues
    })
  }

  const handleSubmit = (values: Values): void => {
    const arrayToPipeString = (arr: unknown[]): string => {
      return arr.join('|')
    }

    const filtersArray: IFilterItem<Values>[] = []

    Object.entries(values as Record<string, unknown>).forEach(([key, value]) => {
      if (value === null || value === undefined || value === '' || (Array.isArray(value) && !value.length)) {
        return
      }

      let filter: IFilterItem<Values> | undefined

      const currentFilter = filters.find((filter) => filter.property === key)
      const operator = currentFilter?.operator

      if (Array.isArray(value) && value.length > 0) {
        filter = {
          property: key as Extract<keyof Values, string>,
          value: arrayToPipeString(value)
        }
      } else if (typeof value === 'object' && value !== null && 'from' in value) {
        if (value.from && (typeof value.from === 'string' || typeof value.from === 'number' || value.from instanceof Date)) {
          filter = {
            property: `${key}_from` as Extract<keyof Values, string>,
            value: new Date(value.from).toISOString().split('T')[0]
          }
        }

        if ('to' in value && value.to && (typeof value.to === 'string' || typeof value.to === 'number' || value.to instanceof Date)) {
          filter = {
            property: `${key}_to` as Extract<keyof Values, string>,
            value: new Date(value.to).toISOString().split('T')[0]
          }
          filtersArray.push(filter)
        }
      } else if (value !== '') {
        filter = {
          property: key as Extract<keyof Values, string>,
          value: value
        }
      }

      if (filter && operator) {
        filter.operator = operator
      }

      if (filter) {
        filtersArray.push(filter)
      }
    })

    if (onSubmit) {
      onSubmit({ filters: filtersArray }, values)
    }

    close()
  }

  return {
    t,
    isOpen,
    filters,
    validationSchema,
    title: title || t('filters'),
    children,
    initialValues,
    close,
    handleSubmit,
    onClear
  }
}
