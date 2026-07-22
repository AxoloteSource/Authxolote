import { FormikProps } from 'formik'
import { useMemo } from 'react'
import { MultiValue, SingleValue } from 'react-select'
import { IOptions } from './interfaces/IOptions'

export const useInputSelect = <T extends object>({
  name,
  formik,
  options = [],
  isMulti = false,
  onChange
}: {
  name: Extract<keyof T, string>
  formik: FormikProps<T>
  options: IOptions[]
  isMulti?: boolean
  onChange?: (newValue: SingleValue<IOptions> | MultiValue<IOptions>) => void
}) => {
  const selectedValue = useMemo<Array<IOptions> | IOptions | null>(() => {
    const formikValue = formik.values[name as keyof typeof formik.values]

    if (formikValue === undefined || formikValue === null || (Array.isArray(formikValue) && formikValue.length === 0)) {
      return isMulti ? [] : null
    }

    if (isMulti && Array.isArray(formikValue)) {
      return options.filter((option) => formikValue.includes(option.value))
    }

    const selectedOption = options.find((option) => option.value === formikValue)
    return selectedOption || null
  }, [formik, name, options, isMulti])

  const handleOnChange = async (newValue: SingleValue<IOptions> | MultiValue<IOptions>) => {
    if (isMulti) {
      const values = (newValue as MultiValue<IOptions>).map((option) => option.value)
      await formik.setFieldValue(name, values)
    } else {
      if (newValue) {
        await formik.setFieldValue(name, (newValue as SingleValue<IOptions>)?.value)
      } else {
        await formik.setFieldValue(name, null)
      }
    }

    if (onChange) {
      onChange(newValue)
    }
  }

  return {
    selectedValue,
    handleOnChange
  }
}
