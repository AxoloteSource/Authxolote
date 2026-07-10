import { ISwitchProps } from './interfaces/ISwitchProps'
import useSwitch from './useSwitch'

const Switch = <T extends object>(props: ISwitchProps<T>) => {
  const { label, formik, disabled = false, id, size = 'md', className } = props

  const { isChecked, handleChange, switchClassName, sizeClasses, combinedClassName } = useSwitch<T>({
    formik,
    name: props.name,
    className,
    size
  })

  const nameStr = String(props.name)

  return (
    <div {...(combinedClassName ? { className: combinedClassName } : {})}>
      {label && <label htmlFor={id || nameStr}>{label}</label>}

      <div className="relative">
        <div className={`relative ${sizeClasses[size]}`}>
          <input
            type="checkbox"
            checked={isChecked}
            onChange={handleChange}
            disabled={disabled}
            className="peer absolute z-10 h-full w-full cursor-pointer opacity-0 disabled:cursor-not-allowed"
            id={id || nameStr}
            name={nameStr}
          />
          <span className={switchClassName}></span>
        </div>
      </div>
      {formik.submitCount ? (
        (formik.errors as Record<string, string | undefined>)[props.name] ? (
          <div className="text-danger mt-1">{String((formik.errors as Record<string, string | undefined>)[props.name])}</div>
        ) : (
          ''
        )
      ) : (
        ''
      )}
    </div>
  )
}

export default Switch
