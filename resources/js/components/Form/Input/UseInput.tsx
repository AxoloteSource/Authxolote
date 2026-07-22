import { FormikProps } from 'formik'
import { useState } from 'react'

interface UseInputProps<T> {
  formik: FormikProps<T>
  name: Extract<keyof T, string>
  className?: string
}

const useInput = <T extends object>({ formik, name, className }: UseInputProps<T>) => {
  const [showPassword, setShowPassword] = useState(false)

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  const hasErrorClass = formik.submitCount && formik.errors[name] ? 'has-error' : ''
  const combinedClassName = [hasErrorClass, className].filter(Boolean).join(' ')

  return {
    showPassword,
    togglePasswordVisibility,
    combinedClassName
  }
}

export default useInput
