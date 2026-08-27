import Button from '@/components/Buttons/Button'
import { ButtonTypeEnum } from '@/components/Buttons/enums/buttonType.enum'
import { Input } from '@/components/Form/Input'
import { InputTypeEnum } from '@/components/Form/Input/InputType.enum'
import { IOptions } from '@/components/Form/Select/interfaces/IOptions'
import Switch from '@/components/Form/Switch/Switch'
import InputSelect from '@/components/Form/Select/Select'
import { Color } from '@/enums/Color'
import { IMenuItem } from '@/interfaces/models/MenuItem/IMenuItem'
import { Form, Formik } from 'formik'
import { createElement, type ComponentType } from 'react'
import { components, OptionProps, SingleValueProps, SingleValue } from 'react-select'
import * as Icons from 'lucide-react'
import { type LucideProps } from 'lucide-react'
import { IInitialValuesMenuItem, useMenuItemForm } from './useMenuItemForm'

const lucideIcons = Icons as unknown as Record<string, ComponentType<LucideProps>>

const ICONS_TO_SHOW = 50

const iconOptions: IOptions[] = Object.keys(Icons)
  .filter((name) => {
    const icon = lucideIcons[name] as unknown

    return typeof icon === 'object' && icon !== null && '$$typeof' in icon && !name.endsWith('Icon') && !name.startsWith('create')
  })
  .sort()
  .map((name) => ({ value: name, label: name }))

const firstIconValues = new Set(iconOptions.slice(0, ICONS_TO_SHOW).map((option) => String(option.value)))

const filterIconOptions = (option: IOptions, inputValue: string): boolean => {
  if (!inputValue.trim()) {
    return firstIconValues.has(String(option.value))
  }

  return option.label.toLowerCase().includes(inputValue.toLowerCase())
}

const IconOption = (props: OptionProps<IOptions, false>) => {
  const { data } = props
  const Icon = lucideIcons[data.value as string]

  return (
    <components.Option {...props}>
      <div className="flex items-center gap-2">
        {Icon && createElement(Icon, { className: 'h-4 w-4 shrink-0' })}
        <span>{data.label}</span>
      </div>
    </components.Option>
  )
}

const IconSingleValue = (props: SingleValueProps<IOptions, false>) => {
  const { data } = props
  const Icon = lucideIcons[data.value as string]

  return (
    <components.SingleValue {...props}>
      <div className="flex items-center gap-2">
        {Icon && createElement(Icon, { className: 'h-4 w-4 shrink-0' })}
        <span>{data.label}</span>
      </div>
    </components.SingleValue>
  )
}

interface IMenuItemFormFieldsProps {
  onSuccess?: () => void
  onCancel: () => void
  selectedMenuItem?: IMenuItem | null
  menuId?: string
}

export const MenuItemFormFields = ({ selectedMenuItem, onSuccess, onCancel, menuId }: IMenuItemFormFieldsProps) => {
  const { formikProps, t, parentOptions, parentLoading, typeOptions } = useMenuItemForm({
    selectedMenuItem,
    onSuccess,
    menuId
  })

  return (
    <Formik enableReinitialize {...formikProps}>
      {(formik) => (
        <Form className="mb-4 grid grid-cols-12 gap-3 sm:grid-cols-12">
          <InputSelect<IInitialValuesMenuItem>
            className="col-span-12"
            name="type"
            label={`${t('type')}`}
            formik={formik}
            options={typeOptions}
            isLoading={false}
            onChange={(newValue) => {
              const value = (newValue as SingleValue<IOptions> | null)?.value
              if (value === 'header') {
                formik.setFieldValue('route', '')
                formik.setFieldValue('path', '')
              }
            }}
          />
          <InputSelect<IInitialValuesMenuItem>
            className="col-span-12"
            name="parent_id"
            label={`${t('parent_item')}`}
            formik={formik}
            options={parentOptions}
            isLoading={parentLoading}
            onChange={(newValue) => {
              const value = (newValue as SingleValue<IOptions> | null)?.value
              formik.setFieldValue('parent_id', value != null ? String(value) : '')
            }}
          />
          <Input<IInitialValuesMenuItem> className="col-span-6" name="name" type={InputTypeEnum.Text} label={`${t('name')}`} formik={formik} />
          <Input<IInitialValuesMenuItem> className="col-span-6" name="slug" type={InputTypeEnum.Text} label={`${t('slug')}`} formik={formik} />
          {formik.values.type === 'link' && (
            <>
              <Input<IInitialValuesMenuItem> className="col-span-6" name="path" type={InputTypeEnum.Text} label={`${t('path')}`} formik={formik} />
              <Input<IInitialValuesMenuItem> className="col-span-6" name="route" type={InputTypeEnum.Text} label={`${t('route')}`} formik={formik} />
            </>
          )}
          <InputSelect<IInitialValuesMenuItem>
            className="col-span-12"
            name="icon"
            label={`${t('icon')}`}
            formik={formik}
            options={iconOptions}
            isLoading={false}
            isSearchable
            isClearable
            filterOption={filterIconOptions}
            noOptionsMessage="Sin resultados"
            OptionComponent={IconOption}
            SingleValueComponent={IconSingleValue}
          />
          <Input<IInitialValuesMenuItem>
            className="col-span-12"
            name="sort_order"
            type={InputTypeEnum.Number}
            label={`${t('sort_order')}`}
            formik={formik}
          />
          <div className="col-span-12">
            <Switch<IInitialValuesMenuItem> name="active" label={t('active')} formik={formik} />
          </div>
          <div className="col-span-12 mt-3 flex justify-between gap-3">
            <Button className="col-span-12 md:col-span-6" onClick={onCancel} type={ButtonTypeEnum.Button} color={Color.White}>
              {t('cancel')}
            </Button>
            <Button className="col-span-12 md:col-span-6" type={ButtonTypeEnum.Submit} disabled={formik.isSubmitting}>
              {t('save')}
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  )
}
