import { addDays } from 'date-fns'
import { FormikProps } from 'formik'
import * as React from 'react'
import { DateRange } from 'react-day-picker'
import { IRangeValues } from './IRangeValues'

export const useDatepickerWithRange = <T extends object>({
  name,
  formik,
  allowEmpty = false,
  initialValues
}: {
  name: Extract<keyof T, string>
  formik: FormikProps<T>
  allowEmpty?: boolean
  initialValues?: IRangeValues
}) => {
  const [date, setDate] = React.useState<DateRange | undefined>(() => {
    const formikValue = formik.values[name] as IRangeValues
    if (formikValue && formikValue.from) {
      return {
        from: new Date(formikValue.from),
        to: formikValue.to ? new Date(formikValue.to) : undefined
      }
    }

    if (initialValues && initialValues.from) {
      return {
        from: new Date(initialValues.from),
        to: initialValues.to ? new Date(initialValues.to) : undefined
      }
    }

    return allowEmpty
      ? undefined
      : {
          from: new Date(),
          to: addDays(new Date(), 7)
        }
  })

  React.useEffect(() => {
    const formikValue = formik.values[name as keyof typeof formik.values] as IRangeValues

    if (formikValue === undefined || formikValue === null) {
      setDate(initialValues)
    }
  }, [formik.values, name, formik, initialValues])

  const handleSelect = (newDate: DateRange | undefined) => {
    setDate(newDate)
    formik.setFieldValue(
      name,
      newDate
        ? {
            from: newDate.from?.toISOString(),
            to: newDate.to?.toISOString()
          }
        : undefined
    )
  }

  return {
    date,
    handleSelect
  }
}
