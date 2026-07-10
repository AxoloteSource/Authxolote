import clsx from 'clsx'
import { Field, FieldProps } from 'formik'
import { IInputPhoneNumberProps } from './interfaces/IInputPhoneNumberProps'
import { PhoneField } from './partials/PhoneField'
// import 'react-phone-input-2/lib/style.css'

const InputPhoneNumber = <T extends object>(props: IInputPhoneNumberProps<T>) => {
  const { label, name, formik, disabled = false, nameCode, country = 'mx' } = props

  const containerClassName = clsx({
    'has-error': formik.submitCount && (formik.errors[name] || formik.errors[nameCode])
  })

  return (
    <div className={containerClassName}>
      {label && <label htmlFor={name}>{label}</label>}
      <Field
        type="tel"
        disabled={disabled}
        name={name}
        id={name}
        className="form-input disabled:pointer-events-none disabled:bg-[#eee] dark:disabled:bg-[#1b2e4b]"
      >
        {(props: FieldProps) => <PhoneField {...props} nameCode={nameCode} country={country}></PhoneField>}
      </Field>

      {formik.submitCount ? (
        formik.errors[name] || formik.errors[nameCode] ? (
          <div className="text-danger mt-1">
            {formik.errors[name]} {formik.errors[nameCode]}
          </div>
        ) : (
          ''
        )
      ) : (
        ''
      )}
    </div>
  )
}

export default InputPhoneNumber
