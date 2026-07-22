import React from 'react'
import { InputTypeEnum } from './InputType.enum'
interface IInputWithIconProps<T> {
  name: Extract<keyof T, string>
  label?: string
  placeholder?: string
  disabled?: boolean
  inputClassName?: string
  value?: string
  wrapperClassName?: string
  IconComponent?: React.ComponentType
  inputCallback?: (e: React.ChangeEvent<HTMLInputElement>) => void
  inputKeyUpCallback?: (e: React.KeyboardEvent<HTMLInputElement>) => void
}

export const InputWithIcon = <T extends object>(props: IInputWithIconProps<T>) => {
  const {
    label,
    name,
    placeholder,
    disabled = false,
    inputClassName,
    wrapperClassName,
    IconComponent,
    value,
    inputCallback,
    inputKeyUpCallback
  } = props
  const defaultClass = 'flex items-center border p-2 rounded bg-[var(--input-background)]'
  const defaultInputClass = 'flex-1 outline-none'
  return (
    <>
      {label && <label>{label}</label>}
      <div className={`${!wrapperClassName ? defaultClass : wrapperClassName}`}>
        <input
          onKeyUp={inputKeyUpCallback ? (e) => inputKeyUpCallback(e) : undefined}
          onChange={inputCallback ? (e) => inputCallback(e) : undefined}
          value={value}
          name={name}
          type={InputTypeEnum.Text}
          placeholder={`${placeholder}`}
          className={`${inputClassName ? inputClassName : defaultInputClass}`}
          disabled={disabled}
        />
        {IconComponent && <IconComponent />}
      </div>
    </>
  )
}
