import useInput from '@/components/Form/Input/UseInput'
import { Field } from 'formik'

interface ICheckboxProps<T> {
  name: Extract<keyof T, string>
  formik: import('formik').FormikProps<T>
  label?: string
  disabled?: boolean
  className?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  onKeyUp?: (e: React.KeyboardEvent<HTMLInputElement>) => void
}

const Checkbox = <T extends object>(props: ICheckboxProps<T>) => {
  const { name, formik, label, disabled = false, className, onChange, onKeyUp } = props

  const { combinedClassName } = useInput<T>({
    formik,
    name,
    className
  })

  const checked = Boolean(formik.values[name as keyof typeof formik.values])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    formik.setFieldValue(name, e.target.checked)
    if (onChange) onChange(e)
  }

  return (
    <div {...(combinedClassName ? { className: combinedClassName } : {})}>
      <label htmlFor={name} className="flex items-center gap-2">
        <Field
          id={name}
          name={name}
          type="checkbox"
          disabled={disabled}
          checked={checked}
          onChange={handleChange}
          onKeyUp={onKeyUp}
          className="form-checkbox rounded border-gray-300 disabled:pointer-events-none disabled:bg-[#eee] dark:disabled:bg-[#1b2e4b]"
        />
        {label && <span className="text-sm font-medium">{label}</span>}
      </label>
      {formik.submitCount ? formik.errors[name] ? <div className="text-danger mt-1">{String(formik.errors[name])}</div> : '' : ''}
    </div>
  )
}

export default Checkbox
