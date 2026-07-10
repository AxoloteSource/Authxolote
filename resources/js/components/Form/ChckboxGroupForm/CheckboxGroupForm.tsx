import CheckboxGroup from '@/components/Checkbox/CheckboxGroup'
import { ICheckboxGroupFormProps } from '@/components/Form/ChckboxGroupForm/ICheckboxGroupFormProps'
import { useCheckboxGroupForm } from '@/components/Form/ChckboxGroupForm/useCheckboxGroupForm'
import { WrapInput } from '@/components/Form/WrapInput'
import clsx from 'clsx'

export function CheckboxGroupForm<T extends object>({
  name,
  options = [],
  formik,
  label,
  variant = 'default',
  color = 'primary',
  className,
  classContainer = 'grid grid-cols-2 gap-2 border-1 rounded-lg border-gray-300 dark:border-gray-600! p-2',
  direction = 'vertical'
}: ICheckboxGroupFormProps<T>) {
  const { fieldValue, showError, handleChange } = useCheckboxGroupForm({ formik, name })

  return (
    <WrapInput label={label} name={name} formik={formik} className={className}>
      <CheckboxGroup
        options={options}
        initialValues={fieldValue}
        value={fieldValue}
        onChange={handleChange}
        variant={variant}
        color={color}
        direction={direction}
        className={clsx(showError && 'border-danger rounded-md border p-2', classContainer)}
      />
    </WrapInput>
  )
}

export default CheckboxGroupForm
