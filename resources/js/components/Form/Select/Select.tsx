import { ISelect } from '@/components/Form/Select/interfaces/ISelect'
import { WrapInput } from '@/components/Form/WrapInput'
import { Field } from 'formik'
import Select, { components } from 'react-select'
import { useInputSelect } from './useInputSelect'

const LoadingDropdownIndicator = (props: Record<string, unknown>) => {
  return (
    <components.DropdownIndicator {...props}>
      <div className="h-4 w-4 animate-spin rounded-full border-2 border-blue-500 border-t-transparent dark:border-blue-400" />
    </components.DropdownIndicator>
  )
}

const NoLoadingIndicator = () => null

const InputSelect = <T extends object>(props: ISelect<T>) => {
  const {
    label = '',
    name,
    formik,
    disabled = false,
    options = [],
    isMulti = false,
    onChange,
    onInputChange,
    className = '',
    isSearchable = true,
    filterOption = null,
    isClearable = true,
    isLoading = true
  } = props

  const { selectedValue, handleOnChange } = useInputSelect({
    name,
    formik,
    options,
    isMulti,
    onChange
  })

  return (
    <WrapInput name={name} formik={formik} label={label} className={className}>
      <Field disabled={disabled} name={name} id={name}>
        {() => (
          <Select
            value={selectedValue}
            options={options}
            isSearchable={isSearchable}
            onChange={handleOnChange}
            onInputChange={onInputChange}
            isMulti={isMulti}
            isClearable={isClearable}
            isLoading={isLoading}
            loadingMessage={() => 'Cargando...'}
            components={
              isLoading
                ? {
                    DropdownIndicator: LoadingDropdownIndicator,
                    LoadingIndicator: NoLoadingIndicator
                  }
                : undefined
            }
            filterOption={filterOption !== null ? (typeof filterOption === 'function' ? filterOption : () => filterOption as boolean) : undefined}
            menuPortalTarget={document.body}
            styles={{
              menuPortal: (base) => ({ ...base, zIndex: 9999 })
            }}
            classNames={{
              control: (state) =>
                `form-input p-0! border-[var(--border)]! bg-[var(--input-background)]! shadow-[var(--input-shadow)] ${state.isFocused ? ' border-[var(--primary)]! shadow-none!' : ''}`,
              menu: () => 'mt-1! p-1! bg-[var(--input-background)]! rounded-lg! shadow-lg! z-[9999]!',
              option: (state) =>
                `cursor-pointer! select-none! rounded-md! p-2! ${
                  state.isSelected
                    ? 'bg-blue-500! text-white!'
                    : state.isFocused
                      ? 'bg-[var(--background)]! text-[var(--text)]!'
                      : 'text-black! dark:text-gray-200!'
                }`,
              singleValue: () => 'text-[var(--text)]!',
              placeholder: () => 'text-gray-400! dark:text-white-dark',
              dropdownIndicator: () => 'text-gray-400! dark:text-white-dark',
              indicatorSeparator: () => 'hidden!',
              menuList: () => 'p-2!',
              input: () => 'text-black! dark:text-white-dark!',
              loadingIndicator: () => 'text-blue-500! dark:text-blue-400!',
              loadingMessage: () => 'text-gray-600! dark:text-gray-300! p-2!'
            }}
          />
        )}
      </Field>
    </WrapInput>
  )
}

export default InputSelect
