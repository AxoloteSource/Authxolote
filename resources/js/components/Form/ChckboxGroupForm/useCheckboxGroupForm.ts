import { FormikProps } from 'formik'
import { useMemo } from 'react'

export const useCheckboxGroupForm = <T>({ formik, name }: { formik: FormikProps<T>; name: Extract<keyof T, string> }) => {
  const fieldValue = useMemo<string[]>(() => {
    return (formik.values[name as keyof typeof formik.values] as string[]) || []
  }, [formik, name])
  const fieldError = formik.errors[name as keyof typeof formik.errors]
  const fieldTouched = formik.touched[name as keyof typeof formik.touched]
  const showError = !!fieldError && !!fieldTouched

  const handleChange = async (values: string[]) => {
    await formik.setFieldValue(name, values)
    await formik.setFieldTouched(name, true, false)
  }

  return {
    fieldValue,
    showError,
    handleChange
  }
}
