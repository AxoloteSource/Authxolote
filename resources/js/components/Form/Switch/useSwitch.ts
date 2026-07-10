import { FormikProps } from 'formik'

interface UseSwitchProps<T> {
  formik: FormikProps<T>
  name: string
  className?: string
  size?: 'sm' | 'md' | 'lg'
}

const useSwitch = <T extends object>({ formik, name, className, size = 'md' }: UseSwitchProps<T>) => {
  const sizeClasses = {
    sm: 'h-4 w-8',
    md: 'h-6 w-12',
    lg: 'h-8 w-16'
  }

  const thumbSizeClasses = {
    sm: 'before:h-2.5 before:w-2.5 before:bottom-0.5 before:left-0.5 peer-checked:before:left-4.5',
    md: 'before:h-4 before:w-4 before:bottom-1 before:left-1 peer-checked:before:left-7',
    lg: 'before:h-6 before:w-6 before:bottom-1 before:left-1 peer-checked:before:left-9'
  }

  const isChecked = Boolean((formik.values as Record<string, unknown>)[name])
  const fieldError = (formik.errors as Record<string, unknown>)[name]
  const fieldTouched = (formik.touched as Record<string, unknown>)[name]
  const hasError = !!fieldError && !!fieldTouched

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    formik.setFieldValue(name, e.target.checked)
  }

  const switchClassName = `
    block h-full rounded-full transition-all duration-300 ease-in-out
    ${thumbSizeClasses[size]}
    before:absolute before:rounded-full before:bg-white before:transition-all before:duration-300 before:ease-in-out
    before:shadow-sm

    bg-gray-300 dark:bg-dark
    peer-checked:bg-primary
    peer-focus:ring-2 peer-focus:ring-primary/30
    peer-checked:peer-hover:bg-primary-dark

    peer-disabled:opacity-50 peer-disabled:cursor-not-allowed
    before:peer-disabled:bg-gray-100 dark:before:peer-disabled:bg-gray-400

    dark:before:bg-white-dark dark:peer-checked:before:bg-white
    ${hasError ? 'ring-2 ring-red-500' : ''}
  `

  const combinedClassName = className

  return {
    isChecked,
    fieldError,
    fieldTouched,
    hasError,
    handleChange,
    switchClassName,
    sizeClasses,
    combinedClassName
  }
}

export default useSwitch
