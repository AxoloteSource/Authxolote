import { memo } from 'react'
import { IDropdownItemProps } from './IDropdownItemProps'

const DropdownItem = ({ children, onClick = () => undefined, disabled = false }: IDropdownItemProps) => {
  return (
    <li>
      <button
        type="button"
        onClick={disabled ? undefined : onClick}
        disabled={disabled}
        className={`flex gap-3 ${disabled ? 'cursor-not-allowed opacity-50' : ''}`}
      >
        {children}
      </button>
    </li>
  )
}

export default memo(DropdownItem)
