import { Field } from 'formik'
import { Eye, EyeClosed } from 'lucide-react'
import { InputTypeEnum } from './InputType.enum'
import useInput from './UseInput'
import { IInputProps } from './interfaces/IInputProps'

const Input = <T extends object>(props: IInputProps<T>) => {
  const { label, name, type = InputTypeEnum.Text, placeholder, formik, disabled = false, as, rows, className } = props

  const { showPassword, togglePasswordVisibility, combinedClassName } = useInput({
    formik,
    name,
    className
  })

  if (type == InputTypeEnum.Hidden) {
    return <Field id={name} name={name} type={InputTypeEnum.Hidden}></Field>
  }

  return (
    <div {...(combinedClassName ? { className: combinedClassName } : {})}>
      {label && <label htmlFor={name}>{label}</label>}

      <div className="relative">
        <Field
          rows={rows}
          as={as ?? 'input'}
          disabled={disabled}
          name={name}
          type={type === InputTypeEnum.Password && showPassword ? InputTypeEnum.Text : type}
          id={name}
          placeholder={placeholder}
          className="form-input disabled:bg-[#eee] dark:disabled:bg-[#4b4b4b]"
        />
        {type === InputTypeEnum.Password && (
          <span onClick={togglePasswordVisibility} className="absolute inset-y-0 right-0 flex cursor-pointer items-center px-2">
            {showPassword ? <EyeClosed /> : <Eye />}
          </span>
        )}
      </div>
      {formik.submitCount ? formik.errors[name] ? <div className="text-danger mt-1">{String(formik.errors[name])}</div> : '' : ''}
    </div>
  )
}

export default Input
