import { FormikProps } from 'formik'
import React from 'react'

interface WrapInputProps<T> {
  name: Extract<keyof T, string>
  formik: FormikProps<Record<string, unknown>>
  label?: string
  children: React.ReactNode
  parentWrapper?: boolean
  parentClassName?: string
  className?: string
}

export const WrapInput = <T extends object>(props: WrapInputProps<T>) => {
  const { label, name, formik, children, parentWrapper, parentClassName, className = '' } = props
  const Wrapper = (
    <>
      <div className={`${className} ${formik.submitCount ? (formik.errors[name] ? 'has-error' : '') : ''}`}>
        {label && <label htmlFor={name}>{label}</label>}

        <div className="relative">{children}</div>
        {formik.submitCount && formik.errors[name] ? <div className="text-danger mt-1">{String(formik.errors[name])}</div> : ''}
      </div>
    </>
  )

  return parentWrapper ? <div className={`${parentClassName ? parentClassName : ''}`}>{Wrapper}</div> : Wrapper
}
