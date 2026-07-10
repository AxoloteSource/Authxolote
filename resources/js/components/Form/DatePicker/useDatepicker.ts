import { format } from 'date-fns'
import { FormikProps } from 'formik'
import * as React from 'react'

export const useDatepicker = <T extends object>({
  name,
  formik,
  allowEmpty = false,
  initialValue
}: {
  name: Extract<keyof T, string>
  formik: FormikProps<T>
  allowEmpty?: boolean
  initialValue?: Date
}) => {
  const [date, setDate] = React.useState<Date | undefined>(() => {
    const formikValue = formik.values[name as keyof typeof formik.values] as unknown as string | Date | undefined | null

    if (formikValue) {
      if (typeof formikValue === 'string') {
        // Handle date-only strings (yyyy-MM-dd) as local dates to avoid timezone shifts
        const m = formikValue.match(/^(\d{4})-(\d{2})-(\d{2})$/)
        if (m) {
          const [, y, mo, d] = m
          const localDate = new Date(Number(y), Number(mo) - 1, Number(d))
          return localDate
        }
      }
      const parsed = new Date(formikValue as string | Date)
      if (!isNaN(parsed.getTime())) {
        return parsed
      }
    }

    if (initialValue) return initialValue

    return allowEmpty ? undefined : new Date()
  })

  React.useEffect(() => {
    const formikValue = formik.values[name as keyof typeof formik.values] as unknown as string | Date | undefined | null

    if (formikValue === undefined || formikValue === null) {
      setDate(initialValue ?? (allowEmpty ? undefined : new Date()))
    }
  }, [formik.values, name, formik, initialValue, allowEmpty])

  const handleSelect = (newDate: Date | undefined) => {
    setDate(newDate)
    const value = newDate ? format(newDate, 'yyyy-MM-dd') : undefined
    formik.setFieldValue(name, value)
  }

  return {
    date,
    handleSelect
  }
}
